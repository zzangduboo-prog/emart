/**
 * Emart Sinchon K-Palette Zone - Multilingual i18n Dictionary
 * Supports: KO (Korean), EN (English), ZH (Simplified Chinese), JA (Japanese)
 * Zero external dependencies - Pure Vanilla JavaScript
 */

const I18N_DATA = {
  ko: {
    langName: "한국어",
    langCode: "KO",
    flag: "🇰🇷",
    brandTitle: "이마트 신촌점",
    brandSub: "K-Palette Zone",
    badgeFeature: "4.6 다국어 실시간 전환기",
    badgeStatus: "정상 작동 중",
    heroTitle: "외국인 관광객을 위한 다국어 스마트 가이드",
    heroDesc: "상단 언어 버튼을 누르면 카테고리, 검색창, 매대 설명, 쇼핑 동선 안내가 새로고침 없이 즉시 번역됩니다.",
    searchPlaceholder: "찾으시는 매대나 상품을 검색하세요... (예: 불닭, 노브랜드, Tax Free)",
    btnSearch: "검색",
    filterTitle: "매장 카테고리 분류 (Category)",
    categories: {
      all: "전체보기",
      kPalette: "K-Palette Zone (인기 큐레이션)",
      kFood: "K-Food / 식품",
      kBeauty: "K-Beauty / 퍼스널케어",
      noBrand: "No Brand / 가성비 생활",
      service: "편의시설 / Tax-Free"
    },
    currentLangNotice: "현재 선택된 언어",
    demoStoreTitle: "미리보기: 매대 상세 카드",
    sampleStore: {
      name: "K-Palette Zone (K-트렌드 큐레이션존)",
      aisle: "B3층 입구 메인 팝업존",
      hotBadge: "SNS 실시간 핫템 🔥",
      taxFreeBadge: "즉시 면세 (Tax Free) 가능",
      desc: "한국인 실제 구매 POS 데이터 및 SNS 바이럴 기반 Top 20 랭킹존입니다. 불닭 꿀조합부터 한식 만능 소스까지 한자리에서 만나보세요.",
      popularTitle: "현지인 인기 베스트셀러 꿀조합",
      item1Name: "불닭 + 치즈 꿀조합 패키지",
      item1Price: "5,400원",
      item1Tag: "SNS 화제",
      item2Name: "현지인 추천 만능 한식소스",
      item2Price: "4,200원",
      item2Tag: "실패 없는 맛",
      item3Name: "K-디저트 망고&패션프루트",
      item3Price: "3,800원",
      item3Tag: "리프레시 간식",
      nfcTitle: "1초 NFC 다국어 모국어 안내",
      nfcDesc: "매대 태그에 스마트폰을 대면 15초 숏폼 레시피 및 상세 성분이 모국어로 즉시 표시됩니다.",
      btnWishlist: "쇼핑 목록에 담기",
      btnRoute: "최단 동선 보기",
      btnDetail: "상세정보"
    },
    routeGuide: {
      title: "교통 및 연결 동선 안내",
      subTitle: "헤매지 않는 신촌역 직결 쇼핑",
      station: "신촌역 2호선 지하 직결",
      stationDesc: "신촌역 지하 연결통로에서 이마트 신촌점 B3층으로 바로 입장 가능 (도보 1분)",
      yellowLine: "바닥 노란색 유도선 (Yellow Route)",
      yellowLineDesc: "입구 바닥의 노란 화살표 유도선을 따라가면 K-Palette Zone과 Tax-Free 라운지까지 논스톱 안내",
      taxFree: "원스톱 Express Tax-Free",
      taxFreeDesc: "계산대 옆 무인 환급 키오스크에서 여권 스캔 즉시 5분 내 현장 환급 완료"
    },
    toastLangChanged: "언어가 '한국어'로 변경되었습니다.",
    mapSection: {
      sectionTitle: "B3 인터랙티브 매장 지도",
      tabB3: "B3 매장 평면도",
      tabStation: "신촌역 연결 약도",
      zoomIn: "확대",
      zoomOut: "축소",
      zoomReset: "초기화",
      entrance: "🚇 신촌역 입구",
      dragHint: "드래그하여 이동 · 스크롤하여 확대/축소",
      stationTitle: "신촌역 2호선 → 이마트 신촌점 B3 직결 동선"
    }
  },

  en: {
    langName: "English",
    langCode: "EN",
    flag: "🇺🇸",
    brandTitle: "Emart Sinchon",
    brandSub: "K-Palette Zone",
    badgeFeature: "4.6 Multilingual Live Switcher",
    badgeStatus: "Active",
    heroTitle: "Multilingual Smart Guide for Global Visitors",
    heroDesc: "Click any language button above to instantly translate categories, search bars, store descriptions, and route guides without page reloading.",
    searchPlaceholder: "Search for aisles or products... (e.g., Buldak, No Brand, Tax Free)",
    btnSearch: "Search",
    filterTitle: "Store Categories",
    categories: {
      all: "All Categories",
      kPalette: "K-Palette Zone (Top Trends)",
      kFood: "K-Food & Groceries",
      kBeauty: "K-Beauty & Personal Care",
      noBrand: "No Brand & Daily Living",
      service: "Amenities & Tax-Free"
    },
    currentLangNotice: "Currently Selected Language",
    demoStoreTitle: "Live Preview: Store Detail Card",
    sampleStore: {
      name: "K-Palette Zone (K-Trend Curation)",
      aisle: "B3 Main Entrance Pop-up Zone",
      hotBadge: "Live SNS Best Seller 🔥",
      taxFreeBadge: "Instant Tax Refund Available",
      desc: "A dedicated Top 20 ranking zone curated by real Korean POS purchase data and viral social media trends. Discover viral Buldak combo packs and authentic Korean culinary sauces all in one spot.",
      popularTitle: "Locals' Favorite Best Sellers & Combos",
      item1Name: "Buldak + Cheese Combo Pack",
      item1Price: "₩5,400",
      item1Tag: "Viral Hit",
      item2Name: "Local Secret Korean All-Purpose Sauce",
      item2Price: "₩4,200",
      item2Tag: "Chef's Pick",
      item3Name: "K-Dessert Mango & Passionfruit",
      item3Price: "₩3,800",
      item3Tag: "Refreshing Snack",
      nfcTitle: "1-Second NFC Multilingual Audio/Video Guide",
      nfcDesc: "Tap your smartphone on the shelf tag to watch 15-second recipe short-form videos and ingredient details in your native language.",
      btnWishlist: "Add to Wishlist",
      btnRoute: "Shortest Route",
      btnDetail: "View Details"
    },
    routeGuide: {
      title: "Transit & Wayfinding Guide",
      subTitle: "Hassle-free direct access from Sinchon Station",
      station: "Direct Sinchon Station Line 2 Access",
      stationDesc: "Direct underground access from Sinchon Station to Emart B3 (1-minute walk)",
      yellowLine: "Floor Yellow Guide Line (Yellow Route)",
      yellowLineDesc: "Follow the bold yellow arrows on the floor for direct navigation to the K-Palette Zone and Tax-Free Lounge",
      taxFree: "Express One-Stop Tax-Free",
      taxFreeDesc: "Scan your passport at the automated kiosk next to checkout for instant refund within 5 minutes"
    },
    toastLangChanged: "Language switched to 'English'.",
    mapSection: {
      sectionTitle: "B3 Interactive Store Map",
      tabB3: "B3 Floor Plan",
      tabStation: "Sinchon Station Access",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      zoomReset: "Reset",
      entrance: "🚇 Sinchon Stn.",
      dragHint: "Drag to pan · Scroll to zoom",
      stationTitle: "Sinchon Station Line 2 → Emart B3 Direct Access"
    }
  },

  zh: {
    langName: "简体中文",
    langCode: "ZH",
    flag: "🇨🇳",
    brandTitle: "易买得 新村店",
    brandSub: "K-Palette Zone",
    badgeFeature: "4.6 多语言即时切换系统",
    badgeStatus: "正常运行",
    heroTitle: "专为外国游客打造的多语言智能购物向导",
    heroDesc: "点击上方语言按钮，分类、搜索栏、货架介绍与购物动线信息将瞬间完成翻译，无需刷新页面。",
    searchPlaceholder: "搜索货架或人气商品... (如: 火鸡面、No Brand、退税)",
    btnSearch: "搜索",
    filterTitle: "卖场分类导航 (Category)",
    categories: {
      all: "全部查看",
      kPalette: "K-Palette Zone (流行精选)",
      kFood: "K-Food / 韩国食品",
      kBeauty: "K-Beauty / 美妆个护",
      noBrand: "No Brand / 高性价比生活",
      service: "便民设施 / 即时退税"
    },
    currentLangNotice: "当前选择的语言",
    demoStoreTitle: "实时预览: 专柜/货架详情卡片",
    sampleStore: {
      name: "K-Palette Zone (韩国流行趋势精选区)",
      aisle: "B3入场主快闪专区 (新村站直通)",
      hotBadge: "小红书爆款热门 🔥",
      taxFreeBadge: "支持现场即时退税 (Tax Free)",
      desc: "基于韩国人实际购买POS数据与社交平台大数据精选的Top 20热卖榜单。从火鸡面神仙吃法组合到韩食万能调味酱，一站式轻松选购。",
      popularTitle: "韩国本地人最爱人气爆款吃法组合",
      item1Name: "火鸡面 + 芝士神仙组合包",
      item1Price: "₩5,400",
      item1Tag: "爆款推荐",
      item2Name: "韩国本地人推荐万能调味酱",
      item2Price: "₩4,200",
      item2Tag: "绝不踩雷",
      item3Name: "K-甜品 芒果百香果冷饮",
      item3Price: "₩3,800",
      item3Tag: "解腻小食",
      nfcTitle: "1秒触碰 NFC多语言母语向导",
      nfcDesc: "手机轻触货架NFC标签，即可观看中文15秒快手烹饪短视频与多语言详细说明。",
      btnWishlist: "加入心愿单",
      btnRoute: "查看最短动线",
      btnDetail: "查看详情"
    },
    routeGuide: {
      title: "交通与无障碍动线指南",
      subTitle: "新村站直通，轻松购物无需迷路",
      station: "地铁2号线新村站 地下直通",
      stationDesc: "自新村站地下连接通道直通易买得B3层卖场 (步行仅需1分钟)",
      yellowLine: "地面黄色引导线 (Yellow Route)",
      yellowLineDesc: "跟随地面的醒目黄色箭头导引，直达K-Palette专区及Tax-Free即时退税服务站",
      taxFree: "一站式 Express 现场退税",
      taxFreeDesc: "收银台旁设有自助退税机，出示护照扫描即可在5分钟内完成全额退税"
    },
    toastLangChanged: "语言已切换为 '简体中文'。",
    mapSection: {
      sectionTitle: "B3 互动卖场地图",
      tabB3: "B3 卖场平面图",
      tabStation: "新村站连接路线",
      zoomIn: "放大",
      zoomOut: "缩小",
      zoomReset: "重置",
      entrance: "🚇 新村站入口",
      dragHint: "拖拽移动 · 滚轮缩放",
      stationTitle: "新村站2号线 → 易买得B3直通路线"
    }
  },

  ja: {
    langName: "日本語",
    langCode: "JA",
    flag: "🇯🇵",
    brandTitle: "イーマート 新村店",
    brandSub: "K-Palette Zone",
    badgeFeature: "4.6 多言語リアルタイム切替機能",
    badgeStatus: "正常稼働中",
    heroTitle: "訪韓外国人観光客のための多言語スマートガイド",
    heroDesc: "上の言語ボタンを選択すると、カテゴリー、検索バー、売り場案内、ショッピング動線がリロードなしで即時に翻訳されます。",
    searchPlaceholder: "売り場や商品を検索... (例: ブルダック、No Brand、免税)",
    btnSearch: "検索",
    filterTitle: "売り場カテゴリー分類 (Category)",
    categories: {
      all: "すべて見る",
      kPalette: "K-Palette Zone (トレンド特設)",
      kFood: "K-Food / 韓国食品",
      kBeauty: "K-Beauty / コスメ・ケア",
      noBrand: "No Brand / コスパ生活雑貨",
      service: "便利施設 / 即時免税"
    },
    currentLangNotice: "現在選択中の言語",
    demoStoreTitle: "プレビュー: 売り場詳細カード",
    sampleStore: {
      name: "K-Palette Zone (K-トレンドキュレーションゾーン)",
      aisle: "B3入口メインポップアップゾーン",
      hotBadge: "SNSリアルタイム人気 🔥",
      taxFreeBadge: "即時免税 (Tax Free) 対応",
      desc: "韓国現地の実際のPOS購買データとSNSトレンドに基づくTop 20ランキングゾーンです。話題のブルダック組み合わせから万能ソースまで一目で探せます。",
      popularTitle: "現地人イチオシのベストセラー組み合わせ",
      item1Name: "ブルダック + チーズ黄金コンビセット",
      item1Price: "₩5,400",
      item1Tag: "SNS話題",
      item2Name: "現地おすすめ万能韓国調味料",
      item2Price: "₩4,200",
      item2Tag: "失敗なしの味",
      item3Name: "K-デザート マンゴー＆パッションフルーツ",
      item3Price: "₩3,800",
      item3Tag: "リフレッシュおやつ",
      nfcTitle: "1秒タッチ NFC多言語・母国語案内",
      nfcDesc: "商品棚のNFCタグにスマホをタッチすると、母国語で15秒ショート動画レシピと成分表が自動表示されます。",
      btnWishlist: "買い物リストに追加",
      btnRoute: "最短ルート案内",
      btnDetail: "詳細を見る"
    },
    routeGuide: {
      title: "交通およびアクセス動線ガイド",
      subTitle: "迷わない新村駅直結ショッピング",
      station: "地下鉄2号線 新村駅 地下直結",
      stationDesc: "新村駅の地下連絡通路からイーマートB3階へ直通アクセス（徒歩1分）",
      yellowLine: "床面イエロー誘導ライン (Yellow Route)",
      yellowLineDesc: "入口の床にある黄色い矢印ラインに沿って進むだけで、K-PaletteゾーンやTax-Freeカウンターへ直行",
      taxFree: "ワンストップ Express Tax-Free",
      taxFreeDesc: "レジ横の無人免税キオスクでパスポートをスキャンするだけで、5分以内に即時還付完了"
    },
    toastLangChanged: "言語が「日本語」に変更されました。",
    mapSection: {
      sectionTitle: "B3 インタラクティブ売り場マップ",
      tabB3: "B3 売り場フロアマップ",
      tabStation: "新村駅アクセスマップ",
      zoomIn: "拡大",
      zoomOut: "縮小",
      zoomReset: "リセット",
      entrance: "🚇 新村駅入口",
      dragHint: "ドラッグで移動 · スクロールで拡大/縮小",
      stationTitle: "新村駅2号線 → イーマートB3直結ルート"
    }
  }
};

