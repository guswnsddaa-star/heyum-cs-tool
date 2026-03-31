const products = [
  "별빛침향환 선물세트 (침향환,침향단)",
  "늘옥환 선물세트",
  "달빛침향환 선물세트",
  "헤이루틴 어린이 NFC 배도라지즙 21팩",
  "헤이루틴 ABC주스ㅣ14팩, 30팩, 60팩, 90팩",
  "헤이루틴 빼빼주스ㅣ14팩, 30팩, 60팩, 90팩",
  "늘옥환 습관 선물세트",
  "별빛침향환 습관 선물세트",
  "달빛침향환ㅣ7환,14환",
  "별빛침향환ㅣ7환,14환",
  "늘옥환ㅣ7환,14환",
  "생루습 내열 강화 유리컵 / a cup of T.R.H.",
  "나날침향ㅣ10개입,30개입",
  "습관 입문자 선물세트 (만수무강)",
  "헤이루틴 별빛침향환 50환",
  "헤이루틴 늘옥환 50환",
  "달빛침향환 습관 선물세트",
  "느루혜윰 14포"
];

const productAliases = {
  "별빛침향환": "별빛침향환ㅣ7환,14환",
  "별빛공진": "별빛침향환 선물세트 (침향환,침향단)",
  "달빛침향환": "달빛침향환ㅣ7환,14환",
  "달빛공진": "달빛침향환 선물세트",
  "늘옥환": "늘옥환ㅣ7환,14환",
  "늘옥고": "늘옥환 선물세트",
  "나날공진": "나날침향ㅣ10개입,30개입",
  "나날침향": "나날침향ㅣ10개입,30개입",
  "배도라지즙": "헤이루틴 어린이 NFC 배도라지즙 21팩",
  "abc주스": "헤이루틴 ABC주스ㅣ14팩, 30팩, 60팩, 90팩",
  "빼빼주스": "헤이루틴 빼빼주스ㅣ14팩, 30팩, 60팩, 90팩",
  "느루혜윰": "느루혜윰 14포"
};

