import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "smtc2web",
  description: "A VitePress Site",
  sitemap: {
    hostname: "https://smtc2web.akarinliu.com",
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "维基", link: "/wiki" },
    ],

    sidebar: {
      "/wiki/": [
        {
          text: "维基",
          items: [
            {
              text: "编译",
              items: [
                { text: "在 Windows 上编译", link: "/wiki/compile/windows.md" },
              ],
            },
            { text: "更改字体", link: "/wiki/change-fonts.md" },
            { text: "SMTC 协议适配列表", link: "/wiki/smtc-protocol-list.md" },
          ],
        },
      ],
    },

    search: {
      provider: "local",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/AkarinLiu/smtc2web" },
    ],
  },
});
