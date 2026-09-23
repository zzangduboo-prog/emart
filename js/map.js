/**
 * Emart Sinchon B3 - Interactive Map Rendering Engine
 * PRD 4.1: Interactive Map View with SVG, Zoom/Pan, Pins, Tooltips
 * Zero external dependencies - Pure Vanilla JavaScript
 */

window.MapEngine = (() => {
  // ── State ──
  let currentScale = 1;
  let panX = 0, panY = 0;
  let isDragging = false;
  let dragStartX = 0, dragStartY = 0;
  let lastPanX = 0, lastPanY = 0;
  let activeCategory = null; // null = show all
  let activeTab = "b3"; // "b3" or "station"
  let selectedPinId = null;

  const MIN_SCALE = 0.6;
  const MAX_SCALE = 3.0;
  const SCALE_STEP = 0.25;

  // ── DOM refs (set on init) ──
  let mapContainer, svgEl, mapGroup, tooltipEl, pinLayer;

  // ═══════════════════════════════════════════
  //  PUBLIC: Initialize the Map Engine
  // ═══════════════════════════════════════════
  function init() {
    mapContainer = document.getElementById("map-container");
    if (!mapContainer) return;

    tooltipEl = document.getElementById("map-tooltip");

    // Build SVG once
    buildSVG();

    // Attach controls
    attachZoomControls();
    attachPanEvents();
    attachTabSwitcher();
    attachPinchZoom();

    // Listen for language changes to update tooltip text
    window.addEventListener("emart:languageChanged", () => {
      if (selectedPinId) {
        const store = STORE_DATA.find(s => s.id === selectedPinId);
        if (store) showTooltip(store);
      }
    });
  }

  // ═══════════════════════════════════════════
  //  SVG BUILDER — B3 Floor Plan
  // ═══════════════════════════════════════════
  function buildSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    svgEl = document.createElementNS(svgNS, "svg");
    svgEl.setAttribute("viewBox", "0 0 1000 600");
    svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svgEl.id = "b3-floor-svg";
    svgEl.classList.add("map-svg");

    // Defs — gradients, filters, patterns
    const defs = document.createElementNS(svgNS, "defs");
    defs.innerHTML = `
      <filter id="glow-pink" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="glow"/>
        <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="glow"/>
        <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="floor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1a1f2e"/>
        <stop offset="100%" stop-color="#0f1520"/>
      </linearGradient>
      <pattern id="grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>
      </pattern>
    `;
    svgEl.appendChild(defs);

    mapGroup = document.createElementNS(svgNS, "g");
    mapGroup.id = "map-transform-group";

    // Background
    const bg = createRect(0, 0, 1000, 600, "url(#floor-grad)", 0, null);
    mapGroup.appendChild(bg);
    const gridRect = createRect(0, 0, 1000, 600, "url(#grid-pattern)", 0, null);
    mapGroup.appendChild(gridRect);

    // Outer boundary
    const boundary = createRect(20, 15, 960, 570, "none", 12, "rgba(255,255,255,0.08)");
    boundary.setAttribute("stroke-width", "1.5");
    boundary.setAttribute("stroke-dasharray", "6,3");
    mapGroup.appendChild(boundary);

    // Floor label
    const floorLabel = createText(500, 35, "B3 FLOOR — EMART SINCHON", "0.6rem", "rgba(255,255,255,0.2)", "middle", 700);
    mapGroup.appendChild(floorLabel);

    // ── Draw Structural Elements (walkways, columns, corridors) ──
    drawStructuralElements(mapGroup, svgNS);

    // ── Draw Store Zones ──
    drawStoreZones(mapGroup, svgNS);

    // ── Pin Layer (on top) ──
    pinLayer = document.createElementNS(svgNS, "g");
    pinLayer.id = "pin-layer";
    drawPins(pinLayer, svgNS);
    mapGroup.appendChild(pinLayer);

    svgEl.appendChild(mapGroup);

    // Build station access map (hidden initially)
    const stationSvg = buildStationSVG();

    // Insert both into container
    const svgWrapper = document.getElementById("map-svg-wrapper");
    if (svgWrapper) {
      svgWrapper.appendChild(svgEl);
      svgWrapper.appendChild(stationSvg);
    }
  }

  function drawStructuralElements(group, ns) {
    // Main corridor (horizontal, top area)
    const corridorTop = createRect(30, 100, 940, 6, "rgba(255, 196, 0, 0.15)", 3, "rgba(255, 196, 0, 0.3)");
    corridorTop.setAttribute("stroke-width", "0.5");
    group.appendChild(corridorTop);

    // Main corridor (horizontal, middle)
    const corridorMid = createRect(30, 250, 600, 5, "rgba(255, 196, 0, 0.1)", 2, "rgba(255, 196, 0, 0.2)");
    corridorMid.setAttribute("stroke-width", "0.5");
    group.appendChild(corridorMid);

    // Vertical corridor (left side)
    const corridorLeft = createRect(180, 100, 5, 460, "rgba(255, 196, 0, 0.1)", 2, "rgba(255, 196, 0, 0.2)");
    corridorLeft.setAttribute("stroke-width", "0.5");
    group.appendChild(corridorLeft);

    // Vertical corridor (right side, No Brand boundary)
    const corridorRight = createRect(610, 100, 5, 460, "rgba(255, 196, 0, 0.1)", 2, "rgba(255, 196, 0, 0.2)");
    corridorRight.setAttribute("stroke-width", "0.5");
    group.appendChild(corridorRight);

    // Yellow guide line (main route from entrance)
    const guideLine = document.createElementNS(ns, "path");
    guideLine.setAttribute("d", "M 100 55 L 350 55 L 350 100");
    guideLine.setAttribute("fill", "none");
    guideLine.setAttribute("stroke", "rgba(255, 196, 0, 0.6)");
    guideLine.setAttribute("stroke-width", "3");
    guideLine.setAttribute("stroke-dasharray", "10,5");
    guideLine.setAttribute("stroke-linecap", "round");
    guideLine.classList.add("yellow-route-line");
    group.appendChild(guideLine);

    // Entrance label
    const entranceGroup = document.createElementNS(ns, "g");
    const entranceBg = createRect(30, 40, 120, 30, "rgba(255, 196, 0, 0.15)", 6, "rgba(255, 196, 0, 0.4)");
    entranceBg.setAttribute("stroke-width", "1");
    entranceGroup.appendChild(entranceBg);
    const entranceText = createText(90, 60, "🚇 신촌역 입구", "0.55rem", "#FFC400", "middle", 700);
    entranceText.setAttribute("data-map-i18n", "entrance");
    entranceGroup.appendChild(entranceText);
    group.appendChild(entranceGroup);

    // Columns (decorative pillars)
    const columnPositions = [
      [250, 180], [400, 180], [550, 180],
      [250, 350], [400, 350],
      [250, 480], [400, 480]
    ];
    columnPositions.forEach(([cx, cy]) => {
      const col = createRect(cx - 6, cy - 6, 12, 12, "rgba(255,255,255,0.06)", 2, "rgba(255,255,255,0.1)");
      col.setAttribute("stroke-width", "0.5");
      group.appendChild(col);
    });
  }

  function drawStoreZones(group, ns) {
    STORE_DATA.forEach(store => {
      const catMeta = CATEGORY_META.find(c => c.id === store.category);
      if (!catMeta) return;

      const z = store.mapZone;
      // Convert percentage coords to SVG coords (1000x600 viewBox)
      const x = z.x * 10;
      const y = z.y * 6;
      const w = z.w * 10;
      const h = z.h * 6;

      const zoneGroup = document.createElementNS(ns, "g");
      zoneGroup.classList.add("store-zone");
      zoneGroup.setAttribute("data-store-id", store.id);
      zoneGroup.setAttribute("data-category", store.category);

      // Zone rectangle
      const zoneRect = createRect(x, y, w, h, `rgba(${catMeta.colorRgb}, 0.08)`, 8, `rgba(${catMeta.colorRgb}, 0.25)`);
      zoneRect.setAttribute("stroke-width", "1");
      zoneRect.classList.add("zone-rect");
      zoneGroup.appendChild(zoneRect);

      // Zone label (store name abbreviated)
      const lang = (window.I18nEngine && window.I18nEngine.currentLang) || "ko";
      const label = store.name[lang] || store.name.ko;
      const shortLabel = label.length > 12 ? label.substring(0, 12) + "…" : label;
      const fontSize = w < 120 ? "0.4rem" : "0.5rem";

      const labelText = createText(x + w / 2, y + h / 2 - 4, shortLabel, fontSize, `rgba(${catMeta.colorRgb}, 0.8)`, "middle", 600);
      labelText.setAttribute("data-store-label", store.id);
      zoneGroup.appendChild(labelText);

      // Aisle number label
      if (store.aisleNumber && store.aisleNumber !== "별도" && store.aisleNumber !== "Main") {
        const aisleText = createText(x + w / 2, y + h / 2 + 14, `[${store.aisleNumber}]`, "0.38rem", "rgba(255,255,255,0.3)", "middle", 500);
        zoneGroup.appendChild(aisleText);
      }

      group.appendChild(zoneGroup);
    });
  }

  function drawPins(layer, ns) {
    STORE_DATA.forEach(store => {
      const catMeta = CATEGORY_META.find(c => c.id === store.category);
      if (!catMeta) return;

      const px = store.pinPos.x * 10;
      const py = store.pinPos.y * 6;

      const pinGroup = document.createElementNS(ns, "g");
      pinGroup.classList.add("map-pin");
      pinGroup.setAttribute("data-store-id", store.id);
      pinGroup.setAttribute("data-category", store.category);
      pinGroup.setAttribute("tabindex", "0");
      pinGroup.setAttribute("role", "button");
      const lang = (window.I18nEngine && window.I18nEngine.currentLang) || "ko";
      pinGroup.setAttribute("aria-label", store.name[lang] || store.name.ko);

      // Pulse ring (animated)
      const pulseRing = document.createElementNS(ns, "circle");
      pulseRing.setAttribute("cx", px);
      pulseRing.setAttribute("cy", py);
      pulseRing.setAttribute("r", "16");
      pulseRing.setAttribute("fill", "none");
      pulseRing.setAttribute("stroke", catMeta.color);
      pulseRing.setAttribute("stroke-width", "1.5");
      pulseRing.setAttribute("opacity", "0");
      pulseRing.classList.add("pin-pulse-ring");
      pinGroup.appendChild(pulseRing);

      // Pin marker circle
      const pinCircle = document.createElementNS(ns, "circle");
      pinCircle.setAttribute("cx", px);
      pinCircle.setAttribute("cy", py);
      pinCircle.setAttribute("r", "10");
      pinCircle.setAttribute("fill", catMeta.color);
      pinCircle.setAttribute("stroke", "#FFFFFF");
      pinCircle.setAttribute("stroke-width", "2");
      pinCircle.classList.add("pin-circle");
      pinGroup.appendChild(pinCircle);

      // Pin icon (using text for emoji/icon)
      const iconMap = {
        "cat-k-palette": "★",
        "cat-k-food": "🍜",
        "cat-k-beauty": "✦",
        "cat-no-brand": "●",
        "cat-service": "◆"
      };
      const pinIcon = document.createElementNS(ns, "text");
      pinIcon.setAttribute("x", px);
      pinIcon.setAttribute("y", py + 4);
      pinIcon.setAttribute("text-anchor", "middle");
      pinIcon.setAttribute("fill", "#FFFFFF");
      pinIcon.setAttribute("font-size", "9");
      pinIcon.setAttribute("font-weight", "700");
      pinIcon.textContent = iconMap[store.category] || "●";
      pinGroup.appendChild(pinIcon);

      // Badge (if present)
      if (store.badge) {
        const badgeBg = createRect(px + 8, py - 18, 36, 14, "rgba(255, 64, 129, 0.9)", 4, null);
        pinGroup.appendChild(badgeBg);
        const badgeText = createText(px + 26, py - 8, store.badge, "0.35rem", "#FFFFFF", "middle", 800);
        pinGroup.appendChild(badgeText);
      }

      // Events
      pinGroup.addEventListener("mouseenter", () => handlePinHover(store, true));
      pinGroup.addEventListener("mouseleave", () => handlePinHover(store, false));
      pinGroup.addEventListener("click", () => handlePinClick(store));
      pinGroup.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handlePinClick(store);
        }
      });

      layer.appendChild(pinGroup);
    });
  }

  // ═══════════════════════════════════════════
  //  STATION ACCESS MAP (Tab 2)
  // ═══════════════════════════════════════════
  function buildStationSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 1000 600");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.id = "station-access-svg";
    svg.classList.add("map-svg", "hidden");

    const g = document.createElementNS(svgNS, "g");

    // Background
    const bg = createRect(0, 0, 1000, 600, "#0f1520", 0, null);
    g.appendChild(bg);

    // Grid
    const defs = document.createElementNS(svgNS, "defs");
    defs.innerHTML = `
      <pattern id="grid2" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>
      </pattern>
    `;
    svg.appendChild(defs);
    const gridRect = createRect(0, 0, 1000, 600, "url(#grid2)", 0, null);
    g.appendChild(gridRect);

    // Title
    const title = createText(500, 45, "신촌역 2호선 → 이마트 신촌점 B3 직결 동선", "0.9rem", "#FFFFFF", "middle", 800);
    title.setAttribute("data-map-i18n", "stationTitle");
    g.appendChild(title);

    // Sinchon Station platform
    const stationBg = createRect(100, 100, 350, 200, "rgba(16, 185, 129, 0.1)", 16, "rgba(16, 185, 129, 0.4)");
    stationBg.setAttribute("stroke-width", "2");
    g.appendChild(stationBg);

    const stationLabel = createText(275, 160, "🚇 신촌역 (2호선)", "0.85rem", "#10B981", "middle", 700);
    g.appendChild(stationLabel);
    const platformText = createText(275, 195, "신촌역 승강장", "0.6rem", "rgba(255,255,255,0.5)", "middle", 500);
    g.appendChild(platformText);

    // Exit indicator
    const exitBg = createRect(200, 270, 150, 40, "rgba(59, 130, 246, 0.15)", 8, "rgba(59, 130, 246, 0.4)");
    exitBg.setAttribute("stroke-width", "1.5");
    g.appendChild(exitBg);
    const exitText = createText(275, 295, "지하 연결통로 출구", "0.55rem", "#3B82F6", "middle", 600);
    g.appendChild(exitText);

    // Walking path (animated dashed)
    const walkPath = document.createElementNS(svgNS, "path");
    walkPath.setAttribute("d", "M 275 310 L 275 380 L 500 380 L 500 310 L 650 310");
    walkPath.setAttribute("fill", "none");
    walkPath.setAttribute("stroke", "#FFC400");
    walkPath.setAttribute("stroke-width", "4");
    walkPath.setAttribute("stroke-dasharray", "12,6");
    walkPath.setAttribute("stroke-linecap", "round");
    walkPath.classList.add("station-walk-path");
    g.appendChild(walkPath);

    // Walking time labels
    const walkLabel = createText(390, 370, "🚶 도보 약 1분", "0.6rem", "#FFC400", "middle", 700);
    g.appendChild(walkLabel);

    // Arrow indicators along path
    const arrows = [[340, 380], [430, 380], [500, 350], [570, 310]];
    arrows.forEach(([ax, ay]) => {
      const arrow = createText(ax, ay, "→", "0.8rem", "rgba(255, 196, 0, 0.6)", "middle", 700);
      g.appendChild(arrow);
    });

    // Emart B3 building
    const emartBg = createRect(600, 200, 300, 240, "rgba(255, 196, 0, 0.1)", 16, "rgba(255, 196, 0, 0.4)");
    emartBg.setAttribute("stroke-width", "2");
    g.appendChild(emartBg);

    const emartLogo = createText(750, 270, "e·mart", "1.2rem", "#FFC400", "middle", 900);
    g.appendChild(emartLogo);
    const emartSub = createText(750, 300, "신촌점 B3", "0.75rem", "rgba(255,255,255,0.6)", "middle", 600);
    g.appendChild(emartSub);

    // K-Palette Zone highlight inside Emart
    const kZone = createRect(640, 330, 120, 60, "rgba(255, 64, 129, 0.15)", 10, "rgba(255, 64, 129, 0.5)");
    kZone.setAttribute("stroke-width", "1.5");
    g.appendChild(kZone);
    const kText = createText(700, 365, "K-Palette Zone", "0.5rem", "#FF4081", "middle", 700);
    g.appendChild(kText);

    // Tax-Free zone inside Emart
    const taxZone = createRect(780, 330, 100, 60, "rgba(59, 130, 246, 0.15)", 10, "rgba(59, 130, 246, 0.5)");
    taxZone.setAttribute("stroke-width", "1.5");
    g.appendChild(taxZone);
    const taxText = createText(830, 365, "Tax-Free", "0.5rem", "#3B82F6", "middle", 700);
    g.appendChild(taxText);

    // Info box
    const infoBg = createRect(100, 460, 800, 80, "rgba(255,255,255,0.04)", 12, "rgba(255,255,255,0.08)");
    infoBg.setAttribute("stroke-width", "1");
    g.appendChild(infoBg);

    const infoLines = [
      { text: "✅ 신촌역 2호선 하차 → 지하 연결통로 → 이마트 B3 직결 (도보 1분)", y: 495, color: "#10B981" },
      { text: "✅ 바닥 노란색 화살표(Yellow Route)를 따라 K-Palette Zone 및 Tax-Free까지 논스톱 이동", y: 520, color: "#FFC400" }
    ];
    infoLines.forEach(line => {
      const t = createText(500, line.y, line.text, "0.52rem", line.color, "middle", 600);
      g.appendChild(t);
    });

    svg.appendChild(g);
    return svg;
  }

  // ═══════════════════════════════════════════
  //  ZOOM / PAN / RESET CONTROLS
  // ═══════════════════════════════════════════
  function attachZoomControls() {
    const zoomIn = document.getElementById("map-zoom-in");
    const zoomOut = document.getElementById("map-zoom-out");
    const zoomReset = document.getElementById("map-zoom-reset");

    if (zoomIn) zoomIn.addEventListener("click", () => zoom(SCALE_STEP));
    if (zoomOut) zoomOut.addEventListener("click", () => zoom(-SCALE_STEP));
    if (zoomReset) zoomReset.addEventListener("click", resetView);

    // Mouse wheel zoom
    const wrapper = document.getElementById("map-svg-wrapper");
    if (wrapper) {
      wrapper.addEventListener("wheel", (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? SCALE_STEP : -SCALE_STEP;
        zoom(delta);
      }, { passive: false });
    }
  }

  function zoom(delta) {
    currentScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, currentScale + delta));
    applyTransform();
    updateScaleDisplay();
  }

  function resetView() {
    currentScale = 1;
    panX = 0;
    panY = 0;
    applyTransform();
    updateScaleDisplay();
    // Deselect
    selectedPinId = null;
    hideTooltip();
    clearPinSelection();
  }

  function applyTransform() {
    if (!mapGroup) return;
    mapGroup.setAttribute("transform", `translate(${panX}, ${panY}) scale(${currentScale})`);
  }

  function updateScaleDisplay() {
    const el = document.getElementById("map-zoom-level");
    if (el) el.textContent = `${Math.round(currentScale * 100)}%`;
  }

  // ── Pan (Drag) ──
  function attachPanEvents() {
    const wrapper = document.getElementById("map-svg-wrapper");
    if (!wrapper) return;

    wrapper.addEventListener("mousedown", (e) => {
      if (e.target.closest(".map-pin")) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      lastPanX = panX;
      lastPanY = panY;
      wrapper.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      panX = lastPanX + (e.clientX - dragStartX);
      panY = lastPanY + (e.clientY - dragStartY);
      applyTransform();
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      const wrapper = document.getElementById("map-svg-wrapper");
      if (wrapper) wrapper.style.cursor = "grab";
    });

    // Touch events for mobile pan
    let touchStartX, touchStartY;
    wrapper.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1 && !e.target.closest(".map-pin")) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        lastPanX = panX;
        lastPanY = panY;
      }
    }, { passive: true });

    wrapper.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1) {
        panX = lastPanX + (e.touches[0].clientX - touchStartX);
        panY = lastPanY + (e.touches[0].clientY - touchStartY);
        applyTransform();
      }
    }, { passive: true });
  }

  // ── Pinch Zoom (Mobile) ──
  function attachPinchZoom() {
    const wrapper = document.getElementById("map-svg-wrapper");
    if (!wrapper) return;
    let initialDist = 0;
    let initialScale = 1;

    wrapper.addEventListener("touchstart", (e) => {
      if (e.touches.length === 2) {
        initialDist = getDistance(e.touches[0], e.touches[1]);
        initialScale = currentScale;
      }
    }, { passive: true });

    wrapper.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = getDistance(e.touches[0], e.touches[1]);
        const scale = initialScale * (dist / initialDist);
        currentScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
        applyTransform();
        updateScaleDisplay();
      }
    }, { passive: false });
  }

  function getDistance(t1, t2) {
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  }

  // ═══════════════════════════════════════════
  //  TAB SWITCHER (B3 Floor ↔ Station Access)
  // ═══════════════════════════════════════════
  function attachTabSwitcher() {
    const tabB3 = document.getElementById("map-tab-b3");
    const tabStation = document.getElementById("map-tab-station");
    if (!tabB3 || !tabStation) return;

    tabB3.addEventListener("click", () => switchTab("b3"));
    tabStation.addEventListener("click", () => switchTab("station"));
  }

  function switchTab(tab) {
    activeTab = tab;
    const b3Svg = document.getElementById("b3-floor-svg");
    const stationSvg = document.getElementById("station-access-svg");
    const tabB3 = document.getElementById("map-tab-b3");
    const tabStation = document.getElementById("map-tab-station");

    if (tab === "b3") {
      b3Svg && b3Svg.classList.remove("hidden");
      stationSvg && stationSvg.classList.add("hidden");
      tabB3 && tabB3.classList.add("active");
      tabStation && tabStation.classList.remove("active");
    } else {
      b3Svg && b3Svg.classList.add("hidden");
      stationSvg && stationSvg.classList.remove("hidden");
      tabB3 && tabB3.classList.remove("active");
      tabStation && tabStation.classList.add("active");
    }

    resetView();
  }

  // ═══════════════════════════════════════════
  //  PIN INTERACTION — Hover & Click
  // ═══════════════════════════════════════════
  function handlePinHover(store, isEnter) {
    const pinGroup = document.querySelector(`.map-pin[data-store-id="${store.id}"]`);
    if (!pinGroup) return;

    if (isEnter) {
      pinGroup.classList.add("hovered");
      showTooltip(store);
    } else {
      pinGroup.classList.remove("hovered");
      if (selectedPinId !== store.id) {
        hideTooltip();
      }
    }
  }

  function handlePinClick(store) {
    // Deselect previous
    clearPinSelection();

    selectedPinId = store.id;
    const pinGroup = document.querySelector(`.map-pin[data-store-id="${store.id}"]`);
    if (pinGroup) pinGroup.classList.add("selected");

    // Center viewport on pin
    centerOnStore(store);
    showTooltip(store);

    // Dispatch event for other modules
    window.dispatchEvent(new CustomEvent("emart:storeSelected", { detail: { store } }));
  }

  function clearPinSelection() {
    document.querySelectorAll(".map-pin.selected").forEach(p => p.classList.remove("selected"));
  }

  function centerOnStore(store) {
    const wrapper = document.getElementById("map-svg-wrapper");
    if (!wrapper) return;

    const ww = wrapper.clientWidth;
    const wh = wrapper.clientHeight;

    // Pin position in SVG coords
    const px = store.pinPos.x * 10;
    const py = store.pinPos.y * 6;

    // Target: center the pin in the viewport
    const targetScale = Math.max(1.5, currentScale);
    panX = (ww / 2) - (px * targetScale);
    panY = (wh / 2) - (py * targetScale);
    currentScale = targetScale;

    applyTransform();
    updateScaleDisplay();
  }

  // ═══════════════════════════════════════════
  //  TOOLTIP
  // ═══════════════════════════════════════════
  function showTooltip(store) {
    if (!tooltipEl) return;
    const lang = (window.I18nEngine && window.I18nEngine.currentLang) || "ko";
    const catMeta = CATEGORY_META.find(c => c.id === store.category);
    const catColor = catMeta ? catMeta.color : "#FFC400";
    const catName = catMeta ? (catMeta.name[lang] || catMeta.name.ko) : "";
    const storeName = store.name[lang] || store.name.ko;
    const storeSummary = store.summary[lang] || store.summary.ko;

    tooltipEl.innerHTML = `
      <div class="tooltip-header" style="border-left: 3px solid ${catColor}; padding-left: 8px;">
        <span class="tooltip-cat-badge" style="background: ${catColor}20; color: ${catColor};">${catName}</span>
        <h4 class="tooltip-title">${storeName}</h4>
      </div>
      <p class="tooltip-desc">${storeSummary}</p>
      ${store.aisleNumber && store.aisleNumber !== "별도" ? `<span class="tooltip-aisle">B3 - ${store.aisleNumber}번 매대</span>` : ""}
      ${store.taxFree ? `<span class="tooltip-tax-badge">Tax Free ✓</span>` : ""}
    `;

    tooltipEl.classList.add("visible");
  }

  function hideTooltip() {
    if (!tooltipEl) return;
    tooltipEl.classList.remove("visible");
  }

  // ═══════════════════════════════════════════
  //  CATEGORY FILTER (Called from app.js)
  // ═══════════════════════════════════════════
  function filterByCategory(categoryId) {
    activeCategory = categoryId;

    // Zones
    document.querySelectorAll(".store-zone").forEach(zone => {
      const cat = zone.getAttribute("data-category");
      if (!categoryId || cat === categoryId) {
        zone.classList.remove("dimmed");
      } else {
        zone.classList.add("dimmed");
      }
    });

    // Pins
    document.querySelectorAll(".map-pin").forEach(pin => {
      const cat = pin.getAttribute("data-category");
      if (!categoryId || cat === categoryId) {
        pin.classList.remove("dimmed");
      } else {
        pin.classList.add("dimmed");
      }
    });
  }

  // ═══════════════════════════════════════════
  //  UPDATE LABELS ON LANGUAGE CHANGE
  // ═══════════════════════════════════════════
  function updateLabels() {
    const lang = (window.I18nEngine && window.I18nEngine.currentLang) || "ko";

    STORE_DATA.forEach(store => {
      const labelEl = document.querySelector(`[data-store-label="${store.id}"]`);
      if (labelEl) {
        const name = store.name[lang] || store.name.ko;
        labelEl.textContent = name.length > 12 ? name.substring(0, 12) + "…" : name;
      }

      // Update pin aria-labels
      const pinEl = document.querySelector(`.map-pin[data-store-id="${store.id}"]`);
      if (pinEl) pinEl.setAttribute("aria-label", store.name[lang] || store.name.ko);
    });
  }

  // Listen for language changes
  window.addEventListener("emart:languageChanged", updateLabels);

  // ═══════════════════════════════════════════
  //  SVG HELPERS
  // ═══════════════════════════════════════════
  function createRect(x, y, w, h, fill, rx, stroke) {
    const ns = "http://www.w3.org/2000/svg";
    const rect = document.createElementNS(ns, "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", w);
    rect.setAttribute("height", h);
    rect.setAttribute("fill", fill || "none");
    if (rx) rect.setAttribute("rx", rx);
    if (stroke) rect.setAttribute("stroke", stroke);
    return rect;
  }

  function createText(x, y, content, fontSize, fill, anchor, weight) {
    const ns = "http://www.w3.org/2000/svg";
    const text = document.createElementNS(ns, "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("fill", fill || "#FFFFFF");
    text.setAttribute("font-size", fontSize || "0.5rem");
    text.setAttribute("text-anchor", anchor || "middle");
    text.setAttribute("font-weight", weight || 400);
    text.setAttribute("font-family", "'Outfit', 'Noto Sans KR', sans-serif");
    text.textContent = content;
    return text;
  }

  // ═══════════════════════════════════════════
  //  PUBLIC API
  // ═══════════════════════════════════════════
  return {
    init,
    filterByCategory,
    resetView,
    centerOnStore,
    switchTab,
    updateLabels
  };
})();
