import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  // 修复：移除硬编码的 FAKE Key。
  // 如果没有 API_KEY，让它保持 undefined，这样应用会报错提示“未配置 Key”，
  // 而不是发送一个无效的 Key 给 Google 导致奇怪的错误。
  const apiKey = env.API_KEY;

  console.log(`[Vite Config] API Key Status: ${apiKey ? 'Loaded' : 'Missing'}`);

  return {
    base: './', 
    plugins: [react()],
    define: {
      // 使用 JSON.stringify 确保插入的是字符串值
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});