/**
 * Emart Sinchon K-Palette Zone - Main Application Logic
 * Implements Section 4.6 (Multilingual Switcher) with interactive preview
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Toast Notification system
  window.showToastNotification = function (message) {
    let toast = document.getElementById("i18n-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "i18n-toast";
      toast.className = "i18n-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  };

  // 1. Initialize i18n Engine
  window.I18nEngine.init();

  // 2. Set up Language Switcher Buttons
  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      if (selectedLang) {
        window.I18nEngine.setLanguage(selectedLang, true);
        
        // Add momentary highlight pulse to all translated elements
        triggerTranslatePulse();
      }
    });
  });

  // 3. Category Buttons Active State Toggle (Interactive Mock)
  const categoryChips = document.querySelectorAll(".category-chip");
  categoryChips.forEach(chip => {
    chip.addEventListener("click", () => {
      categoryChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      const catName = chip.querySelector(".chip-text")?.textContent || "";
      const currentDict = I18N_DATA[window.I18nEngine.currentLang];
      window.showToastNotification(`[${catName}] 선택됨`);
    });
  });

  // 4. Wishlist Button Interactive Mock
  const wishlistBtn = document.getElementById("btn-wishlist");
  let isWishlisted = false;
  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
      isWishlisted = !isWishlisted;
      wishlistBtn.classList.toggle("active", isWishlisted);
      const icon = wishlistBtn.querySelector("i");
      if (icon) {
        icon.className = isWishlisted ? "fa-solid fa-heart text-pink-500" : "fa-regular fa-heart";
      }
      const lang = window.I18nEngine.currentLang;
      const msg = isWishlisted
        ? (lang === 'en' ? "Added to Wishlist! ❤️" : lang === 'zh' ? "已加入心愿单! ❤️" : lang === 'ja' ? "買い物リストに追加しました! ❤️" : "쇼핑 목록에 추가되었습니다! ❤️")
        : (lang === 'en' ? "Removed from Wishlist" : lang === 'zh' ? "已从心愿单移除" : lang === 'ja' ? "リストから削除しました" : "쇼핑 목록에서 삭제되었습니다");
      window.showToastNotification(msg);
    });
  }

  // 5. Shortest Route Button Interactive Mock
  const routeBtn = document.getElementById("btn-route");
  if (routeBtn) {
    routeBtn.addEventListener("click", () => {
      const lang = window.I18nEngine.currentLang;
      const msg = lang === 'en'
        ? "Showing Yellow Route to B3 K-Palette Zone (1 min)"
        : lang === 'zh'
        ? "正在显示至B3层K-Palette专区的黄色引导线 (步行1分钟)"
        : lang === 'ja'
        ? "B3階 K-Paletteゾーンへのイエロー最短ルートを表示中 (徒歩1分)"
        : "B3층 K-Palette Zone으로 향하는 최단 바닥 유도선(Yellow Route) 표시 중 (1분)";
      window.showToastNotification(msg);
    });
  }

  // 6. Search Bar Mock Behavior
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  if (searchBtn && searchInput) {
    const handleSearch = () => {
      const q = searchInput.value.trim();
      if (!q) {
        searchInput.focus();
        return;
      }
      window.showToastNotification(`🔍 "${q}" 검색 결과 반영 중`);
    };
    searchBtn.addEventListener("click", handleSearch);
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSearch();
    });
  }
});

/**
 * Visual micro-animation to indicate that elements were just re-translated
 */
function triggerTranslatePulse() {
  const elements = document.querySelectorAll("[data-i18n], [data-i18n-placeholder]");
  elements.forEach(el => {
    el.classList.remove("i18n-pulse");
    // Force DOM reflow
    void el.offsetWidth;
    el.classList.add("i18n-pulse");
  });
}
