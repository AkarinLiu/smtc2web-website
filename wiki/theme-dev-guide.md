# 主题开发指南

> [!TIP]
> 此指南目前不够完善，需要其他人一起研究编辑，如果你愿意参与其中，请点击下方的编辑此页面按钮编辑。

主题开发难度取决于你使用的是什么前端框架，但是字符串模板极其简单，想快速开发主题可以[点击此处](https://github.com/new?template_name=smtc2web-theme-template)创建项目。

## JavaScript 参考代码

```
import { createApp, reactive } from "./lib/js/vue.esm-browser.js";

createApp({
  setup() {
    const info = reactive({
      title: null,
      artist: null,
      album: null,
      album_art: null,
      position: "00:00",
      duration: "00:00",
      pct: 0,
      is_playing: false,
    });

    let lastData = {};

    async function poll() {
      try {
        const r = await fetch("/api/now"); // 如果打算用于 OBS 浏览器源，可以更改这里的后端地址。
        const data = await r.json();

        // 简单比较数据是否变化
        if (JSON.stringify(data) !== JSON.stringify(lastData)) {
          Object.assign(info, {
            ...data,
            pct: parseFloat((data.pct ?? 0).toFixed(1)),
          });
          lastData = data;
        }

        // 根据播放状态动态调整轮询间隔
        const pollInterval = info.is_playing ? 100 : 200;
        setTimeout(poll, pollInterval);
      } catch (e) {
        console.error("poll error", e);
        setTimeout(poll, 250); // 错误时使用默认间隔
      }
    }

    poll(); // 启动
    return { info };
  },
}).mount("#app");
```

## 字符串

### info.album_art

这是用于展示专辑图片的字符串，例如：

```
<img v-if="info.album_art" :src="info.album_art" alt="Album Art" />
```

### info.title

这是用于展示音乐名称信息的字符串，例如：

```
<h1 class="text-outline">{{ info.title || '–' }}</h1>
```

### info.artist

这是用于展示音乐艺术家信息的字符串，例如：

```
<h2 class="text-outline">{{ info.artist || '–' }}</h2>
```

### info.album

这是用于展示音乐专辑信息的字符串，例如：

```
<p class="text-outline">{{ info.album || '–' }}</p>
```

### info.pct

这是用于展示进度条播放进度的百分比，例如：

```
<div class="bar" :style="{ width: info.pct + '%' }"></div>
```
### info.position

这是用于展示当前播放进度的时间码，例如：

```
<span class="time">{{ info.position || '0:00' }}</span>
```

### info.duration

这是用于展示展示所需播放时长的时间码，例如：

```
<span class="time">{{ info.duration || '0:00' }}</span>
```
