import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SiteCard from './components/SiteCard';
import Footer from './components/Footer';
import { RESOURCE_SITES } from './constants';
import { Category, AISearchResult } from './types';
import { Filter, Tag, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);

  const handleSearch = (result: AISearchResult | null) => {
    setAiResult(result);
    if (result && result.recommendedCategories.length > 0) {
      if (!result.recommendedCategories.includes(Category.ALL)) {
        setActiveCategory(result.recommendedCategories[0] as Category);
      } else {
        setActiveCategory(Category.ALL);
      }
    }
  };

  const handleCategoryClick = (cat: Category) => {
    setActiveCategory(cat);
  };

  const filteredSites = useMemo(() => {
    let sites = RESOURCE_SITES;

    if (activeCategory !== Category.ALL) {
      sites = sites.filter(site => site.categories.includes(activeCategory) || site.categories.includes(Category.GENERAL));
    }

    if (aiResult && aiResult.recommendedCategories.length > 0) {
        sites = [...sites].sort((a, b) => {
            const aMatch = aiResult.recommendedCategories.some(c => a.categories.includes(c as Category));
            const bMatch = aiResult.recommendedCategories.some(c => b.categories.includes(c as Category));
            if (aMatch && !bMatch) return -1;
            if (!aMatch && bMatch) return 1;
            return 0;
        });
    }

    return sites;
  }, [activeCategory, aiResult]);

  const isErrorResult = aiResult && (aiResult.reasoning.includes('[Err:') || aiResult.reasoning.includes('访问被拒绝'));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <Hero onSearch={handleSearch} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 z-20 relative">
        
        {/* AI Context Banner */}
        {aiResult && (
          <div 
            className={`p-6 rounded-2xl shadow-xl mb-10 animate-fade-in text-white transition-all duration-300 transform hover:scale-[1.01] ${
              isErrorResult ? 'bg-gradient-to-br from-red-500 to-orange-500' : 'bg-gradient-to-br from-indigo-600 to-purple-700'
            }`}
          >
            <div className="flex items-start gap-3">
              {isErrorResult ? (
                <div className="bg-white/20 p-2 rounded-lg"><AlertCircle className="text-white" size={24} /></div>
              ) : (
                <div className="bg-white/20 p-2 rounded-lg"><Tag className="text-white" size={24} /></div>
              )}
              
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 flex items-center justify-between">
                  <span>{isErrorResult ? 'AI 服务提示' : 'AI 智能分析结果'}</span>
                  {!isErrorResult && <span className="text-xs font-normal bg-white/20 px-2 py-0.5 rounded-full">Gemini 2.5 Flash</span>}
                </h3>
                <p className={`mb-3 text-sm ${isErrorResult ? 'text-red-50 font-medium' : 'text-indigo-50 leading-relaxed'}`}>
                  {aiResult.reasoning}
                </p>
                
                {!isErrorResult && (
                  <div className="flex flex-wrap gap-2 items-center mt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">推荐关键词:</span>
                    {aiResult.keywords.map((kw, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg text-sm border border-white/10 transition-colors cursor-copy" title="点击可复制（需自行实现复制功能）">
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-2 mb-8 sticky top-20 z-30 transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-wrap items-center gap-2 p-2">
             <div className="flex items-center text-slate-400 mr-2 px-2 hidden sm:flex">
              <Filter size={18} className="mr-2" />
              <span className="text-sm font-semibold uppercase tracking-wider">筛选</span>
            </div>
            
            {Object.values(Category).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`
                  relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ease-out
                  ${activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-lg scale-105 ring-2 ring-slate-200 ring-offset-2'
                    : 'bg-transparent text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:-translate-y-1 hover:shadow-md'
                  }
                  active:scale-95
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div id="categories" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-20">
          {filteredSites.map((site, index) => (
            <SiteCard 
              key={site.id} 
              site={site} 
              index={index}
              suggestedKeywords={aiResult?.keywords}
            />
          ))}
        </div>

        {filteredSites.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <Filter size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg font-medium">该分类下暂无资源</p>
            <p className="text-slate-400 text-sm mt-2">请尝试切换其他分类或查看“全部”</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;