import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { getSearchSuggestions } from '../services/gemini';
import { AISearchResult } from '../types';
import { HERO_IMAGES } from '../constants';

interface HeroProps {
  onSearch: (result: AISearchResult | null) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 轮播逻辑
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // 每5秒切换一次

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const result = await getSearchSuggestions(query);
      onSearch(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white h-[600px] flex items-center justify-center">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
             <img 
              src={img} 
              alt={`background-${index}`} 
              className="w-full h-full object-cover scale-105 animate-subtle-zoom" // 增加轻微缩放动画
            />
            {/* 叠加颜色滤镜，确保图片不抢眼 */}
            <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
          </div>
        ))}
        {/* 额外的渐变遮罩，保证文字清晰 */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-indigo-200 mb-6 animate-fade-in-up">
          <Sparkles size={12} />
          <span>AI 驱动的素材搜索引擎</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-slate-300 drop-shadow-sm">
          寻找完美的免费高清素材
        </h1>
        <p className="text-lg sm:text-xl text-slate-200 mb-10 max-w-2xl mx-auto drop-shadow-md font-light">
          聚合全球优质免费商用图库。
          <br className="hidden sm:block" />
          输入您的创意想法，让 AI 匹配最佳搜索词与资源站。
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
          {/* 光晕背景 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-60 group-hover:opacity-100 blur-lg transition duration-500" />
          
          <div className="relative flex items-center bg-white/95 backdrop-blur-xl rounded-full shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]">
            <div className="pl-6 text-slate-400">
              {loading ? <Loader2 className="animate-spin text-indigo-600" /> : <Sparkles className="text-indigo-600" />}
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="描述画面... (例如: '赛博朋克风格的雨夜街道')"
              className="w-full py-4 px-4 text-slate-800 bg-transparent border-none focus:ring-0 text-lg placeholder:text-slate-400/80 rounded-full outline-none font-medium"
            />
            <button 
              type="submit"
              disabled={loading}
              className="mr-2 py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2"
            >
              {loading ? '思考中...' : '搜索'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-300/80">
          <span>热门搜索:</span>
          {['极简主义办公', '壮观自然风景', '3D抽象纹理', '复古胶片感'].map((term) => (
             <button 
                key={term}
                onClick={() => setQuery(term)} 
                className="hover:text-white hover:underline decoration-indigo-400 decoration-2 underline-offset-4 transition-colors"
             >
               {term}
             </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;