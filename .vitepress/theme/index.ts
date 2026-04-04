// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "aside-bottom": () => h("div", {
        class: "bilibili-social-card"
      }, [
        h("h3", "关注作者的 B 站账号"),
        h("img", {
          src: "/bilibili-social-account.png",
          alt: "哔哩哔哩账号二维码",
          style: "width: 100%; border-radius: 8px;"
        })
      ])
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
