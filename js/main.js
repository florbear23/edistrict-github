(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
    /* Close on Escape */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  /* Floor plan tabs (map page).
     role="tablist" implies arrow-key navigation and a single tab stop, so the
     selected tab keeps tabindex="0" and the others are taken out of tab order. */
  var floorTabs = Array.prototype.slice.call(document.querySelectorAll(".floor-tab"));
  if (floorTabs.length) {
    var selectFloor = function (tab, moveFocus) {
      floorTabs.forEach(function (t) {
        var isCurrent = t === tab;
        t.setAttribute("aria-selected", isCurrent ? "true" : "false");
        t.setAttribute("tabindex", isCurrent ? "0" : "-1");
      });
      document.querySelectorAll(".floor-panel").forEach(function (p) {
        p.classList.toggle("is-active", p.id === tab.getAttribute("aria-controls"));
      });
      if (moveFocus) { tab.focus(); }
    };

    floorTabs.forEach(function (tab, i) {
      tab.setAttribute("tabindex", tab.getAttribute("aria-selected") === "true" ? "0" : "-1");
      tab.addEventListener("click", function () { selectFloor(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") { next = floorTabs[(i + 1) % floorTabs.length]; }
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { next = floorTabs[(i - 1 + floorTabs.length) % floorTabs.length]; }
        else if (e.key === "Home") { next = floorTabs[0]; }
        else if (e.key === "End") { next = floorTabs[floorTabs.length - 1]; }
        if (next) { e.preventDefault(); selectFloor(next, true); }
      });
    });
  }

  /* Blog category filter.
     The featured post lives in its own section above the grid, so it is filtered
     alongside the cards — otherwise its category would look empty. */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var postCards = document.querySelectorAll(".post-grid [data-category]");
  var featured = document.querySelector("[data-featured-category]");
  var emptyState = document.querySelector(".filter-empty");
  if (filterBtns.length && postCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        var cat = btn.getAttribute("data-filter");
        var shown = 0;
        postCards.forEach(function (card) {
          var show = cat === "all" || card.getAttribute("data-category") === cat;
          card.hidden = !show;
          if (show) { shown++; }
        });
        if (featured) {
          var featMatch = cat === "all" || featured.getAttribute("data-featured-category") === cat;
          featured.hidden = !featMatch;
          if (featMatch && cat !== "all") { shown++; }
        }
        if (emptyState) { emptyState.hidden = shown > 0; }
      });
    });
  }

  /* Sticky header shadow on scroll */
  var header = document.querySelector(".site-header");
  if (header) {
    var syncHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  /* Current year in footer */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
