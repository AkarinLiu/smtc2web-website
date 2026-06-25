<script setup>
import { ref, computed, onMounted } from "vue";

const STORAGE_KEY = "smtc2web-cookie-consent";

// null = not yet decided, true = accepted, false = rejected
const targetingConsent = ref(null);
const showBanner = ref(false);
const showPreferences = ref(false);

// Whether AdSense has already been injected (prevent double-loading)
let adsenseLoaded = false;

function loadAdSense() {
    if (adsenseLoaded) return;
    adsenseLoaded = true;

    const script = document.createElement("script");
    script.async = true;
    script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3159573363149605";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
}

function saveConsent(targeting) {
    targetingConsent.value = targeting;
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ targeting, timestamp: Date.now() }),
    );

    if (targeting) {
        loadAdSense();
    }
}

function acceptAll() {
    saveConsent(true);
    showBanner.value = false;
    showPreferences.value = false;
}

function rejectAll() {
    saveConsent(false);
    showBanner.value = false;
    showPreferences.value = false;
}

function openPreferences() {
    showPreferences.value = true;
    showBanner.value = false;
}

function savePreferences() {
    saveConsent(targetingConsent.value ?? false);
    showBanner.value = false;
    showPreferences.value = false;
}

onMounted(() => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            targetingConsent.value = parsed.targeting ?? false;
            if (targetingConsent.value) {
                loadAdSense();
            }
        } else {
            // No stored consent — show the banner
            targetingConsent.value = null;
            showBanner.value = true;
        }
    } catch {
        // Corrupt storage — show banner and reset
        targetingConsent.value = null;
        showBanner.value = true;
    }
});
</script>

<template>
    <!-- Cookie Consent Banner -->
    <Teleport to="body">
        <Transition name="consent-fade">
            <div
                v-if="showBanner"
                class="consent-banner"
                role="dialog"
                aria-label="Cookie consent"
            >
                <div class="consent-banner-inner">
                    <div class="consent-text">
                        <p>
                            本网站使用 Cookie
                            来提供必要功能以及展示个性化广告（Google AdSense）。
                            继续使用本网站即表示您同意我们的
                            <a href="/privacy">隐私政策</a>。
                        </p>
                    </div>
                    <div class="consent-actions">
                        <button
                            class="consent-btn consent-btn-accept"
                            @click="acceptAll"
                        >
                            全部接受
                        </button>
                        <button
                            class="consent-btn consent-btn-reject"
                            @click="rejectAll"
                        >
                            全部拒绝
                        </button>
                        <button
                            class="consent-btn consent-btn-customize"
                            @click="openPreferences"
                        >
                            自定义
                        </button>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Preferences Modal -->
        <Transition name="consent-fade">
            <div
                v-if="showPreferences"
                class="consent-overlay"
                @click.self="showPreferences = false"
            >
                <div
                    class="consent-modal"
                    role="dialog"
                    aria-label="Cookie preferences"
                >
                    <h3>Cookie 偏好设置</h3>

                    <div class="consent-option">
                        <div class="consent-option-header">
                            <strong>必要 Cookie</strong>
                            <span class="consent-badge consent-badge-always"
                                >始终启用</span
                            >
                        </div>
                        <p class="consent-option-desc">
                            这些 Cookie 是网站正常运行所必需的，无法禁用。
                        </p>
                    </div>

                    <div class="consent-option">
                        <div class="consent-option-header">
                            <strong>定向广告 Cookie</strong>
                            <label class="consent-toggle">
                                <input
                                    type="checkbox"
                                    v-model="targetingConsent"
                                    :true-value="true"
                                    :false-value="false"
                                />
                                <span class="consent-toggle-slider"></span>
                            </label>
                        </div>
                        <p class="consent-option-desc">
                            通过 Google AdSense 投放个性化广告。这些 Cookie
                            用于跟踪您的浏览行为以展示相关广告。
                        </p>
                    </div>

                    <div class="consent-modal-actions">
                        <button
                            class="consent-btn consent-btn-accept"
                            @click="acceptAll"
                        >
                            全部接受
                        </button>
                        <button
                            class="consent-btn consent-btn-save"
                            @click="savePreferences"
                        >
                            保存选择
                        </button>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- "Update preferences" link (always visible) -->
        <div class="cookie-preferences-wrapper">
            <button class="cookie-preferences-link" @click="openPreferences">
                更新 Cookie 偏好设置
            </button>
        </div>
    </Teleport>
