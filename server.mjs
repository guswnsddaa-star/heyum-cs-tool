import { createServer } from "node:http";
import { createHmac, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const env = await loadEnv(join(__dirname, ".env"));
const port = Number(env.PORT || 3000);
const host = env.HOST || "127.0.0.1";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

createServer(async (req, res) => {
  try {
    if (!req.url) {
      sendJson(res, 400, { error: "잘못된 요청입니다." });
      return;
    }

    const url = new URL(req.url, `http://localhost:${port}`);

    if (req.method === "POST" && url.pathname === "/api/reply") {
      if (!isAuthenticated(req, env)) {
        sendJson(res, 401, { error: "인증이 필요합니다." });
        return;
      }

      const body = await readJson(req);
      const result = await generateReply(body, env);
      sendJson(res, 200, result);
      return;
    }

    if (url.pathname === "/api/auth") {
      await handleAuth(req, res, env);
      return;
    }

    if (req.method === "GET") {
      await serveStatic(url.pathname, res);
      return;
    }

    sendJson(res, 405, { error: "허용되지 않은 메서드입니다." });
  } catch (error) {
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : "서버 오류가 발생했습니다."
    });
  }
}).listen(port, host, () => {
  console.log(`Heyum CS server running on http://${host}:${port}`);
});

async function generateReply(payload, envMap) {
  if (!envMap.OPENAI_API_KEY) {
    return {
      ok: false,
      mode: "config_required",
      message: "OPENAI_API_KEY가 설정되지 않아 AI 답변을 생성할 수 없습니다.",
      replyText: "",
      analysis: null
    };
  }

  const question = stringValue(payload.customerQuestion);
  if (!question) {
    return {
      ok: false,
      mode: "validation_error",
      message: "고객 질문을 입력해주세요.",
      replyText: "",
      analysis: null
    };
  }

  const prompt = buildPrompt(payload);
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${envMap.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: envMap.OPENAI_MODEL || "gpt-5",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "너는 브랜드 CS 응대 초안 생성 도우미다. 답변은 항상 한국어로 작성한다. 브랜드가 혜윰이면 모든 답변의 첫 두 줄은 기본적으로 '안녕하세요, 고객님'과 '건강한 습관을 전하는 혜윰입니다.' 흐름을 따른다. 브랜드가 송강당이면 '안녕하세요, 고객님'과 '백년 전통의 송강당입니다.' 흐름을 따른다. 문체는 부드럽고 정중하며 실제 브랜드 상담사처럼 자연스러워야 한다. 과하게 딱딱하거나 법률문서 같은 표현은 피한다. 의료적 진단, 질병 치료 단정, 효능 단정, 확정적 보상 약속은 금지한다. 특히 '효능' 표현은 사용하지 않는다. 불확실하거나 주문 상태 확인이 필요한 경우에는 확인 후 안내드리겠다고 표현한다. 환불 승인, 보상 확정, 정책 외 약속은 하지 않는다. 사용자가 준 CS 가이드와 예시 톤을 우선 반영한다. 출력은 반드시 JSON으로만 반환한다."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: prompt
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "heyum_cs_reply",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              intent: { type: "string" },
              confidence: { type: "string" },
              product_name: { type: "string" },
              needs_human_review: { type: "boolean" },
              summary: { type: "string" },
              reply_text: { type: "string" }
            },
            required: [
              "intent",
              "confidence",
              "product_name",
              "needs_human_review",
              "summary",
              "reply_text"
            ]
          }
        }
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API 호출 실패: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const outputText = data.output_text || extractText(data);
  const parsed = JSON.parse(outputText);

  return {
    ok: true,
    mode: "ai_live",
    message: parsed.needs_human_review
      ? "AI가 답변 초안을 만들었고, 사람 확인이 권장되는 문의로 판단했습니다."
      : "AI가 실시간으로 답변 초안을 생성했습니다.",
    replyText: parsed.reply_text,
    analysis: parsed
  };
}

