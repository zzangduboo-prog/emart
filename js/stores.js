/**
 * Emart Sinchon K-Palette Zone - Static Store & Category Data Module
 * No-DB Client Data Schema (PRD Section 5)
 * All coordinates are percentage-based (0-100) for responsive SVG mapping
 */

const CATEGORY_META = [
  {
    id: "cat-k-palette",
    chipId: "cat-chip-palette",
    color: "#FF4081",
    colorRgb: "255, 64, 129",
    icon: "fa-wand-magic-sparkles",
    name: { ko: "K-Palette Zone", en: "K-Palette Zone", zh: "K-Palette Zone", ja: "K-Palette Zone" }
  },
  {
    id: "cat-k-food",
    chipId: "cat-chip-food",
    color: "#F59E0B",
    colorRgb: "245, 158, 11",
    icon: "fa-bowl-food",
    name: { ko: "K-Food / 식품", en: "K-Food & Groceries", zh: "K-Food / 韩国食品", ja: "K-Food / 食品" }
  },
  {
    id: "cat-k-beauty",
    chipId: "cat-chip-beauty",
    color: "#06B6D4",
    colorRgb: "6, 182, 212",
    icon: "fa-spray-can-sparkles",
    name: { ko: "K-Beauty / 퍼스널케어", en: "K-Beauty & Personal", zh: "K-Beauty / 美妆个护", ja: "K-Beauty / コスメ" }
  },
  {
    id: "cat-no-brand",
    chipId: "cat-chip-nobrand",
    color: "#FFC400",
    colorRgb: "255, 196, 0",
    icon: "fa-cart-shopping",
    name: { ko: "No Brand / 생활", en: "No Brand & Living", zh: "No Brand / 生活", ja: "No Brand / 生活" }
  },
  {
    id: "cat-service",
    chipId: "cat-chip-service",
    color: "#3B82F6",
    colorRgb: "59, 130, 246",
    icon: "fa-passport",
    name: { ko: "편의시설 / Tax-Free", en: "Amenities & Tax-Free", zh: "便民设施 / 退税", ja: "便利施設 / 免税" }
  }
];

