# 嗖传官网

公开的产品官网与 Windows 安装包下载入口。应用源代码在独立仓库维护，本仓库只包含官网静态资源。

- 官网：https://ljc-02.github.io/souchuan/
- Windows 下载：https://github.com/ljc-02/souchuan/releases/latest
- QQ 交流群：1109641314

## 文件与发布

`public/` 是唯一的 GitHub Pages 部署目录，`.github/workflows/pages.yml` 在 `main` 更新后发布。仓库 Settings → Pages → Source 使用 GitHub Actions。

安装包保存在 Releases，不放入 Git 或 Pages。主下载按钮读取 `public/release.json`，提供版本、大小和 SHA-256；静态 HTML 保留百度网盘备用入口，JavaScript 不可用时仍可下载。网盘现有文件名为 `HarmonyShare_0.2.0_x64-setup.exe`，可能与直链版本不同。

发布新版本时：将安装包以 `Souchuan_版本号_x64-setup.exe` 上传到对应 Release，核对 SHA-256，再更新 `public/release.json`。官网展示的版本、大小和校验值来自该文件。

## 本地查看

使用任意静态 HTTP 服务打开 `public/`。所有资源使用相对路径，兼容 GitHub Pages 的 `/souchuan/` 子路径。无需 Node 构建、服务端、账号或 API 密钥。

## 资源

品牌图标由项目方提供；双设备场景由 HTML/CSS 绘制，表达产品功能，不是真实运行截图。GSAP 3.13.0 和 ScrollTrigger 随静态文件提供，许可见 `public/vendor/LICENSE.txt`。网页未引入统计、广告或第三方运行时请求。
