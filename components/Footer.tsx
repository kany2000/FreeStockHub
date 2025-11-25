import React from 'react';
import { Image, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-900 text-slate-300 py-16 mt-20 overflow-hidden">
      {/* 炫酷背景光效 */}
      <div className="absolute inset-0 z-0">
        {/* 主背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
        
        {/* 模糊光斑效果 */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] opacity-50" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] opacity-50" />
        
        {/* 顶部玻璃质感边框 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center flex flex-col items-center">
        
        {/* Logo Area */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="bg-indigo-600/20 p-2 rounded-lg backdrop-blur-sm border border-indigo-500/30">
            <Image size={24} className="text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">FreeStockHub</h2>
        </div>

        <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          聚合全网最优质的免费设计资源，让创意不再受限。
          <br/>
          AI 驱动，智能匹配您的视觉灵感。
        </p>

        {/* Social / Action */}
        <div className="flex gap-4 mb-10">
          <a 
            href="https://blog.c33.us.kg" 
            target="_blank" 
            rel="noreferrer" 
            className="group p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center w-10 h-10 shadow-sm hover:shadow-indigo-500/20"
            title="访问博客"
          >
            {/* 请确保在 public 目录下放入名为 blog-logo.png 的透明背景图片 */}
            <img 
              src="/blog-logo.png" 
              alt="Blog Logo" 
              className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
            />
          </a>
        </div>

        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-8 opacity-70"></div>

        <p className="text-sm flex items-center justify-center gap-1 text-slate-500">
          © {new Date().getFullYear()} FreeStockHub. Made by LeeKan with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> using Gemini & React.
        </p>
        
        <p className="text-xs mt-3 text-slate-600">
          所有推荐网站的版权政策请以各网站官方声明为准。
        </p>
      </div>
    </footer>
  );
};

export default Footer;