</template>

<style scoped>
/* ---- Transition ---- */
.consent-fade-enter-active,
.consent-fade-leave-active {
    transition: opacity 0.3s ease;
}
.consent-fade-enter-from,
.consent-fade-leave-to {
    opacity: 0;
}

/* ---- Banner ---- */
.consent-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: var(--vp-c-bg-soft);
    border-top: 1px solid var(--vp-c-divider);
    padding: 1rem 1.5rem;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
}

.consent-banner-inner {
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.consent-text {
    flex: 1;
}

.consent-text p {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--vp-c-text-2);
    line-height: 1.6;
}

.consent-text a {
    color: var(--vp-c-brand-1);
    text-decoration: underline;
}

.consent-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
    flex-wrap: wrap;
}

/* ---- Modal ---- */
.consent-overlay {
    position: fixed;
    inset: 0;
    z-index: 1001;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.consent-modal {
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    padding: 1.5rem;
    max-width: 480px;
    width: 100%;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.consent-modal h3 {
    margin: 0 0 1.25rem;
    font-size: 1.125rem;
    color: var(--vp-c-text-1);
}

.consent-option {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--vp-c-divider);
}

.consent-option:last-of-type {
    border-bottom: none;
}

.consent-option-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
}

.consent-option-header strong {
    font-size: 0.875rem;
    color: var(--vp-c-text-1);
}

.consent-option-desc {
    margin: 0.375rem 0 0;
    font-size: 0.75rem;
    color: var(--vp-c-text-2);
    line-height: 1.5;
}

.consent-badge {
    display: inline-block;
    font-size: 0.6875rem;
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-weight: 600;
}

.consent-badge-always {
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-2);
}

/* ---- Toggle switch ---- */
.consent-toggle {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 22px;
}

.consent-toggle input {
    opacity: 0;
    width: 0;
    height: 0;
}

.consent-toggle-slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: var(--vp-c-divider);
    border-radius: 11px;
    transition: background 0.25s;
}

.consent-toggle-slider::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    left: 2px;
    top: 2px;
    background: var(--vp-c-bg);
    border-radius: 50%;
    transition: transform 0.25s;
}

.consent-toggle input:checked + .consent-toggle-slider {
    background: var(--vp-c-brand-1);
}

.consent-toggle input:checked + .consent-toggle-slider::before {
    transform: translateX(18px);
}

/* ---- Buttons ---- */
.consent-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.4375rem 1rem;
    font-size: 0.8125rem;
    font-weight: 500;
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    cursor: pointer;
    transition:
        background 0.2s,
        color 0.2s,
        border-color 0.2s;
    white-space: nowrap;
}

.consent-btn-accept {
    background: var(--vp-c-brand-1);
    color: var(--vp-c-bg);
    border-color: var(--vp-c-brand-1);
}

.consent-btn-accept:hover {
    background: var(--vp-c-brand-2);
    border-color: var(--vp-c-brand-2);
}

.consent-btn-reject {
    background: transparent;
    color: var(--vp-c-text-2);
}

.consent-btn-reject:hover {
    color: var(--vp-c-text-1);
    border-color: var(--vp-c-text-2);
}

.consent-btn-customize,
.consent-btn-save {
    background: transparent;
    color: var(--vp-c-text-1);
}

.consent-btn-customize:hover,
.consent-btn-save:hover {
    background: var(--vp-c-bg-soft);
}

.consent-modal-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1.25rem;
    justify-content: flex-end;
}

/* ---- Persistent "Update preferences" link ---- */
.cookie-preferences-wrapper {
    padding: 1rem 0;
    text-align: center;
}

.cookie-preferences-link {
    display: inline-block;
    font-size: 0.8125rem;
    color: var(--vp-c-text-2);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 0;
    transition: color 0.25s;
}

.cookie-preferences-link:hover {
    color: var(--vp-c-brand-1);
}

/* ---- Responsive ---- */
@media (max-width: 640px) {
    .consent-banner-inner {
        flex-direction: column;
        align-items: stretch;
    }

    .consent-actions {
        justify-content: flex-end;
    }
}
</style>
