import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  // 逻辑：优先使用 .env/.env.local 中的配置。
  // 如果没有读到（例如文件编码问题或未生效），则强制使用您提供的硬编码 Key。
  // 注意：在生产环境代码中硬编码 Key 通常不推荐，但为了确保您的静态部署即刻可用，这里作为兜底策略。
  const hardcodedKey = "AIzaSyBbsNDIaS7UFAKEZLU9oCdEASlaie8iMFY";
  const apiKey = env.API_KEY || hardcodedKey;

  console.log(`[Vite Config] API Key Status: ${apiKey ? 'Loaded' : 'Missing'} (Length: ${apiKey?.length || 0})`);

  return {
    base: './', 
    plugins: [react()],
    define: {
      // 使用 JSON.stringify 确保插入的是字符串值
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});