function buildPrompt(payload) {
  return [
    "아래 고객 문의를 분석하고 혜윰 CS 응대 초안을 작성해줘.",
    "",
    "[브랜드 기본 톤]",
    `- 현재 브랜드: ${stringValue(payload.brand) || "heyum"}`,
    "- 혜윰이면 첫 두 줄은 아래 흐름을 기본값으로 사용한다.",
    "  안녕하세요, 고객님",
    "  건강한 습관을 전하는 혜윰입니다.",
    "- 송강당이면 첫 두 줄은 아래 흐름을 기본값으로 사용한다.",
    "  안녕하세요, 고객님",
    "  백년 전통의 송강당입니다.",
    "- 문장은 짧고 부드럽게 끊는다.",
    "- 실제 상담사가 쓰는 말처럼 자연스럽게 쓴다.",
    "- 과장된 친절, 과한 영업 문구, 너무 기계적인 표현은 피한다.",
    "- 필요할 때만 가벼운 이모지를 사용할 수 있으나 남용하지 않는다.",
    "",
    "[절대 금지]",
    "- 효능이라는 표현 사용 금지",
    "- 질병 치료/개선 단정 금지",
    "- 정책에 없는 환불/보상 확정 금지",
    "- 확인하지 않은 주문 상태를 단정하지 말 것",
    "",
    "[고객 질문]",
    stringValue(payload.customerQuestion),
    "",
    "[보조 정보]",
    `고객명: ${stringValue(payload.customerName) || "미입력"}`,
    `상품명 보정: ${stringValue(payload.productName) || "자동 인식 요청"}`,
    `구매처: ${stringValue(payload.purchaseSource) || "미입력"}`,
    `주문번호: ${stringValue(payload.orderId) || "미입력"}`,
    `일정 메모: ${stringValue(payload.scheduleInfo) || "미입력"}`,
    `추가 메모: ${stringValue(payload.contextInfo) || "미입력"}`,
    `채널: ${stringValue(payload.channel) || "channelTalk"}`,
    "",
    "[응대 원칙]",
    "- 첫 인사는 고객명 유무에 맞게 자연스럽게 쓴다. 고객명이 있으면 '안녕하세요, OO고객님' 형식으로 시작한다.",
    "- 혜윰의 브랜드 표현은 반드시 '건강한 습관을 전하는 혜윰입니다.'를 우선 사용한다.",
    "- 의료적 판단, 확정적 효능, 정책 외 보상 약속은 금지한다.",
    "- 환불/반품/보상/증상 문의는 needs_human_review를 true로 두는 쪽에 보수적으로 판단한다.",
    "- 답변은 실제 고객에게 보낼 수 있는 한국어 메시지 한 본문으로 작성한다.",
    "- 메일 채널이면 제목 없이 본문만 작성한다.",
    "- 채널톡이면 짧은 문단 나눔을 유지한다.",
    "- 문단 사이에는 실제 빈 줄이 들어가도록 작성한다. CSS처럼 보이는 줄간격이 아니라 복사 가능한 줄바꿈을 사용한다.",
    "- 질문이 단순하면 답변도 짧고 명확하게 작성한다.",
    "- 선물, 포장, 배송 일정, 소비기한 문의는 친절하고 생활 밀착형 표현을 사용한다.",
    "",
    "[학습용 톤 예시]",
    "예시 1 질문: 4월 25일 상견례 예정으로 선물을 준비할까하는데 혹시 유통기한이 있을까요? 그리고 보자기 색 선택 가능할지 문의드립니다.",
    "예시 1 답변 톤: 안녕하세요, 고객님 / 건강한 습관을 전하는 혜윰입니다. / 주문시 배송메시지에 원하시는 보자기 색을 말씀주시면 해당 색으로 변경 출고 도와드리고 있습니다. / 추가로 늘옥환 선물세트의 소비기한은 27.12.19 제품으로 받아보실 수 있습니다!",
    "",
    "예시 2 질문: 배송 언제 받을 수 있나요? 어제 주문했어요.",
    "예시 2 답변 톤: 안녕하세요, 고객님 / 건강한 습관을 전하는 혜윰입니다. / 회신이 늦어 죄송합니다 😥😥 / 해당 제품은 13일 오후 출고되어 14일 수령하신 것으로 확인됩니다! / 감사합니다",
    "",
    "예시 3 질문: 보관 및 복용방법 안내문이 들어있을까요?",
    "예시 3 답변 톤: 외박스는 보자기 포장을 보호하기 위한 용도라고 먼저 설명하고, 실온보관/개봉 후 일부 섭취 시 냉장보관처럼 실사용 기준으로 부드럽게 안내한다.",
    "",
    "예시 4 질문: 달빛 공진단이 달빛 침향환으로 변경된 이유가 궁금합니다.",
    "예시 4 답변 톤: 정책과 법령에 따라 명칭이 변경되었음을 차분하게 설명하고, 품질과 원재료 배합은 변함이 없으니 안심해도 된다고 안내한다.",
    "",
    "예시 5 질문: 포장이 안되어있는데요?",
    "예시 5 답변 톤: 받은 외박스는 보자기 포장을 보호하는 박스라고 짧고 명확하게 설명한 뒤, 안쪽 보자기 포장을 확인 부탁드린다고 안내한다.",
    "",
    "[CS 가이드 반영]",
    "- 이전에 제공된 혜윰 CS 가이드의 취소/결제/반품/배송/상품문의 기준을 우선 반영한다.",
    "- 배송 기준: 주스 제품은 낮 12시까지 주문 건 당일 출고, 그 외 전 제품은 오후 3시 59분까지 주문 건 당일 출고로 안내한다.",
    "- 증상 관련 문의는 매우 보수적으로 답하고 사람 확인 필요 여부를 높게 판단한다.",
    "",
    ...guideSpecificPromptLines()
  ].join("\n");
}