/**
 * i18n Translation Engine Object
 */
window.I18nEngine = {
  currentLang: "ko",
  supportedLangs: ["ko", "en", "zh", "ja"],
  storageKey: "emart_sinchon_lang",

  init(defaultLang = "ko") {
    // 1. Check localStorage first
    const saved = localStorage.getItem(this.storageKey);
    if (saved && this.supportedLangs.includes(saved)) {
      this.currentLang = saved;
    } else {
      // 2. Check browser navigator language
      const browserLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
      if (browserLang.startsWith("zh")) this.currentLang = "zh";
      else if (browserLang.startsWith("ja")) this.currentLang = "ja";
      else if (browserLang.startsWith("en")) this.currentLang = "en";
      else this.currentLang = defaultLang;
    }

    this.applyLanguage(this.currentLang, false);
  },

  setLanguage(langCode, showToast = true) {
    if (!this.supportedLangs.includes(langCode)) return;
    this.currentLang = langCode;
    localStorage.setItem(this.storageKey, langCode);
    this.applyLanguage(langCode, showToast);
  },

  get(path, lang = this.currentLang) {
    const data = I18N_DATA[lang] || I18N_DATA["ko"];
    const keys = path.split(".");
    let current = data;
    for (const key of keys) {
      if (current === undefined || current[key] === undefined) {
        return path;
      }
      current = current[key];
    }
    return current;
  },

  applyLanguage(langCode, notify = true) {
    const dict = I18N_DATA[langCode];
    if (!dict) return;

    // Set document lang attribute
    document.documentElement.lang = langCode;

    // 1. Text elements with [data-i18n]
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      const text = this.get(key, langCode);
      if (text !== undefined) {
        el.textContent = text;
      }
    });

    // 2. Placeholder attributes with [data-i18n-placeholder]
    const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    placeholders.forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      const text = this.get(key, langCode);
      if (text !== undefined) {
        el.setAttribute("placeholder", text);
      }
    });

    // 3. Aria-labels with [data-i18n-aria]
    const arias = document.querySelectorAll("[data-i18n-aria]");
    arias.forEach(el => {
      const key = el.getAttribute("data-i18n-aria");
      const text = this.get(key, langCode);
      if (text !== undefined) {
        el.setAttribute("aria-label", text);
      }
    });

    // 4. Update language switcher buttons active states
    const buttons = document.querySelectorAll(".lang-btn");
    buttons.forEach(btn => {
      const targetLang = btn.getAttribute("data-lang");
      if (targetLang === langCode) {
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      }
    });

    // 5. Update language status badge in preview
    const badgeEl = document.getElementById("active-lang-badge");
    if (badgeEl) {
      badgeEl.innerHTML = `<span class="badge-flag">${dict.flag}</span> <span class="badge-name">${dict.langName} (${dict.langCode})</span>`;
    }

    // 6. Dispatch custom event for extensible component subscribers
    const event = new CustomEvent("emart:languageChanged", {
      detail: { lang: langCode, dictionary: dict }
    });
    window.dispatchEvent(event);

    // 7. Optional subtle toast notification
    if (notify && typeof window.showToastNotification === "function") {
      window.showToastNotification(dict.toastLangChanged);
    }
  }
};