const scenarios = [
  {
    id: "condition_recommendation",
    category: "상품 관련",
    title: "특정 질환/병명 관련 제품 추천 문의",
    useCase: "고객이 고혈압, 코로나 등 특정 질환이나 병명을 언급하며 어떤 제품이 맞는지 물을 때 사용합니다.",
    sourceQuestion: "고혈압(ex. 특정 질환 혹은 병명) 있는 코로나 환자인데 어느 제품이 좋을까요?",
    contextPlaceholder: "예: 고혈압, 수술 후 회복 중, 당뇨",
    subject: "특정 질환 관련 제품 문의 답변",
    build(form) {
      const condition = form.contextInfo || "문의주신 증상";
      return [
        greeting(form.customerName),
        `${condition} 관련 제품 추천 문의 주셔서 감사합니다.`,
        "혜윰은 의료용이 아닌 건강식품이기 때문에 특정 질환이나 병명에 따라 제품을 권장드리기는 어렵습니다.",
        `다만 혜윰의 모든 제품은 체질과 무관하게 누구나 드실 수 있도록 기획되어 있으며, ${condition}가 있으신 경우에는 평소 진료받으시는 병원이나 전문의와 상담 후 섭취를 권장드립니다.`,
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "student_recommendation",
    category: "상품 관련",
    title: "수험생/특정 대상 추천 문의",
    useCase: "수험생, 부모님, 남편 등 특정 대상에게 어울리는 제품 추천을 요청할 때 사용합니다.",
    sourceQuestion: "수험생(ex. 특정 사람 지칭)인데 면역에 어느 제품이 좋을까요?",
    contextPlaceholder: "예: 수험생, 남편, 중요한 시험 앞둔 자녀",
    subject: "대상별 제품 추천 안내",
    build(form) {
      const person = form.contextInfo || "문의주신 분";
      return [
        greeting(form.customerName),
        `${person}께 맞는 제품 문의 주셨네요.`,
        "혜윰은 의료용이 아닌 건강식품이기 때문에 질환 기준으로 권해드리기보다는 원재료 특성과 섭취 형태를 기준으로 안내드리고 있습니다.",
        "평소 홍삼이 몸에 잘 맞으셨고 환 제품을 자주 드셔왔다면 별빛침향환을 추천드립니다. 혜윰의 베스트셀러이자 선물용으로도 만족도가 높은 제품입니다.",
        "혹시 환 제품이 익숙하지 않으시다면 스틱 타입 제품 위주로 비교해보시는 것도 좋습니다. 발송 전에는 최근 판매 상품과 옵션을 한 번 더 확인해 안내드려 주세요.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "parents_gift",
    category: "상품 관련",
    title: "부모님 선물 추천 문의",
    useCase: "부모님, 어르신 선물로 어떤 제품이 좋은지 물을 때 사용합니다.",
    sourceQuestion: "부모님(ex. 특정 사람 지칭)께 드리기 좋은 제품 추천해주세요.",
    contextPlaceholder: "예: 부모님, 장인어른, 감사 선물",
    subject: "부모님 선물 추천 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "부모님 선물용 제품 문의 주셔서 감사합니다.",
        "혜윰은 부수적인 부재료보다 주 원재료를 담아내는 데 집중하고 있어 제품별 핵심 원재료를 먼저 살펴보시면 선택에 도움이 됩니다.",
        "평소 한방 제품이 몸에 잘 맞으셨고 환 타입을 자주 드셔왔다면 달빛침향환 계열을 먼저 추천드립니다. 침향, 녹용, 산수유, 당귀 함량에 집중한 구성이라 선물 만족도가 높은 편입니다.",
        "또 다른 추천 상품으로는 별빛침향환 계열이 있습니다. 혜윰의 베스트셀러이자 선물 후 재구매로 이어지는 경우가 많아 선물용 문의 시 자주 안내드리는 제품입니다.",
        "선물세트, 습관 선물세트, 7환/14환 구성처럼 예산에 맞게 고를 수 있으니 오늘 판매 중인 상품 기준으로 함께 안내드리면 좋습니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "same_as_kurly",
    category: "상품 관련",
    title: "마켓컬리 판매 상품 동일 여부",
    useCase: "마켓컬리 상품과 자사몰 상품이 같은지, 침향환이 맞는지 묻는 문의에 사용합니다.",
    sourceQuestion: "마켓컬리에서 판매하는 제품과 동일한가요? 침향환 맞죠?",
    contextPlaceholder: "예: 마켓컬리 / 별빛침향환",
    subject: "판매처별 상품 동일 여부 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "문의주신 상품은 판매처만 다를 뿐 본사에서 취급하는 동일 상품입니다.",
        "별빛침향환과 달빛침향환 계열 모두 침향이 들어간 제품이며, 제품별 침향 함량과 함께 홍삼 등 주원재료 구성이 다를 수 있어 구매 시 함량표를 함께 확인해주시면 좋습니다.",
        `현재 선택하신 상품은 ${productLine(form.productName)} 기준으로 안내드리면 더 자연스럽습니다.`,
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "unauthorized_market",
    category: "상품 관련",
    title: "비공식 판매처 문의",
    useCase: "11번가 등 공식 판매처가 아닌 채널의 상품에 대해 물을 때 사용합니다.",
    sourceQuestion: "11번가에서 파는 건 다른 건가요? 가격 차이가 많이 나서요.",
    contextPlaceholder: "예: 11번가, 중고마켓, 오픈마켓",
    subject: "비공식 판매처 관련 안내",
    build(form) {
      const marketplace = form.contextInfo || "문의주신 판매처";
      return [
        greeting(form.customerName),
        `${marketplace} 판매 상품 관련 문의 주셔서 감사합니다.`,
        "현재 혜윰은 일부 공식 채널 외 판매처에 대해서는 정식 판매 여부를 보장해드리기 어렵습니다.",
        "공식 판매처가 아닌 경우에는 품질, 구성, 보관 상태 등에 대해 본사 차원에서 확인이나 보장을 드리기 어려운 점 양해 부탁드립니다.",
        "안전한 구매를 위해서는 혜윰 공식몰 또는 공식 입점 채널 이용을 권장드립니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "gongjindan_difference",
    category: "상품 관련",
    title: "한의원 공진단과의 차이 문의",
    useCase: "한의원 공진단과 같은지, 처방 제품과 어떤 차이가 있는지 묻는 경우에 사용합니다.",
    sourceQuestion: "한의원에서 판매하는 공진단이랑 같은 건가요?",
    contextPlaceholder: "예: 공진단 차이점 문의",
    subject: "공진단과의 차이 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "한의원에서 처방되는 공진단은 의료용 제품으로 처방전이 필요한 경우가 많고, 혜윰 제품은 체질과 관계없이 누구나 드실 수 있도록 풀어낸 건강식품입니다.",
        "공진단 원방 중 사향은 의료용으로 분류되기 때문에 처방 없이 사용이 어렵고, 혜윰은 그 대신 침향을 사용해 일상에서 꾸준히 드시기 쉽도록 기획했습니다.",
        "사향/침향 차이를 제외하면 원재료 방향성과 배합 철학을 이해하시기 좋고, 혜윰 제품은 별도 첨가물 없이 원재료 함량을 중점적으로 보시면 됩니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "gold_leaf",
    category: "상품 관련",
    title: "금박 안전성 문의",
    useCase: "식용 금박이 왜 필요한지, 중금속이 걱정된다는 문의에 사용합니다.",
    sourceQuestion: "금박은 흡수도 안 되는 걸로 아는데 왜 씌우는 건가요? 중금속 위험이 있던데?",
    contextPlaceholder: "예: 금박, 식용금, 중금속",
    subject: "식용 금박 관련 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "혜윰에서 사용하는 식용금은 식용에 문제가 없는 24K 순도 95~100% 수준의 금을 사용하고 있습니다.",
        "식용금은 몸에 흡수되기보다 배출되는 특성이 있지만, 환의 주요 성분과 품질을 보존하는 역할을 함께 합니다.",
        "특히 침향처럼 방향 성질을 가진 원재료의 향을 최대한 보존하고, 습기를 차단해 품질을 지켜주는 목적도 있습니다.",
        "시각적인 고급스러움까지 더해져 드시는 분의 만족감과 선물하시는 분의 마음을 함께 고려한 구성이라는 점 참고 부탁드립니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "how_to_take",
    category: "상품 관련",
    title: "섭취 방법 문의",
    useCase: "언제, 어떻게 먹으면 좋은지 묻는 경우에 사용합니다.",
    sourceQuestion: "섭취를 언제 어떻게 하면 되나요?",
    contextPlaceholder: "예: 아침 공복, 복용 시간",
    subject: "섭취 방법 안내",
    build(form) {
      return [
        greeting(form.customerName),
        `${productLine(form.productName)} 섭취 방법 문의 주셔서 감사합니다.`,
        "섭취 시간은 크게 제한이 없지만, 성분 흡수를 고려하면 아침 공복에 드시는 방법을 가장 많이 안내드리고 있습니다.",
        "환 제품은 한 알을 씹어서 드시는 방법을 권장드리며, 스틱형 제품은 휴대와 섭취가 편한 시간대에 꾸준히 드시면 좋습니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "youth_dosage",
    category: "상품 관련",
    title: "청소년 섭취량 문의",
    useCase: "청소년, 수험생이 얼마나 먹으면 되는지 묻는 경우에 사용합니다.",
    sourceQuestion: "수험생이나 청소년은 얼마나 먹으면 되나요?",
    contextPlaceholder: "예: 청소년, 중학생, 수험생",
    subject: "청소년 섭취량 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "청소년의 경우 먼저 한 알을 온전히 드셔본 뒤 몸 상태를 확인해보시는 것을 권장드립니다.",
        "만약 어지럽거나 열감이 느껴지는 등 부담이 있으시면 1/2 정도로 양을 조절해서 드시는 방법을 안내드리고 있습니다.",
        "처음에는 적은 양으로 시작한 뒤 몸 상태에 맞춰 조절해 주세요.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "storage",
    category: "상품 관련",
    title: "보관 방법 문의",
    useCase: "실온/냉장 보관 여부, 개봉 후 관리법을 물을 때 사용합니다.",
    sourceQuestion: "보관 어떻게 해야하나요?",
    contextPlaceholder: "예: 냉장 보관, 개봉 후 보관",
    subject: "보관 방법 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "혜윰 전 상품은 직사광선을 피해 건조하고 서늘한 곳에서 실온 보관해주시면 됩니다.",
        "다만 환 제품을 깨물었거나 개봉한 상태라면 냉장 보관을 권장드리며, 개봉 후에는 가능한 빠른 시일 내 섭취해 주세요.",
        "냉장 보관 후 드실 때에는 약 10분 정도 실온에 두었다가 드시면 더 편하게 섭취하실 수 있습니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "cancel_status_request",
    category: "취소/결제/반품 관련",
    title: "주문 취소 진행 상태 문의",
    useCase: "고객이 주문 취소를 요청했는데 언제 처리되는지 먼저 확인하고 싶을 때 사용합니다.",
    sourceQuestion: "주문 취소요청 했는데 언제 되나요?",
    contextPlaceholder: "예: 공식몰 / 주문자명 / 010-0000-0000",
    subject: "주문 취소 확인 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "정확한 주문 확인을 위해 아래 내용을 보내주시면 빠르게 확인 후 도와드리겠습니다.",
        "주문하신 곳 / 주문자 성함 / 전화번호",
        form.orderId ? `주문번호가 있으시면 함께 남겨주세요. (${form.orderId})` : "주문번호가 있으시면 함께 남겨주시면 확인이 더 빨라집니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "cancel_by_payment_type",
    category: "취소/결제/반품 관련",
    title: "주문 취소 요청 접수 후 처리 안내",
    useCase: "고객이 실제로 취소를 요청했고, 무통장/카드/출고 후 상태에 따라 안내할 때 사용합니다.",
    sourceQuestion: "공식몰, 김혜윰, 010-000-000 결제 취소요.",
    contextPlaceholder: "예: 출고 전 카드결제 / 출고 전 무통장입금 / 출고 후",
    subject: "주문 취소 처리 안내",
    build(form) {
      const caseType = form.contextInfo || "출고 전 카드결제";

      if (caseType.includes("무통장")) {
        return [
          greeting(form.customerName),
          "해당 주문은 취소로 도와드렸습니다.",
          "무통장입금 건의 경우 환불받으실 계좌정보를 보내주시면 빠르게 처리해드리겠습니다. [은행명 / 계좌번호 / 예금주 성함]",
          standardClosing(form.managerName)
        ];
      }

      if (caseType.includes("출고 후")) {
        return [
          greeting(form.customerName),
          "확인해보니 해당 주문은 현재 이미 출고된 상태로 확인되어 즉시 취소는 어렵습니다.",
          "출고 후 취소 시에는 반품 절차로 진행되며, 왕복 택배비 6,000원이 발생합니다.",
          "원하시면 반품 절차 기준으로 이어서 안내드리겠습니다.",
          standardClosing(form.managerName)
        ];
      }

      return [
        greeting(form.customerName),
        "해당 주문은 취소로 도와드렸습니다.",
        "카드 결제 건의 경우 취소 접수는 즉시 진행되지만, 카드사 사정에 따라 승인 취소 및 환불 반영까지 3~7일 정도 소요될 수 있습니다.",
        "이미 취소 완료된 건이라면 취소 접수일 기준으로 카드 승인 취소 및 환불 처리 여부를 함께 확인해드릴 수 있습니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "refund_return_status",
    category: "취소/결제/반품 관련",
    title: "반품 후 환불 진행 상태 문의",
    useCase: "반품 요청 후 환불이 언제 되는지 문의할 때 사용합니다.",
    sourceQuestion: "반품 요청했는데 결제 취소(환불) 언제 되나요?",
    contextPlaceholder: "예: 반품상품 수령 완료 / 반품 이동 중 / 카드결제 / 무통장입금",
    subject: "반품 환불 진행 안내",
    build(form) {
      const caseType = form.contextInfo || "반품상품 수령 완료";

      if (caseType.includes("무통장")) {
        return [
          greeting(form.customerName),
          "기다려주셔서 감사합니다.",
          "반품하신 상품 검수 후 환불 절차로 진행 도와드릴 예정입니다.",
          "무통장입금 건은 환불받으실 계좌정보를 보내주시면 빠르게 처리해드리겠습니다. [은행명 / 계좌번호 / 예금주 성함]",
          standardClosing(form.managerName)
        ];
      }

      if (caseType.includes("카드")) {
        return [
          greeting(form.customerName),
          "기다려주셔서 감사합니다.",
          "반품하신 상품 검수 후 카드 결제 취소로 진행 도와드리겠습니다.",
          "카드 결제 취소는 접수 즉시 진행되지만 카드사 사정에 따라 실제 환불 반영까지 3~7일 정도 소요될 수 있습니다.",
          standardClosing(form.managerName)
        ];
      }

      if (caseType.includes("이동 중") || caseType.includes("미수령")) {
        return [
          greeting(form.customerName),
          "현재 반품하신 상품 회수가 아직 진행 중인 상태입니다.",
          "반품 상품이 입고되어 확인되면 보통 1~2일 내 결제 취소가 진행됩니다.",
          standardClosing(form.managerName)
        ];
      }

      return [
        greeting(form.customerName),
        "기다려주셔서 감사합니다.",
        "반품하신 상품은 금일 회수 및 검수 완료된 것으로 확인됩니다.",
        "결제 수단에 따라 환불 절차를 이어서 진행해드리며, 카드 결제 건은 카드사 반영까지 3~7일 정도, 무통장입금은 계좌정보 확인 후 빠르게 처리됩니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "exchange_request",
    category: "취소/결제/반품 관련",
    title: "교환 요청 및 절차 문의",
    useCase: "고객이 상품 교환 가능 여부나 교환 절차를 문의할 때 사용합니다.",
    sourceQuestion: "교환 관련 문의",
    contextPlaceholder: "예: 파손 교환 / 오배송 교환 / 옵션 교환",
    subject: "교환 요청 안내",
    build(form) {
      const exchangeType = form.contextInfo || "문의주신 교환 내용";
      return [
        greeting(form.customerName, form.brand),
        `${exchangeType} 관련 교환 문의 주셔서 감사합니다.`,
        "정확한 확인을 위해 주문하신 곳, 주문자 성함, 전화번호와 교환이 필요한 사유를 함께 남겨주시면 빠르게 확인 후 안내드리겠습니다.",
        "상품 상태와 주문 진행 상황에 따라 교환 가능 여부 및 절차가 달라질 수 있어 확인 후 가장 알맞은 방향으로 도와드리겠습니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "opened_food_return_exception",
    category: "취소/결제/반품 관련",
    title: "개봉 상품 반품/예외 환불 문의",
    useCase: "식품 특성상 개봉 후 반품이 어려운 상황에서 예외 처리 기준을 안내할 때 사용합니다.",
    sourceQuestion: "먹고 설사가 났어요. 14개입 샀는데 7+7환이라 1상자는 안 뜯었거든요. 안 뜯은 1개는 환불받고 싶어요.",
    contextPlaceholder: "예: 14환 7+7 구성 / 일부 미개봉 / 네이버페이 반품 접수",
    subject: "개봉 상품 반품 예외 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "먼저 불편을 겪으셨다니 현재는 괜찮아지셨기를 진심으로 바랍니다.",
        "14환 제품은 7환+7환 구성의 밀봉 식품 상품이어서 이미 개봉한 제품은 원칙적으로 반품이 어렵습니다.",
        "또한 섭취 후 증상 관련 사유로 반품이 진행되는 경우에는 처방전 등 관련 확인 서류가 필요할 수 있습니다.",
        "다만 고객님의 상황을 고려해 예외적으로 반품 진행 여부를 검토해드릴 수 있으며, 구매하신 결제처에서 먼저 반품 신청을 해주신 뒤 상품을 보내주셔야 처리가 가능합니다.",
        "[반품 보내주실 주소] 서울특별시 서초구 마방로6길 21, 지창빌딩 5F",
        "빠른 확인이 필요하시면 02-512-1924로 연락 주시면 더 신속하게 도와드리겠습니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "same_day_shipping",
    category: "배송 관련",
    title: "당일 출고 문의",
    useCase: "오늘 출발 가능한지, 언제 발송되는지 묻는 경우에 사용합니다.",
    sourceQuestion: "배송 오늘 출발하나요?",
    contextPlaceholder: "예: 오늘 출발 가능한지 문의",
    subject: "당일 출고 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "평일 기준 오후 4시 이전 주문 건은 당일 출고로 안내드리고 있습니다.",
        "다만 택배사 수거 상황이나 내부 마감 상황에 따라 세부 일정은 달라질 수 있어 출고 전 최종 확인 후 안내드리면 가장 안전합니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "tracking_delay",
    category: "배송 관련",
    title: "송장 움직임 없음 문의",
    useCase: "송장 조회가 며칠째 같은 위치로 보일 때 사용하는 답변입니다.",
    sourceQuestion: "송장 조회 했는데 며칠째 같은 곳에 있어요. 분실된 건가요?",
    contextPlaceholder: "예: 3일째 단원SUB, 움직임 없음",
    subject: "송장 조회 지연 안내",
    build(form) {
      const trackingMemo = form.contextInfo || "운송장 상세 추적상 동일 위치에 머무르는 것으로 확인됩니다.";
      return [
        greeting(form.customerName),
        trackingMemo,
        "택배 이동 과정에서는 바코드 스캔 시점에 따라 송장 흐름이 잠시 멈춘 것처럼 보일 수 있으며, 주말이나 지역 물량에 따라 반영이 늦어지는 경우도 있습니다.",
        "혜윰 기준으로 택배사 분실 사례는 드문 편이라 우선은 안심하시고 조금만 더 지켜봐 주시길 부탁드리고 있습니다.",
        "필요하시면 담당 기사 배정 여부나 추가 확인 내용까지 함께 안내드리겠습니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "multi_address",
    category: "배송 관련",
    title: "나눔배송/여러 주소 배송 문의",
    useCase: "한 번 주문하고 여러 배송지로 나눠서 보낼 수 있는지 묻는 경우에 사용합니다.",
    sourceQuestion: "한번에 주문하고 여러 곳으로 배송 가능한가요?",
    contextPlaceholder: "예: 3군데 나눔배송",
    subject: "나눔배송 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "나눔배송을 원하시는 경우 배송지 정보를 각각 남겨주시면 주소별로 출고 도와드리고 있습니다.",
        "여러 곳으로 분리 발송이 필요한 주문은 오기입이 없도록 수령인명, 연락처, 주소를 한 번 더 확인한 뒤 접수해 주세요.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "holiday_delivery",
    category: "배송 관련",
    title: "명절 전 도착 문의",
    useCase: "설, 추석 등 특정 기한 전 도착 가능 여부를 묻는 경우에 사용합니다.",
    sourceQuestion: "혹시 지금 주문하면 설 전에 도착할까요?",
    contextPlaceholder: "예: 설 전 도착, 추석 전 수령",
    subject: "명절 전 배송 가능 여부 안내",
    build(form) {
      const holiday = form.contextInfo || "문의주신 일정";
      return [
        greeting(form.customerName),
        `${holiday} 기준 배송 가능 여부 문의 주셔서 감사합니다.`,
        "명절 전 택배 마감 이후에는 명절 이후 수령으로 안내드리고 있습니다.",
        "만약 급하게 받아보셔야 하는 경우에는 공식 입점 채널 재고나 수도권 퀵 가능 여부까지 함께 확인해드리면 응대가 더 자연스럽습니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "strike_area",
    category: "배송 관련",
    title: "택배 파업 지역 문의",
    useCase: "택배 파업 지역인데 주문 가능한지 묻는 경우에 사용합니다.",
    sourceQuestion: "택배파업 관련된 지역입니다. 주문하면 타 택배사로 보내지나요?",
    contextPlaceholder: "예: 파업 지역 / 제주 / 도서산간",
    subject: "택배 파업 지역 배송 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "기본 출고는 CJ대한통운 기준으로 진행되지만, 파업 지역일 경우에는 롯데택배나 우체국택배 등 다른 택배사로 대체 발송되는 경우가 있습니다.",
        "실제 수령에 불편이 없도록 가능한 출고 방법으로 조정해드리고 있으니 안심하고 주문해주셔도 됩니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "cod_issue",
    category: "배송 관련",
    title: "무료배송인데 착불로 도착한 경우",
    useCase: "무료배송 상품이 착불로 출고된 사고 대응에 사용합니다.",
    sourceQuestion: "배송비 무료라고 확인하고 주문했는데 택배가 착불로 왔네요.",
    contextPlaceholder: "예: 착불 비용 3,000원 발생",
    subject: "착불 배송 사고 관련 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "먼저 믿고 구매해주셨는데 예상치 못한 착불 배송으로 불편을 드리게 되어 진심으로 죄송합니다.",
        "무료배송으로 받아보시는 것이 맞으며, 확인 결과 송장 출력 과정의 택배 시스템 오류로 착불 출고된 것으로 보입니다.",
        "조금이라도 빠르게 처리해드릴 수 있도록 고객님께 연락드려 착불비 처리 방안을 안내드리고자 합니다.",
        "불편을 드린 점 다시 한 번 사과드립니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "overseas_shipping",
    category: "배송 관련",
    title: "해외배송 문의",
    useCase: "국가별 해외배송 가능 여부, EMS 여부, 비용 부담을 물을 때 사용합니다.",
    sourceQuestion: "해외배송 가능한가요?",
    contextPlaceholder: "예: 미국 배송 가능 여부",
    subject: "해외배송 안내",
    build(form) {
      const country = form.contextInfo || "문의주신 국가";
      return [
        greeting(form.customerName),
        `${country} 기준 해외배송 문의 주셔서 감사합니다.`,
        "해외배송은 국가에 따라 가능 여부가 달라지며, 우체국 EMS(UPS) 기준으로 진행됩니다.",
        "해외배송 비용은 고객님 부담이며 국가, 배송지, 상품 무게에 따라 금액이 달라질 수 있습니다.",
        "정확한 안내를 위해 국가명과 상품 구성을 함께 확인해주시면 더 빠르게 도와드릴 수 있습니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "damaged_package",
    category: "배송 관련",
    title: "파손/훼손 상품 재출고 안내",
    useCase: "상품이 파손된 사진과 함께 재출고 문의가 들어왔을 때 사용합니다.",
    sourceQuestion: "지금 받았는데 이렇게 왔습니다. (+훼손사진)",
    contextPlaceholder: "예: 박스 파손, 내용물 찌그러짐",
    subject: "파손 상품 재출고 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "받아보신 상품으로 만족스럽지 못한 경험을 드리게 되어 죄송합니다.",
        "혜윰은 기본적으로 opp, 완충재, 겉상자로 포장되어 출고되며 이번 건은 배송 과정에서 파손된 것으로 보입니다.",
        "해당 상품은 빠르게 재출고될 수 있도록 우선 처리해드리겠습니다.",
        "다시 한 번 불편을 드려 죄송하며, 더 나은 혜윰이 되도록 노력하겠습니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "survey_gift",
    category: "이벤트 관련",
    title: "고객 설문조사 참여 혜택 문의",
    useCase: "QR 설문 참여 후 선물이 발송되는지 묻는 경우에 사용합니다.",
    sourceQuestion: "고객설문조사한 경우 따로 선물 발송 되는 게 있나요?",
    contextPlaceholder: "예: QR 설문 응답 완료",
    subject: "설문 참여 혜택 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "상품과 함께 보내드린 QR코드를 통한 고객만족도 조사 참여를 말씀주신 것으로 확인됩니다.",
        "설문에 응답해주신 경우 혜윰 제품을 경험하실 수 있는 다양한 제품 테스터가 발송될 수 있습니다.",
        "응답해주신 달 기준 익월 첫째 주 금요일에 일괄 발송되는 방식으로 안내드리고 있습니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "kurly_bag",
    category: "기타 관련",
    title: "마켓컬리 쇼핑백 상태 문의",
    useCase: "마켓컬리 주문 건의 쇼핑백 상태나 포장 상태에 대해 본사에 문의하는 경우에 사용합니다.",
    sourceQuestion: "마켓컬리에서 구매해왔는데 쇼핑백이 자주 구겨져서 옵니다. 이번에는 선물용이니 구겨지지 않은 걸로 부탁합니다.",
    contextPlaceholder: "예: 컬리 쇼핑백 구김",
    subject: "타 판매처 주문 건 관련 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "선물용으로 구매하셨는데 포장 상태 때문에 신경이 많이 쓰이셨을 것 같아요.",
        "다만 해당 주문은 컬리 주문 건이라 자사 출고 시스템이 아닌 구매처 기준으로 처리되어, 해당 요청은 컬리 고객센터를 통해 접수해주셔야 정확한 확인이 가능합니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "label_request",
    category: "기타 관련",
    title: "선물세트 구분 표기 요청",
    useCase: "여러 선물세트를 함께 구매했을 때 박스 외부 표기 요청이 들어오는 경우에 사용합니다.",
    sourceQuestion: "늘옥고, 별빛공진 선물세트 하나씩 샀는데 구분할 수 있게 표기해주세요.",
    contextPlaceholder: "예: 상품명 스티커 표기 요청",
    subject: "선물세트 구분 표기 안내",
    build(form) {
      return [
        greeting(form.customerName),
        "요청주신 구분 표기 내용 확인되었습니다.",
        "상품을 받아보실 때에는 흰색 상자 기준으로 각 상자에 상품명이 스티커로 표기되어 구분 가능하도록 준비해드릴 예정입니다.",
        "출고 전 마지막으로 상품 구성만 한 번 더 확인해두시면 더 안전합니다.",
        standardClosing(form.managerName)
      ];
    }
  },
  {
    id: "call_followup",
    category: "기타 관련",
    title: "유선상담 후 문자/메일 재안내",
    useCase: "통화 품질이 좋지 않아 문자나 메일로 한 번 더 정리해 보내야 할 때 사용합니다.",
    sourceQuestion: "유선상담 통화소리가 잘 안 들렸지만 알겠습니다.",
    contextPlaceholder: "예: 통화 중 배송 일정 안내 / 반품 절차 설명",
    subject: "유선상담 내용 재안내",
    build(form) {
      const summary = form.contextInfo || "방금 안내드린 상담 내용을 아래와 같이 다시 정리드립니다.";
      return [
        greeting(form.customerName),
        "조금 전 유선으로 상담 도와드렸는데 통화 수신 상태가 좋지 않아 원활하게 안내드리지 못한 것 같아 메시지로 한 번 더 정리해드립니다.",
        summary,
        standardClosing(form.managerName)
      ];
    }
  }
];

const elements = {
  brand: document.getElementById("brand"),
  customerQuestion: document.getElementById("customerQuestion"),
  customerName: document.getElementById("customerName"),
  productName: document.getElementById("productName"),
  purchaseSource: document.getElementById("purchaseSource"),
  orderId: document.getElementById("orderId"),
  scheduleInfo: document.getElementById("scheduleInfo"),
  contextInfo: document.getElementById("contextInfo"),
  managerName: document.getElementById("managerName"),
  decisionMode: document.getElementById("decisionMode"),
  decisionAssist: document.getElementById("decisionAssist"),
  decisionReview: document.getElementById("decisionReview"),
  generateButton: document.getElementById("generateButton"),
  aiButton: document.getElementById("aiButton"),
  resetButton: document.getElementById("resetButton"),
  resultText: document.getElementById("resultText"),
  resultBadge: document.getElementById("resultBadge"),
  engineBadge: document.getElementById("engineBadge"),
  copyButton: document.getElementById("copyButton"),
  copyBottomButton: document.getElementById("copyBottomButton"),
  analysisSummary: document.getElementById("analysisSummary"),
  engineSummary: document.getElementById("engineSummary"),
  scenarioUseCase: document.getElementById("scenarioUseCase"),
  scenarioSource: document.getElementById("scenarioSource"),
  authGate: document.getElementById("authGate"),
  authForm: document.getElementById("authForm"),
  authPassword: document.getElementById("authPassword"),
  authSubmit: document.getElementById("authSubmit"),
  authMessage: document.getElementById("authMessage"),
  logoutButton: document.getElementById("logoutButton")
};

initialize();

async function initialize() {
  populateProducts();
  attachEvents();
  generateMessage();
  await refreshAuthState();
}

function populateProducts() {
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product;
    option.textContent = product;
    elements.productName.appendChild(option);
  });
}

function attachEvents() {
  [
    elements.brand,
    elements.customerQuestion,
    elements.customerName,
    elements.productName,
    elements.purchaseSource,
    elements.orderId,
    elements.scheduleInfo,
    elements.contextInfo,
    elements.managerName
  ].forEach((element) => {
    element.addEventListener("input", generateMessage);
    element.addEventListener("change", generateMessage);
  });

  elements.generateButton.addEventListener("click", generateMessage);
  elements.aiButton.addEventListener("click", generateAiMessage);
  elements.resetButton.addEventListener("click", resetForm);
  elements.copyButton.addEventListener("click", copyResult);
  elements.copyBottomButton.addEventListener("click", copyResult);
  elements.authForm.addEventListener("submit", handleAuthSubmit);
  elements.logoutButton.addEventListener("click", handleLogout);
}

function generateMessage() {
  const question = cleanValue(elements.customerQuestion.value);
  const form = {
    customerQuestion: question,
    brand: cleanValue(elements.brand.value) || "heyum",
    customerName: cleanValue(elements.customerName.value),
    productName: cleanValue(elements.productName.value),
    purchaseSource: cleanValue(elements.purchaseSource.value),
    orderId: cleanValue(elements.orderId.value),
    scheduleInfo: cleanValue(elements.scheduleInfo.value),
    contextInfo: cleanValue(elements.contextInfo.value),
    managerName: cleanValue(elements.managerName.value)
  };
  const analysis = analyzeQuestion(question, form);
  const scenario = analysis.scenario;
  const enrichedForm = {
    ...form,
    productName: form.productName || analysis.productName,
    contextInfo: form.contextInfo || analysis.contextInfo
  };
  const paragraphs = analysis.needsAiAssist
    ? buildAiAssistDraft(analysis, enrichedForm)
    : scenario.build(enrichedForm);
  const message = formatByBrand(paragraphs, scenario.subject, form.brand);

  elements.resultText.value = normalizeEditableText(message);
  elements.resultBadge.textContent = `${brandLabel(form.brand)} · ${scenario.category} · ${scenario.title}`;
  elements.engineBadge.textContent = analysis.needsAiAssist ? "AI 보완 초안" : "규칙 엔진";
  elements.decisionMode.textContent = "규칙 기반";
  elements.decisionAssist.textContent = analysis.needsAiAssist ? "필요" : "없음";
  elements.decisionReview.textContent = analysis.needsAiAssist ? "내용 확인 후 사용 권장" : "바로 사용 가능";
  elements.analysisSummary.textContent = `대분류: ${analysis.intentLabel} / 세부 분류: ${scenario.title} / 인식 상품: ${analysis.productName || "미인식"} / 근거 키워드: ${analysis.matchedKeywords.length ? analysis.matchedKeywords.join(", ") : "자동 추론"}`;
  elements.engineSummary.textContent = analysis.needsAiAssist
    ? `규칙 매칭 신뢰도가 낮아 AI 보완이 필요한 질문으로 판단했습니다. 현재는 혜윰 톤의 안전한 초안을 생성하고 있으며, 실제 AI API를 연결하면 이 구간을 더 자연스럽게 보완할 수 있습니다.`
    : "규칙 매칭 신뢰도가 충분해 워드 가이드 기반 표준 응답을 바로 적용했습니다.";
  elements.scenarioUseCase.textContent = scenario.useCase;
  elements.scenarioSource.textContent = `가이드 원문 질문: ${scenario.sourceQuestion}`;
  elements.contextInfo.placeholder = scenario.contextPlaceholder;
}

function formatByBrand(paragraphs, subject, brand) {
  const body = paragraphs.filter(Boolean).join("\n\n").trim();

  if (brand === "songgangdang") {
    return body.replace("건강한 습관을 전하는 혜윰입니다.", "백년 전통의 송강당입니다.");
  }

  return body;
}

function resetForm() {
  elements.brand.value = "heyum";
  elements.customerQuestion.value = "";
  elements.customerName.value = "";
  elements.productName.value = "";
  elements.purchaseSource.value = "";
  elements.orderId.value = "";
  elements.scheduleInfo.value = "";
  elements.contextInfo.value = "";
  elements.managerName.value = "";
  generateMessage();
}

async function copyResult() {
  try {
    await navigator.clipboard.writeText(elements.resultText.value);
    elements.copyButton.textContent = "복사 완료";
    window.setTimeout(() => {
      elements.copyButton.textContent = "복사";
    }, 1500);
  } catch (error) {
    elements.copyButton.textContent = "복사 실패";
    window.setTimeout(() => {
      elements.copyButton.textContent = "복사";
    }, 1500);
  }
}

async function generateAiMessage() {
  const payload = collectForm();

  elements.aiButton.disabled = true;
  elements.aiButton.textContent = "AI 생성 중...";

  try {
    const response = await fetch("/api/reply", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.status === 401) {
      setAppLocked(true, "비밀번호를 다시 입력해주세요.");
      throw new Error("인증이 만료되어 다시 로그인해야 합니다.");
    }

    if (!response.ok || !data.ok) {
      throw new Error(data.error || data.message || "AI 응답 생성에 실패했습니다.");
    }

    elements.resultText.value = normalizeEditableText(data.replyText || "");
    elements.engineBadge.textContent = "실시간 AI";
    elements.decisionMode.textContent = "실시간 AI";
    elements.decisionAssist.textContent = "적용됨";
    elements.decisionReview.textContent = data.analysis?.needs_human_review ? "사람 확인 권장" : "바로 사용 가능";
    elements.resultBadge.textContent = `${brandLabel(payload.brand)} · ${data.analysis?.intent || "AI 분류"}`;
    elements.analysisSummary.textContent = `AI intent: ${data.analysis?.intent || "미분류"} / 상품: ${data.analysis?.product_name || "미인식"} / 신뢰도: ${data.analysis?.confidence || "미기재"} / 사람 확인 필요: ${data.analysis?.needs_human_review ? "예" : "아니오"}`;
    elements.engineSummary.textContent = data.message || "AI가 실시간으로 답변 초안을 생성했습니다.";
    elements.scenarioUseCase.textContent = data.analysis?.summary || "OpenAI Responses API를 통해 실시간으로 질문 문맥을 분석했습니다.";
    elements.scenarioSource.textContent = "가이드 원문 질문: 실시간 AI 생성 모드";
  } catch (error) {
    elements.engineBadge.textContent = "AI 호출 실패";
    elements.decisionMode.textContent = "실시간 AI";
    elements.decisionAssist.textContent = "실패";
    elements.decisionReview.textContent = "설정 확인 필요";
    elements.engineSummary.textContent = error instanceof Error ? error.message : "AI 응답 생성 중 오류가 발생했습니다.";
  } finally {
    elements.aiButton.disabled = false;
    elements.aiButton.textContent = "실시간 AI 초안 생성";
  }
}

function greeting(name, brand) {
  const resolvedBrand = brand || cleanValue(elements.brand?.value || "") || "heyum";
  const intro = resolvedBrand === "songgangdang"
    ? "백년 전통의 송강당입니다."
    : "건강한 습관을 전하는 혜윰입니다.";

  return `안녕하세요, ${name || "고객"}님.\n${intro}`;
}

function standardClosing(managerName) {
  if (managerName) {
    return `추가로 궁금하신 점 있으시면 편하게 문의 부탁드립니다.\n감사합니다.\n${managerName}`;
  }

  return "추가로 궁금하신 점 있으시면 편하게 문의 부탁드립니다.\n감사합니다.";
}

async function refreshAuthState() {
  try {
    const response = await fetch("/api/auth", {
      method: "GET",
      credentials: "same-origin"
    });

    const data = await response.json();
    setAppLocked(!data.authenticated);
  } catch {
    setAppLocked(true, "접속 상태를 확인하지 못했습니다. 잠시 후 다시 시도해주세요.");
  }
}

async function handleAuthSubmit(event) {
  event.preventDefault();

  const password = cleanValue(elements.authPassword.value);
  if (!password) {
    setAuthMessage("비밀번호를 입력해주세요.");
    elements.authPassword.focus();
    return;
  }

  elements.authSubmit.disabled = true;
  elements.authSubmit.textContent = "확인 중...";
  setAuthMessage("");

  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });

    const data = await response.json();

    if (!response.ok || !data.authenticated) {
      throw new Error(data.error || "비밀번호가 올바르지 않습니다.");
    }

    elements.authPassword.value = "";
    setAppLocked(false);
  } catch (error) {
    setAuthMessage(error instanceof Error ? error.message : "로그인에 실패했습니다.");
    elements.authPassword.select();
  } finally {
    elements.authSubmit.disabled = false;
    elements.authSubmit.textContent = "입장하기";
  }
}

async function handleLogout() {
  try {
    await fetch("/api/auth", {
      method: "DELETE",
      credentials: "same-origin"
    });
  } catch {
    // Even if logout request fails, lock the UI locally.
  }

  setAppLocked(true, "잠금 상태로 돌아갔습니다.");
}

function setAppLocked(locked, message = "") {
  document.body.classList.toggle("app-locked", locked);
  elements.authGate.hidden = !locked;
  elements.aiButton.disabled = locked;
  elements.generateButton.disabled = locked;
  elements.resetButton.disabled = locked;
  elements.copyButton.disabled = locked;
  elements.copyBottomButton.disabled = locked;
  elements.resultText.readOnly = locked;
  elements.logoutButton.hidden = locked;
  setAuthMessage(message);

  if (locked) {
    elements.authPassword.focus();
  }
}

function setAuthMessage(message) {
  elements.authMessage.textContent = message;
}

function productLine(productName) {
  return productName ? productName : "문의주신 상품";
}

function brandLabel(brand) {
  return brand === "songgangdang" ? "송강당" : "혜윰";
}

function cleanValue(value) {
  return value.trim();
}

function collectForm() {
  return {
    brand: cleanValue(elements.brand.value),
    customerQuestion: cleanValue(elements.customerQuestion.value),
    customerName: cleanValue(elements.customerName.value),
    productName: cleanValue(elements.productName.value),
    purchaseSource: cleanValue(elements.purchaseSource.value),
    orderId: cleanValue(elements.orderId.value),
    scheduleInfo: cleanValue(elements.scheduleInfo.value),
    contextInfo: cleanValue(elements.contextInfo.value),
    managerName: cleanValue(elements.managerName.value)
  };
}

function normalizeEditableText(text) {
  return String(text || "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\n/g, "\r\n")
    .trim();
}

const intentRoutes = [
  {
    id: "delivery",
    label: "배송 문의",
    keywords: ["배송", "출고", "발송", "도착", "송장", "택배", "조회", "받아", "언제 와", "언제와", "파손", "훼손", "해외배송", "착불", "파업"],
    fallbackScenarioId: "same_day_shipping",
    scenarios: [
      { id: "damaged_package", keywords: ["파손", "훼손", "깨져", "찌그러", "망가", "이렇게 왔"] },
      { id: "tracking_delay", keywords: ["송장", "조회", "움직", "분실", "같은 곳", "멈춰", "안 와", "안와"] },
      { id: "cod_issue", keywords: ["착불", "무료배송", "택배비", "배송비"] },
      { id: "overseas_shipping", keywords: ["해외배송", "ems", "ups", "미국", "일본", "해외"] },
      { id: "strike_area", keywords: ["파업", "타 택배", "우체국", "롯데택배"] },
      { id: "multi_address", keywords: ["여러 곳", "여러곳", "나눠", "나눔배송", "각각 배송", "3군데", "여러 군데"] },
      { id: "holiday_delivery", keywords: ["설 전", "추석 전", "명절 전", "전 도착"] },
      { id: "same_day_shipping", keywords: ["오늘 출발", "오늘 발송", "당일 출고", "언제 출고", "오늘 와", "언제 와", "언제와", "배송 언제"] }
    ]
  },
  {
    id: "cancel_return",
    label: "취소/환불/반품 문의",
    keywords: ["취소", "환불", "반품", "교환", "결제 취소", "회수", "검수", "카드 취소", "무통장", "환불받", "반송"],
    fallbackScenarioId: "cancel_status_request",
    scenarios: [
      { id: "exchange_request", keywords: ["교환", "바꿔", "교체", "다른 걸로", "오배송", "불량"] },
      { id: "opened_food_return_exception", keywords: ["설사", "먹고", "미개봉", "안 뜯", "안뜯", "1상자", "일부만", "부분 환불"] },
      { id: "refund_return_status", keywords: ["환불 언제", "반품 요청", "반품했", "회수", "검수", "결제 취소 언제", "환불 진행"] },
      { id: "cancel_by_payment_type", keywords: ["결제 취소", "취소해", "취소해주세요", "카드 취소", "주문 취소", "취소할게", "취소 원해"] },
      { id: "cancel_status_request", keywords: ["취소 요청", "취소요청", "취소 언제", "언제 되나", "언제되나"] }
    ]
  },
  {
    id: "purchase",
    label: "구매/상품 문의",
    keywords: ["추천", "제품", "상품", "구매", "선물", "뭐가 좋", "어떤 제품", "어느 제품", "같은 건가", "동일", "공진단", "금박", "병", "질환", "컬리", "11번가"],
    fallbackScenarioId: "student_recommendation",
    scenarios: [
      { id: "condition_recommendation", keywords: ["고혈압", "당뇨", "코로나", "질환", "병명", "먹어도 되", "복용 가능", "아픈데"] },
      { id: "parents_gift", keywords: ["부모님", "어르신", "선물", "감사 선물", "장인", "장모"] },
      { id: "same_as_kurly", keywords: ["컬리", "동일", "같은 상품", "침향환 맞", "같은 건가"] },
      { id: "unauthorized_market", keywords: ["11번가", "오픈마켓", "공식 판매처", "가격 차이", "비공식"] },
      { id: "gongjindan_difference", keywords: ["공진단", "한의원"] },
      { id: "gold_leaf", keywords: ["금박", "중금속", "식용금"] },
      { id: "student_recommendation", keywords: ["수험생", "추천", "뭐가 좋", "어느 제품", "어떤 제품", "구매하려"] }
    ]
  },
  {
    id: "intake",
    label: "섭취/보관 문의",
    keywords: ["먹", "섭취", "복용", "하루", "몇 개", "몇개", "공복", "언제 먹", "보관", "냉장", "실온", "청소년", "수험생"],
    fallbackScenarioId: "how_to_take",
    scenarios: [
      { id: "storage", keywords: ["보관", "냉장", "실온", "개봉 후"] },
      { id: "youth_dosage", keywords: ["청소년", "수험생", "학생", "중학생", "고등학생"] },
      { id: "how_to_take", keywords: ["하루", "몇 개", "몇개", "복용", "먹으면", "섭취", "언제 먹", "공복", "하루에"] }
    ]
  },
  {
    id: "event",
    label: "이벤트 문의",
    keywords: ["설문", "이벤트", "qr", "고객만족도", "사은품", "선물 발송"],
    fallbackScenarioId: "survey_gift",
    scenarios: [
      { id: "survey_gift", keywords: ["설문", "qr", "고객만족도", "선물 발송", "테스터"] }
    ]
  },
  {
    id: "other",
    label: "기타 문의",
    keywords: ["쇼핑백", "구겨", "표기", "스티커", "통화", "잘 안 들", "문자", "다시 안내"],
    fallbackScenarioId: "label_request",
    scenarios: [
      { id: "kurly_bag", keywords: ["쇼핑백", "구겨", "선물용", "컬리에서 구매"] },
      { id: "label_request", keywords: ["구분", "표기", "스티커", "하나씩 샀"] },
      { id: "call_followup", keywords: ["통화", "잘 안 들", "문자", "다시 안내", "유선"] }
    ]
  }
];

function analyzeQuestion(question, form) {
  if (!question) {
    return {
      intentLabel: "미분류",
      scenario: scenarios.find((scenario) => scenario.id === "how_to_take") || scenarios[0],
      productName: form.productName,
      contextInfo: form.contextInfo,
      matchedKeywords: [],
      hasMixedIntent: false,
      needsAiAssist: false,
      hint: "질문을 입력하면 먼저 배송/취소/구매/섭취 같은 대분류를 판별한 뒤, 세부 상황으로 다시 분류합니다."
    };
  }

  const normalizedQuestion = normalizeQuestion(question);
  const detectedProduct = detectProduct(normalizedQuestion, form.productName);
  const intent = detectIntent(normalizedQuestion);
  const detail = detectScenarioWithinIntent(normalizedQuestion, intent);
  const hasMixedIntent = intent.secondaryMatches.length > 0;
  const needsAiAssist = shouldUseAiAssist(normalizedQuestion, intent, detail, detectedProduct, hasMixedIntent);

  return {
    intentLabel: hasMixedIntent ? `${intent.label} 중심 복합 문의` : intent.label,
    scenario: detail.scenario,
    productName: detectedProduct,
    contextInfo: inferContext(normalizedQuestion, detail.scenario, form.contextInfo),
    matchedKeywords: [...intent.matchedKeywords, ...detail.matchedKeywords],
    hasMixedIntent,
    needsAiAssist,
    hint: hasMixedIntent
      ? `질문에서 여러 카테고리 키워드가 함께 감지되어 '${intent.label}' 중심의 복합 문의로 판단했습니다. 이런 경우에는 규칙 답변보다 AI 보완 초안 확인을 권장합니다.`
      : `대분류는 '${intent.label}', 세부 상황은 '${detail.scenario.title}'로 분류했습니다. 필요하면 추가 메모/치환값에 결제수단, 날짜, 반품 상태 같은 조건을 더 넣어 정확도를 높여주세요.`
  };
}

function detectProduct(question, selectedProduct) {
  if (selectedProduct) {
    return selectedProduct;
  }

  for (const product of products) {
    if (question.includes(normalizeQuestion(product))) {
      return product;
    }
  }

  for (const [alias, product] of Object.entries(productAliases)) {
    if (question.includes(normalizeQuestion(alias))) {
      return product;
    }
  }

  return "";
}

function detectIntent(normalizedQuestion) {
  const scoredRoutes = intentRoutes.map((route) => {
    const matchedKeywords = route.keywords.filter((keyword) => normalizedQuestion.includes(keyword));
    return {
      ...route,
      matchedKeywords,
      score: matchedKeywords.length
    };
  }).sort((a, b) => b.score - a.score);

  let bestRoute = scoredRoutes[0];

  if (!bestRoute || bestRoute.score <= 0) {
    bestRoute = {
      ...(intentRoutes.find((route) => route.id === "purchase") || intentRoutes[0]),
      matchedKeywords: [],
      score: 0
    };
  }

  const secondaryMatches = scoredRoutes.filter((route) =>
    route.id !== bestRoute.id &&
    route.score > 0
  );

  return {
    ...bestRoute,
    secondaryMatches
  };
}

function detectScenarioWithinIntent(normalizedQuestion, intent) {
  let bestRule = null;
  let bestScore = -1;
  let bestKeywords = [];

  intent.scenarios.forEach((rule) => {
    const matchedKeywords = rule.keywords.filter((keyword) => normalizedQuestion.includes(keyword));
    const score = matchedKeywords.length;

    if (score > bestScore) {
      bestRule = rule;
      bestScore = score;
      bestKeywords = matchedKeywords;
    }
  });

  const fallbackScenario = getScenarioById(intent.fallbackScenarioId);

  if (!bestRule || bestScore <= 0) {
    return {
      scenario: fallbackScenario,
      matchedKeywords: [],
      score: 0
    };
  }

  return {
    scenario: getScenarioById(bestRule.id) || fallbackScenario,
    matchedKeywords: bestKeywords,
    score: bestScore
  };
}

function inferContext(question, scenario, existingContext) {
  if (existingContext) {
    return existingContext;
  }

  if (scenario.id === "cancel_by_payment_type") {
    if (question.includes("무통장")) {
      return "출고 전 무통장입금";
    }
    if (question.includes("출고") || question.includes("이미 보냈") || question.includes("발송됐")) {
      return "출고 후";
    }
    return "출고 전 카드결제";
  }

  if (scenario.id === "refund_return_status") {
    if (question.includes("카드")) {
      return "카드결제";
    }
    if (question.includes("무통장")) {
      return "무통장입금";
    }
    if (question.includes("아직") || question.includes("이동") || question.includes("회수 중")) {
      return "반품 이동 중";
    }
  }

  if (scenario.id === "condition_recommendation") {
    const knownConditions = ["고혈압", "당뇨", "코로나", "수술", "위염", "장염"];
    const found = knownConditions.find((condition) => question.includes(condition));
    if (found) {
      return found;
    }
  }

  if (scenario.id === "overseas_shipping") {
    const countries = ["미국", "일본", "캐나다", "호주", "중국", "싱가포르"];
    const found = countries.find((country) => question.includes(country));
    if (found) {
      return `${found} 배송 가능 여부`;
    }
  }

  return "";
}

function getScenarioById(id) {
  return scenarios.find((scenario) => scenario.id === id) || scenarios[0];
}

function normalizeQuestion(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function shouldUseAiAssist(normalizedQuestion, intent, detail, detectedProduct, hasMixedIntent) {
  const hasConnectorIntent = ["그리고", "근데", "또", "추가로"].some((word) => normalizedQuestion.includes(word));
  const weakIntent = intent.score <= 0;
  const weakDetail = detail.score <= 0;
  const longQuestion = normalizedQuestion.length >= 40;
  const missingProductOnProductishIntent = !detectedProduct && ["purchase", "intake"].includes(intent.id);

  return weakIntent || weakDetail || hasMixedIntent || hasConnectorIntent || (longQuestion && weakDetail) || missingProductOnProductishIntent;
}

function buildAiAssistDraft(analysis, form) {
  const topic = analysis.intentLabel === "미분류" ? "문의주신 내용" : analysis.intentLabel;
  const productText = form.productName ? `${form.productName} 관련 ` : "";
  const sourceText = form.purchaseSource ? `${form.purchaseSource} 주문 건 기준으로 ` : "";
  const orderText = form.orderId ? `주문번호 ${form.orderId} 기준으로 확인이 필요하며, ` : "";
  const scheduleText = form.scheduleInfo ? `현재 메모된 일정은 ${form.scheduleInfo}입니다. ` : "";
  const contextText = form.contextInfo ? `${form.contextInfo} 내용을 함께 반영해 확인드리겠습니다. ` : "";

  return [
    greeting(form.customerName),
    `${productText}${topic}로 문의주신 내용 확인했습니다.`,
    `남겨주신 질문을 기준으로 보면 ${sourceText}${analysis.scenario.title}에 가까운 문의로 파악됩니다.`,
    `${orderText}${scheduleText}${contextText}정확한 정책과 현재 주문 상태를 함께 확인한 뒤 가장 알맞은 방향으로 안내드리겠습니다.`,
    "현재 초안은 규칙 기반 분류로 바로 확정하기 어려운 표현이 포함되어 있어, 실제 자동응대 시스템에서는 AI가 질문 문맥을 더 자연스럽게 정리하도록 연결하는 구간입니다.",
    standardClosing(form.managerName)
  ];
}
