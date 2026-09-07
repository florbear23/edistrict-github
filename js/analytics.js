/* Google Analytics 4 — E-District
 *
 * Property G-FBD3CD2NKM is the one already running on the production site.
 * It is loaded here so that tracking continues uninterrupted the moment
 * edistrict.com is pointed at this build.
 *
 * Two guards:
 *   1. Host allow-list — the tag only initialises on the production domain, so
 *      Netlify preview deploys and local servers never write into the live
 *      property. Nothing to remember to switch off at launch.
 *   2. Single-init flag — prevents a duplicate config call if this file is ever
 *      included twice on one page.
 */
(function () {
  "use strict";

  var GA_ID = "G-FBD3CD2NKM";
  var PRODUCTION_HOSTS = ["edistrict.com", "www.edistrict.com"];

  if (PRODUCTION_HOSTS.indexOf(window.location.hostname) === -1) { return; }
  if (window.__edGaInitialised) { return; }
  window.__edGaInitialised = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID);

  var tag = document.createElement("script");
  tag.async = true;
  tag.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(tag);
})();