function guideSpecificPromptLines() {
  return [
    "[추가 브랜드 학습 반영]",
    "- 송강당은 첫 인사 뒤에 '백년 전통의 송강당입니다.' 흐름을 자연스럽게 사용한다.",
    "- 송강당은 특정 질환이나 병명 기준의 제품 추천을 단정하지 않는다. 처음 드시는 분은 대명공진보, 이후 비교 상품은 송강맥공진보와 송강공진보 진 흐름을 참고한다.",
    "- 송강당 공진키즈는 생후 12개월 이상의 영유아부터 성장기 청소년까지 비교 안내 가능한 스틱형 키즈 홍삼 제품으로 참고한다.",
    "- 송강당 전 상품은 직사광선을 피해 서늘한 곳에서 실온 보관을 기본으로 안내하고, 냉장 보관 시 섭취 전 10분 정도 실온에 두었다가 드시도록 안내할 수 있다.",
    "- 송강당 상품은 평일 오후 4시 이전 주문 건 당일 출고 기준을 참고한다.",
    "- 헤이루틴 ABC주스와 빼빼주스는 과일과 채소를 갈아 만든 냉장 과채주스로, 하루 2~3팩·공복·식전·간식·한끼대용 흐름 안내가 가능하다.",
    "- 헤이루틴 NFC 배도라지즙은 배, 도라지, 생강만 착즙한 상온 보관 제품으로, 어린 자녀 간식 음료 문의 시에도 자주 비교되는 제품이다.",
    "- 혜윰 주스 라인은 의료용이 아닌 식품이므로 임산부, 영유아, 알러지, 질환 관련 문의에는 원재료 확인 후 의사 상담을 권하는 보수적 톤을 유지한다.",
    "- 헤이루틴 ABC주스와 빼빼주스는 냉장 보관, 냉동 비권장, 제조일 기준 3개월 안내를 참고하고, 배도라지즙은 상온 보관과 제조일 기준 1년 안내를 참고한다.",
    "- 혜윰 주스라인 배송은 평일 12시 이전 결제 건 당일 출고를 우선 참고하고, 배도라지즙은 일반택배로 1~2일 안내가 가능하다.",
    "- 헤이루틴 ABC주스와 빼빼주스는 수령 후 단순변심 반품이 어려운 냉장상품이며, 배도라지즙은 배송 완료 후 7일 이내 반품 기준을 참고한다."
  ];
}

