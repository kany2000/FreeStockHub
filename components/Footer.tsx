import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white">FreeStockHub</h2>
          <p className="text-sm mt-2">聚合全网最优质的免费设计资源</p>
        </div>
        <div className="border-t border-slate-800 my-8 w-24 mx-auto"></div>
        <p className="text-sm">
          © {new Date().getFullYear()} FreeStockHub. Built with Gemini & React.
        </p>
        <p className="text-xs mt-2 text-slate-600">
          所有推荐网站的版权政策请以各网站官方声明为准。
        </p>
      </div>
    </footer>
  );
};

export default Footer;