<script setup>
import { onMounted } from "vue";

function loadScript(src, attrs = {}) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.charset = "UTF-8";
    for (const [key, value] of Object.entries(attrs)) {
      if (value !== false) script.setAttribute(key, value);
    }
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

onMounted(async () => {
  // Add Google AdSense script to DOM first so that cookie-consent
  // can discover its data-cookie-consent attribute on initialization.
  const adScript = document.createElement("script");
  adScript.type = "text/plain";
  adScript.setAttribute("data-cookie-consent", "targeting");
  adScript.async = true;
  adScript.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3159573363149605";
  adScript.crossOrigin = "anonymous";
  document.head.appendChild(adScript);

  // Load and initialize cookie-consent
  try {
    await loadScript(
      "https://www.termsfeed.com/public/cookie-consent/4.2.0/cookie-consent.js"
    );

    window.cookieconsent.run({
      notice_banner_type: "headline",
      consent_type: "express",
      palette: "dark",
      language: "en",
      page_load_consent_levels: ["strictly-necessary"],
      notice_banner_reject_button_hide: false,
      preferences_center_close_button_hide: false,
      page_refresh_confirmation_buttons: false,
      website_name: "smtc2web",
    });
  } catch (err) {
    console.error("Failed to load cookie consent script:", err);
  }
});
</script>

<template>
  <noscript>
    Free cookie consent management tool by
    <a href="https://www.termsfeed.com/">TermsFeed</a>
  </noscript>
  <a
    href="#"
    id="open_preferences_center"
    class="cookie-preferences-link"
  >Update cookies preferences</a>
</template>

<style scoped>
.cookie-preferences-link {
  display: inline-block;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  padding: 4px 0;
  transition: color 0.25s;
}

.cookie-preferences-link:hover {
  color: var(--vp-c-brand-1);
}
</style>
