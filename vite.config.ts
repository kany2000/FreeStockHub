import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './', // 关键配置：使用相对路径，确保静态部署（如直接打开或子目录）正常工作
    plugins: [react()],
    define: {
      // 确保 process.env.API_KEY 在构建后的代码中可用
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});