import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "smtc2web",
  description: "A VitePress Site",
  sitemap: {
    hostname: "https://smtc2web.akarinliu.com",
  },
  lastUpdated: true,
  themeConfig: {
    editLink: true,
    docsRepo: "https://github.com/AkarinLiu/smtc2web-website",
    docsBranch: "master",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "下载", link: "/download" },
      { text: "Wiki", link: "/wiki" },
    ],

    sidebar: {
      "/wiki/": [
        {
          text: "Wiki",
          items: [
            {
              text: "编译",
              items: [
                { text: "在 Windows 上编译", link: "/wiki/compile/windows.md" },
              ],
            },
            { text: "更改字体", link: "/wiki/change-fonts.md" },
            { text: "SMTC 协议适配列表", link: "/wiki/smtc-protocol-list.md" },
            { text: "主题开发指南", link: "/wiki/theme-dev-guide.md" },
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