async function serveStatic(pathname, res) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = normalize(join(__dirname, safePath));
  const baseName = filePath.split(/[\\/]/).pop() || "";

  if (!filePath.startsWith(normalize(__dirname))) {
    sendJson(res, 403, { error: "접근할 수 없는 경로입니다." });
    return;
  }

  // Never expose env files or other dotfiles over HTTP.
  if (baseName.startsWith(".")) {
    sendJson(res, 403, { error: "접근할 수 없는 경로입니다." });
    return;
  }

  try {
    const file = await readFile(filePath);
    const extension = extname(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream"
    });
    res.end(file);
  } catch {
    sendJson(res, 404, { error: "파일을 찾을 수 없습니다." });
  }
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf-8");
  return raw ? JSON.parse(raw) : {};
}

async function handleAuth(req, res, envMap) {
  if (req.method === "GET") {
    sendJson(res, 200, { authenticated: isAuthenticated(req, envMap) });
    return;
  }

  if (req.method === "DELETE") {
    sendJson(res, 200, { authenticated: false }, {
      "Set-Cookie": buildClearAuthCookie(envMap)
    });
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "허용되지 않는 메서드입니다." });
    return;
  }

  const body = await readJson(req);
  if (!isValidPassword(body.password, envMap)) {
    sendJson(res, 401, {
      authenticated: false,
      error: "비밀번호가 올바르지 않습니다."
    });
    return;
  }

  sendJson(res, 200, { authenticated: true }, {
    "Set-Cookie": buildAuthCookie(envMap)
  });
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    ...extraHeaders
  });
  res.end(JSON.stringify(payload));
}

async function loadEnv(filePath) {
  try {
    const raw = await readFile(filePath, "utf-8");
    return Object.fromEntries(
      raw
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"))
        .map((line) => {
          const index = line.indexOf("=");
          return [line.slice(0, index), line.slice(index + 1)];
        })
    );
  } catch {
    return {};
  }
}

function stringValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isAuthenticated(req, envMap) {
  const token = parseCookies(req.headers.cookie || "").heyum_cs_auth;
  return token ? verifyAuthToken(token, envMap) : false;
}

function isValidPassword(password, envMap) {
  const expected = envMap.APP_PASSWORD;
  if (!expected || typeof password !== "string") {
    return false;
  }

  const actualBuffer = Buffer.from(password, "utf-8");
  const expectedBuffer = Buffer.from(expected, "utf-8");

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(actualBuffer, expectedBuffer);
}

function buildAuthCookie(envMap) {
  const token = createAuthToken(envMap);
  const parts = [
    `heyum_cs_auth=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=43200"
  ];

  return parts.join("; ");
}

function buildClearAuthCookie() {
  return "heyum_cs_auth=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0";
}

function createAuthToken(envMap) {
  const secret = envMap.AUTH_SECRET || envMap.APP_PASSWORD || "heyum-cs-auth";
  return createHmac("sha256", secret).update("heyum-cs-auth").digest("hex");
}

function verifyAuthToken(token, envMap) {
  const expected = createAuthToken(envMap);
  const tokenBuffer = Buffer.from(token, "utf-8");
  const expectedBuffer = Buffer.from(expected, "utf-8");

  if (tokenBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(tokenBuffer, expectedBuffer);
}

function parseCookies(rawCookie) {
  return rawCookie
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((acc, part) => {
      const [name, ...rest] = part.split("=");
      acc[name] = decodeURIComponent(rest.join("="));
      return acc;
    }, {});
}

function extractText(data) {
  const texts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) {
        texts.push(content.text);
      }
    }
  }
  return texts.join("\n").trim();
}
