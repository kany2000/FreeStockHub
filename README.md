# FreeStockHub - 免费高清图库聚合平台

FreeStockHub 是一个现代化的免费图片资源聚合网站。它不仅收集了全球最优质的免费商用图库（如 Unsplash, Pexels, Pixabay 等），还集成了 **Google Gemini AI**，能够理解您的自然语言描述（如“赛博朋克风格的雨夜”），智能推荐搜索关键词和最合适的素材网站。

## ✨ 功能特性

*   **AI 智能搜索**: 集成 Google Gemini 2.5 模型，将抽象的想法转化为精确的英文搜索词。
*   **精选图库**: 收录 10+ 个高质量免费商用图库，覆盖风景、人像、插画、纹理等分类。
*   **智能排序**: 根据 AI 分析结果，自动将最匹配的图库排在前面。
*   **直达链接**: AI 生成的关键词可直接点击跳转到对应网站进行搜索。
*   **响应式设计**: 完美适配桌面端和移动端，拥有丝滑的动画和磨砂玻璃（Glassmorphism）视觉效果。

## 🛠 技术栈

*   **前端框架**: [React 19](https://react.dev/)
*   **构建工具**: [Vite](https://vitejs.dev/)
*   **样式库**: [Tailwind CSS](https://tailwindcss.com/)
*   **图标库**: [Lucide React](https://lucide.dev/)
*   **AI 模型**: [Google Gemini API (@google/genai)](https://ai.google.dev/)
*   **语言**: TypeScript

---

## 🚀 本地开发指南

### 1. 克隆项目

```bash
git clone https://github.com/your-username/FreeStockHub.git
cd FreeStockHub
```

### 2. 安装依赖

确保您的环境已安装 Node.js (推荐 v18+)。

```bash
npm install
```

### 3. 配置环境变量

在项目根目录下创建一个 `.env` 文件，并填入您的 Google Gemini API Key：

```env
API_KEY=your_google_gemini_api_key_here
```

> **注意**: 您可以在 [Google AI Studio](https://aistudiocdn.com/apikey) 免费获取 API Key。

### 4. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 `http://localhost:5173` 即可看到效果。

---

## 🔥 部署到 Firebase Hosting (详细教程)

本项目已预配置 `firebase.json`，部署非常简单。请按照以下步骤操作：

### 准备工作

1.  访问 [Firebase Console](https://console.firebase.google.com/) 并创建一个新项目（或使用现有项目）。
2.  确保您已安装 Firebase 命令行工具：
    ```bash
    npm install -g firebase-tools
    ```

### 第一步：登录与初始化

在项目根目录下打开终端：

1.  **登录 Firebase**:
    ```bash
    firebase login
    ```
    (这将打开浏览器窗口进行 Google 账号授权)

2.  **初始化项目** (如果您是第一次部署):
    ```bash
    firebase init hosting
    ```
    
    **按照提示进行选择**:
    *   **? Please select an option:** 选择 `Use an existing project` (使用现有项目) 并选择您在 Firebase 控制台创建的项目。
    *   **? What do you want to use as your public directory?** 输入 `dist`
        *   *(这是 Vite 构建后的输出目录)*
    *   **? Configure as a single-page app (rewrite all urls to /index.html)?** 输入 `Yes`
        *   *(这对 React 路由很重要)*
    *   **? Set up automatic builds and deploys with GitHub?** 根据需要选择 (通常选 `No` 手动部署)。
    *   **? File dist/index.html already exists. Overwrite?** 输入 `No`
        *   *(如果有此提示，不要覆盖，除非你想重置)*

### 第二步：构建项目

在部署之前，必须先将 React 代码编译为静态文件：

```bash
npm run build
```

此命令会在项目根目录下生成 `dist` 文件夹。

### 第三步：部署上线

```bash
firebase deploy
```

终端将显示 `Deploy complete!` 以及您的 **Hosting URL** (例如: `https://your-project.web.app`)。点击链接即可访问您的网站！

---

## ⚠️ 关于 API Key 的安全设置

由于这是一个纯前端项目，API Key 需要暴露在浏览器中才能调用 Gemini API。为了防止 API Key 被他人盗用，**强烈建议**在 Google Cloud Console 中设置限制：

1.  访问 [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials)。
2.  找到您的 API Key 并点击编辑。
3.  在 "Application restrictions" (应用限制) 下，选择 **Web sites** (网站)。
4.  在 "Website restrictions" 中添加您的 Firebase 域名：
    *   `https://your-project.web.app/*`
    *   `https://your-project.firebaseapp.com/*`
    *   `http://localhost:5173/*` (开发调试用)

这样，即使其他人获取了您的 Key，也无法在其他网站上使用。

## 📄 开源协议

MIT License