const STORE_DATA = [
  // ===== CAT-01: K-Palette Zone =====
  {
    id: "store-k-palette",
    category: "cat-k-palette",
    floor: "B3",
    aisleNumber: "Main",
    mapZone: { x: 28, y: 12, w: 18, h: 10 },
    pinPos: { x: 37, y: 17 },
    badge: "HOT 🔥",
    taxFree: true,
    image: "data/c8faca65-e2e1-45da-a31b-967a928270cf.jpg",
    name: {
      ko: "K-Palette Zone (K-트렌드 큐레이션존)",
      en: "K-Palette Zone (K-Trend Curation)",
      zh: "K-Palette Zone (韩国流行精选区)",
      ja: "K-Palette Zone (K-トレンドキュレーション)"
    },
    summary: {
      ko: "한국인 실제 구매 POS 데이터 및 SNS 바이럴 기반 Top 20 랭킹존",
      en: "Top 20 bestselling K-products curated by local POS & SNS trends",
      zh: "基于韩国人实际购买数据与SNS热门推荐的Top 20榜单专区",
      ja: "韓国人の実購買データとSNSトレンドに基づくTop20ランキングゾーン"
    },
    popularItems: [
      { name: { ko: "불닭+치즈 꿀조합 패키지", en: "Buldak+Cheese Combo", zh: "火鸡面+芝士组合", ja: "ブルダック+チーズコンビ" }, price: "₩5,400", tag: "SNS" },
      { name: { ko: "만능 한식소스", en: "Korean All-Purpose Sauce", zh: "韩食万能调味酱", ja: "万能韓国ソース" }, price: "₩4,200", tag: "Best" },
      { name: { ko: "K-디저트 망고&패션프루트", en: "K-Dessert Mango&Passionfruit", zh: "K-甜品芒果百香果", ja: "K-デザートマンゴー" }, price: "₩3,800", tag: "New" }
    ]
  },

  // ===== CAT-02: K-Food & Groceries =====
  {
    id: "store-ramen",
    category: "cat-k-food",
    floor: "B3",
    aisleNumber: "1-2",
    mapZone: { x: 5, y: 28, w: 20, h: 14 },
    pinPos: { x: 15, y: 35 },
    badge: null,
    taxFree: false,
    name: {
      ko: "라면 & 칠리면 매대",
      en: "Ramen & Chili Noodles",
      zh: "拉面 & 辣面专柜",
      ja: "ラーメン＆チリ麺コーナー"
    },
    summary: {
      ko: "신라면, 불닭볶음면 등 한국 대표 라면 전 품목 (1~2번 매대)",
      en: "Full lineup of Korean ramen including Shin Ramyun & Buldak (Aisles 1-2)",
      zh: "辛拉面、火鸡面等韩国代表性拉面全品类 (1~2号柜)",
      ja: "辛ラーメン、ブルダック等韓国ラーメン全品目 (1〜2番売り場)"
    },
    popularItems: [
      { name: { ko: "신라면 멀티팩", en: "Shin Ramyun Multi", zh: "辛拉面多连包", ja: "辛ラーメンマルチ" }, price: "₩4,480", tag: "Best" },
      { name: { ko: "불닭볶음면", en: "Buldak Hot Chicken", zh: "火鸡面", ja: "ブルダック炒め麺" }, price: "₩1,500", tag: "SNS" }
    ]
  },
  {
    id: "store-hatban",
    category: "cat-k-food",
    floor: "B3",
    aisleNumber: "3-6",
    mapZone: { x: 5, y: 44, w: 28, h: 12 },
    pinPos: { x: 19, y: 50 },
    badge: null,
    taxFree: false,
    name: {
      ko: "햇반 & 면류 매대",
      en: "Instant Rice & Noodles",
      zh: "即食米饭 & 面类专柜",
      ja: "ご飯パック＆麺類コーナー"
    },
    summary: {
      ko: "비비고 햇반, 즉석면류 등 간편식 (3~6번 매대)",
      en: "Bibigo instant rice, cup noodles and more (Aisles 3-6)",
      zh: "CJ即食米饭、杯面等便捷食品 (3~6号柜)",
      ja: "ビビゴご飯パック、カップ麺など (3〜6番売り場)"
    },
    popularItems: [
      { name: { ko: "비비고 햇반", en: "Bibigo Instant Rice", zh: "CJ即食米饭", ja: "ビビゴご飯" }, price: "₩1,280", tag: "Best" }
    ]
  },
  {
    id: "store-snacks",
    category: "cat-k-food",
    floor: "B3",
    aisleNumber: "7-8",
    mapZone: { x: 5, y: 58, w: 24, h: 12 },
    pinPos: { x: 17, y: 64 },
    badge: null,
    taxFree: false,
    name: {
      ko: "과자 & 스낵 매대",
      en: "Snacks & Chips",
      zh: "零食 & 薯片专柜",
      ja: "お菓子＆スナックコーナー"
    },
    summary: {
      ko: "허니버터칩, 새우깡 등 한국 인기 과자 (7~8번 매대)",
      en: "Honey Butter Chips, Shrimp Crackers & more (Aisles 7-8)",
      zh: "蜂蜜黄油薯片、虾条等韩国人气零食 (7~8号柜)",
      ja: "ハニーバターチップ、えびせん等 (7〜8番売り場)"
    },
    popularItems: [
      { name: { ko: "허니버터칩", en: "Honey Butter Chips", zh: "蜂蜜黄油薯片", ja: "ハニーバターチップ" }, price: "₩1,800", tag: "SNS" }
    ]
  },
  {
    id: "store-choco-jelly",
    category: "cat-k-food",
    floor: "B3",
    aisleNumber: "9-10",
    mapZone: { x: 15, y: 72, w: 24, h: 10 },
    pinPos: { x: 27, y: 77 },
    badge: null,
    taxFree: false,
    name: {
      ko: "초콜릿 & 젤리 매대",
      en: "Chocolate & Gummy",
      zh: "巧克力 & 果冻专柜",
      ja: "チョコレート＆グミコーナー"
    },
    summary: {
      ko: "K-디저트, 초콜릿, 젤리 등 달콤한 간식 (9~10번 매대)",
      en: "K-desserts, chocolate, gummy & sweet treats (Aisles 9-10)",
      zh: "K-甜品、巧克力、果冻等甜蜜零食 (9~10号柜)",
      ja: "K-デザート、チョコ、グミ等 (9〜10番売り場)"
    },
    popularItems: [
      { name: { ko: "빼빼로 아몬드", en: "Pepero Almond", zh: "巧克力棒杏仁味", ja: "ペペロアーモンド" }, price: "₩1,500", tag: "Best" }
    ]
  },
  {
    id: "store-health",
    category: "cat-k-food",
    floor: "B3",
    aisleNumber: "별도",
    mapZone: { x: 28, y: 22, w: 14, h: 8 },
    pinPos: { x: 35, y: 26 },
    badge: null,
    taxFree: true,
    name: {
      ko: "건강식품 코너",
      en: "Health Supplements",
      zh: "保健食品专区",
      ja: "健康食品コーナー"
    },
    summary: {
      ko: "홍삼, 비타민, 프로바이오틱스 등 건강기능식품",
      en: "Red Ginseng, Vitamins, Probiotics & supplements",
      zh: "红参、维生素、益生菌等保健食品",
      ja: "高麗人参、ビタミン、プロバイオティクス等"
    },
    popularItems: [
      { name: { ko: "정관장 홍삼정", en: "CheongKwanJang Red Ginseng", zh: "正官庄红参", ja: "正官庄紅参" }, price: "₩35,000", tag: "Gift" }
    ]
  },

  // ===== CAT-03: K-Beauty & Personal =====
  {
    id: "store-skincare",
    category: "cat-k-beauty",
    floor: "B3",
    aisleNumber: "별도",
    mapZone: { x: 28, y: 30, w: 28, h: 10 },
    pinPos: { x: 42, y: 35 },
    badge: null,
    taxFree: true,
    name: {
      ko: "스킨케어 / 바디 / 헤어케어",
      en: "Skincare / Body / Haircare",
      zh: "护肤 / 身体 / 护发",
      ja: "スキンケア / ボディ / ヘアケア"
    },
    summary: {
      ko: "마스크팩, 진정 패드, 보습 로션, K-트렌드 샴푸 등",
      en: "Sheet masks, soothing pads, moisturizers, K-trend shampoo",
      zh: "面膜、镇定棉片、保湿乳、K-trend洗发水",
      ja: "マスクパック、鎮静パッド、保湿ローション、K-シャンプー"
    },
    popularItems: [
      { name: { ko: "메디힐 마스크팩", en: "Mediheal Sheet Mask", zh: "美迪惠尔面膜", ja: "メディヒールマスク" }, price: "₩1,200", tag: "Best" },
      { name: { ko: "라네즈 슬리핑마스크", en: "Laneige Sleeping Mask", zh: "兰芝睡眠面膜", ja: "ラネージュスリーピング" }, price: "₩28,000", tag: "SNS" }
    ]
  },
  {
    id: "store-oral",
    category: "cat-k-beauty",
    floor: "B3",
    aisleNumber: "별도",
    mapZone: { x: 15, y: 82, w: 18, h: 8 },
    pinPos: { x: 24, y: 86 },
    badge: null,
    taxFree: false,
    name: {
      ko: "구강용품 & 위생용품",
      en: "Oral Care & Hygiene",
      zh: "口腔用品 & 卫生用品",
      ja: "オーラルケア＆衛生用品"
    },
    summary: {
      ko: "치약, 구강청결제, 칫솔 등 구강 위생 제품",
      en: "Toothpaste, mouthwash, toothbrush & hygiene products",
      zh: "牙膏、漱口水、牙刷等口腔卫生产品",
      ja: "歯磨き粉、洗口液、歯ブラシ等"
    },
    popularItems: [
      { name: { ko: "죽염 치약", en: "Bamboo Salt Toothpaste", zh: "竹盐牙膏", ja: "竹塩歯磨き" }, price: "₩5,900", tag: "Best" }
    ]
  },

  // ===== CAT-04: No Brand & Living =====
  {
    id: "store-nobrand-food",
    category: "cat-no-brand",
    floor: "B3",
    aisleNumber: "별도",
    mapZone: { x: 25, y: 88, w: 52, h: 8 },
    pinPos: { x: 51, y: 92 },
    badge: null,
    taxFree: false,
    name: {
      ko: "No Brand 대용식 & 조미료",
      en: "No Brand Meal Kits & Seasoning",
      zh: "No Brand 代餐 & 调味料",
      ja: "No Brand 食品＆調味料"
    },
    summary: {
      ko: "노브랜드 버터쿠키, 감자칩, 밀키트, 조미료 등 가성비 식품",
      en: "No Brand butter cookies, chips, meal kits & seasonings",
      zh: "No Brand黄油曲奇、薯片、料理包、调味料等高性价比食品",
      ja: "No Brand バタークッキー、ポテトチップス、ミールキット等"
    },
    popularItems: [
      { name: { ko: "노브랜드 감자칩", en: "No Brand Potato Chips", zh: "No Brand 薯片", ja: "No Brand ポテトチップ" }, price: "₩1,280", tag: "Best" }
    ]
  },
  {
    id: "store-nobrand-living",
    category: "cat-no-brand",
    floor: "B3",
    aisleNumber: "11-16",
    mapZone: { x: 62, y: 36, w: 22, h: 46 },
    pinPos: { x: 73, y: 55 },
    badge: null,
    taxFree: false,
    name: {
      ko: "No Brand 라이프스타일",
      en: "No Brand Lifestyle",
      zh: "No Brand 生活用品",
      ja: "No Brand ライフスタイル"
    },
    summary: {
      ko: "상온과자, 지퍼백, 주방용품, 화장지, 티슈, 애견/문구 등 (11~16번 매대)",
      en: "Snacks, zipper bags, kitchenware, tissues, pet/stationery (Aisles 11-16)",
      zh: "常温零食、密封袋、厨具、纸巾、宠物/文具 (11~16号柜)",
      ja: "お菓子、ジッパーバッグ、キッチン、ティッシュ等 (11〜16番)"
    },
    popularItems: [
      { name: { ko: "다회용 지퍼백", en: "Reusable Zipper Bag", zh: "可重复使用密封袋", ja: "リユーザブルジッパーバッグ" }, price: "₩2,980", tag: "Eco" },
      { name: { ko: "노브랜드 키친타올", en: "No Brand Kitchen Towel", zh: "No Brand 厨房纸巾", ja: "No Brand キッチンタオル" }, price: "₩1,480", tag: "Best" }
    ]
  },
  {
    id: "store-kitchen",
    category: "cat-no-brand",
    floor: "B3",
    aisleNumber: "별도",
    mapZone: { x: 78, y: 72, w: 16, h: 14 },
    pinPos: { x: 86, y: 79 },
    badge: null,
    taxFree: false,
    name: {
      ko: "주방용품 & 건조대",
      en: "Kitchenware & Drying Rack",
      zh: "厨具 & 干燥架",
      ja: "キッチン用品＆乾燥台"
    },
    summary: {
      ko: "냄비, 프라이팬, 건조대, 슬기계제 등 주방 생활용품",
      en: "Pots, pans, drying racks & kitchen essentials",
      zh: "锅具、平底锅、干燥架等厨房生活用品",
      ja: "鍋、フライパン、乾燥台等キッチン用品"
    },
    popularItems: [
      { name: { ko: "실리콘 조리도구 세트", en: "Silicone Utensil Set", zh: "硅胶厨具套装", ja: "シリコン調理器具セット" }, price: "₩9,800", tag: "Best" }
    ]
  },

  // ===== CAT-05: Services & Amenities =====
  {
    id: "store-tax-free",
    category: "cat-service",
    floor: "B3",
    aisleNumber: "별도",
    mapZone: { x: 5, y: 5, w: 14, h: 10 },
    pinPos: { x: 12, y: 10 },
    badge: "Tax Refund",
    taxFree: true,
    name: {
      ko: "Express Tax-Free 환급 키오스크",
      en: "Express Tax-Free Kiosk",
      zh: "快速退税自助机",
      ja: "即時免税キオスク"
    },
    summary: {
      ko: "여권 스캔 즉시 5분 내 현장 세금 환급",
      en: "Passport scan for instant tax refund within 5 minutes",
      zh: "护照扫描即可5分钟内现场退税",
      ja: "パスポートスキャンで5分以内に即時免税"
    },
    popularItems: []
  },
  {
    id: "store-escalator",
    category: "cat-service",
    floor: "B3",
    aisleNumber: "별도",
    mapZone: { x: 50, y: 8, w: 10, h: 8 },
    pinPos: { x: 55, y: 12 },
    badge: null,
    taxFree: false,
    name: {
      ko: "에스컬레이터",
      en: "Escalator",
      zh: "自动扶梯",
      ja: "エスカレーター"
    },
    summary: {
      ko: "B3층 ↔ 상층 연결 에스컬레이터",
      en: "Escalator connecting B3 to upper floors",
      zh: "连接B3层与上层的自动扶梯",
      ja: "B3階と上階を結ぶエスカレーター"
    },
    popularItems: []
  },
  {
    id: "store-elevator",
    category: "cat-service",
    floor: "B3",
    aisleNumber: "별도",
    mapZone: { x: 88, y: 5, w: 8, h: 8 },
    pinPos: { x: 92, y: 9 },
    badge: null,
    taxFree: false,
    name: {
      ko: "엘리베이터",
      en: "Elevator",
      zh: "电梯",
      ja: "エレベーター"
    },
    summary: {
      ko: "B3층 엘리베이터 (장애인/유모차 이용 가능)",
      en: "B3 Elevator (wheelchair & stroller accessible)",
      zh: "B3层电梯 (无障碍通行)",
      ja: "B3階エレベーター（バリアフリー対応）"
    },
    popularItems: []
  },
  {
    id: "store-hair-salon",
    category: "cat-service",
    floor: "B3",
    aisleNumber: "별도",
    mapZone: { x: 66, y: 5, w: 18, h: 10 },
    pinPos: { x: 75, y: 10 },
    badge: null,
    taxFree: false,
    name: {
      ko: "이가자헤어비스 (미용실)",
      en: "Leegaja Hair Salon",
      zh: "李家子美发沙龙",
      ja: "イガジャヘアサロン"
    },
    summary: {
      ko: "B3 매장 내 위치한 프로페셔널 헤어 살롱",
      en: "Professional hair salon located inside B3",
      zh: "位于B3卖场内的专业美发沙龙",
      ja: "B3フロア内のプロフェッショナルヘアサロン"
    },
    popularItems: []
  }
];

// Export for global access
window.CATEGORY_META = CATEGORY_META;
window.STORE_DATA = STORE_DATA;
