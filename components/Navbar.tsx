import React from 'react';
import { Image, Github } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Image size={24} />
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">FreeStockHub</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">首页</a>
            <a href="#categories" className="hover:text-indigo-600 transition-colors">分类</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">关于</a>
          </div>

          <div className="flex items-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-slate-800 transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;