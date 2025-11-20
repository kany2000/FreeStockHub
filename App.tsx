import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SiteCard from './components/SiteCard';
import Footer from './components/Footer';
import { RESOURCE_SITES } from './constants';
import { Category, AISearchResult } from './types';
import { Filter, Tag } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);

  const handleSearch = (result: AISearchResult | null) => {
    setAiResult(result);
    if (result && result.recommendedCategories.length > 0) {
      // Automatically switch filter to the first recommendation if specific
      // Or keep ALL if it's general
      if (!result.recommendedCategories.includes(Category.ALL)) {
        setActiveCategory(result.recommendedCategories[0] as Category);
      } else {
        setActiveCategory(Category.ALL);
      }
    }
  };

  const handleCategoryClick = (cat: Category) => {
    setActiveCategory(cat);
    // If user manually clicks a category, we might want to clear specific AI strict filtering
    // but keeping the keywords is fine.
  };

  const filteredSites = useMemo(() => {
    let sites = RESOURCE_SITES;

    // 1. Filter by Category
    if (activeCategory !== Category.ALL) {
      sites = sites.filter(site => site.categories.includes(activeCategory) || site.categories.includes(Category.GENERAL));
    }

    // 2. Sort: If AI recommends specific categories, prioritize sites in those categories
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <Hero onSearch={handleSearch} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 z-20 relative">
        
        {/* AI Context Banner */}
        {aiResult && (
          <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg mb-10 animate-fade-in">
            <div className="flex items-start gap-3">
              <Tag className="mt-1 shrink-0 text-indigo-200" size={20} />
              <div>
                <h3 className="font-bold text-lg mb-1">AI 智能分析结果</h3>
                <p className="text-indigo-100 mb-3 text-sm">{aiResult.reasoning}</p>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-medium uppercase tracking-wider text-indigo-300">推荐关键词:</span>
                  {aiResult.keywords.map((kw, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-500/50 rounded-full text-sm border border-indigo-400/30">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-8 flex flex-wrap items-center gap-3 sticky top-20 z-30">
          <div className="flex items-center text-slate-500 mr-2">
            <Filter size={18} className="mr-2" />
            <span className="text-sm font-medium">筛选:</span>
          </div>
          {Object.values(Category).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md transform scale-105'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div id="categories" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">未找到符合条件的资源站，请尝试切换分类。</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;