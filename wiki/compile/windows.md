# 在 Windows 上编译

## 前期准备

- Visual Studio Community / 生成工具 2017+ | 使用 C++ 的桌面开发
- Windows SDK
- Rustup

## 克隆源代码

```
git clone --recurse-submodules https://github.com/AkarinLiu/smtc2web.git 
```

## 现有代码用户

```bash
git pull
git submodule update --init --recursive
```

## 构建源代码

```
cd smtc2web
pnpm tauri:build
```

构建好后，会保存在 `src-tauri\target\release\bundle\nsis` 路径，双击安装即可使用。
