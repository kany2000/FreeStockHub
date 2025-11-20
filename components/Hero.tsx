import React, { useState } from 'react';
import { Search, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { getSearchSuggestions } from '../services/gemini';
import { AISearchResult } from '../types';

interface HeroProps {
  onSearch: (result: AISearchResult | null) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div className="relative overflow-hidden bg-slate-900 text-white py-20 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 mix-blend-multiply" />
        <img 
          src="https://picsum.photos/1920/1080?grayscale" 
          alt="background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
          寻找完美的免费高清素材
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          汇集全球最优质的免费商业图库。
          <br className="hidden sm:block" />
          输入您的创意想法，让 AI 为您匹配最佳搜索词和资源站。
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200" />
          <div className="relative flex items-center bg-white rounded-full shadow-2xl">
            <div className="pl-6 text-slate-400">
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="text-indigo-500" />}
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="描述您想要的图片... (例如: '赛博朋克风格的雨夜街道')"
              className="w-full py-4 px-4 text-slate-800 bg-transparent border-none focus:ring-0 text-lg placeholder:text-slate-400 rounded-full outline-none"
            />
            <button 
              type="submit"
              disabled={loading}
              className="mr-2 py-2.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all disabled:opacity-70 flex items-center gap-2"
            >
              {loading ? '思考中...' : '搜索'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
          <span>热门搜索:</span>
          <button onClick={() => setQuery('极简主义办公桌')} className="hover:text-white underline decoration-dotted">极简办公</button>
          <button onClick={() => setQuery('壮观的自然风景')} className="hover:text-white underline decoration-dotted">自然风景</button>
          <button onClick={() => setQuery('科技感背景')} className="hover:text-white underline decoration-dotted">科技背景</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;