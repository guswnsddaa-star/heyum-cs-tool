import {
  buildAuthCookie,
  buildClearAuthCookie,
  isAuthenticated,
  isValidPassword
} from "../lib/auth.mjs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ authenticated: isAuthenticated(req, process.env) });
    return;
  }

  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", buildClearAuthCookie(process.env));
    res.status(200).json({ authenticated: false });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "허용되지 않는 메서드입니다." });
    return;
  }

  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!isValidPassword(password, process.env)) {
    res.status(401).json({
      authenticated: false,
      error: "비밀번호가 올바르지 않습니다."
    });
    return;
  }

  res.setHeader("Set-Cookie", buildAuthCookie(process.env));
  res.status(200).json({ authenticated: true });
}
