import React, { useState } from 'react';
import { Image, Github, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Image size={24} />
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">FreeStockHub</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">首页</a>
            <a href="#categories" className="hover:text-indigo-600 transition-colors">分类</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">关于</a>
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-slate-800 transition-colors"
            >
              <Github size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg animate-in slide-in-from-top-5 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="#" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              首页
            </a>
            <a 
              href="#categories" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              分类
            </a>
            <a 
              href="#about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              关于
            </a>
             <a 
              href="https://github.com" 
              target="_blank"
              rel="noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              GitHub 源码
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;