import React from 'react';
import { ExternalLink, Star, Hash } from 'lucide-react';
import { ResourceSite } from '../types';

interface SiteCardProps {
  site: ResourceSite;
  index: number;
  suggestedKeywords?: string[];
}

const SiteCard: React.FC<SiteCardProps> = ({ site, index, suggestedKeywords }) => {
  // Generate a consistent but random-looking image based on index
  const bgImage = `https://picsum.photos/600/400?random=${index + 10}`;

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 ease-out">
      {/* Card Header / Image */}
      <div className="relative h-44 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 z-10 pointer-events-none" />
        <img 
          src={bgImage} 
          alt={site.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 z-20" />
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-30">
          <div>
             <h3 className="text-2xl font-bold text-white flex items-center gap-2 tracking-tight group-hover:text-indigo-200 transition-colors duration-300">
              {site.name}
              {site.popular && <Star size={18} className="text-yellow-400 fill-yellow-400 animate-pulse" />}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col bg-white relative z-30">
        <div className="mb-5 flex-grow">
           <p className="text-slate-600 text-sm leading-relaxed">
            {site.description}
          </p>
        </div>

        {/* AI Suggested Deep Links */}
        {suggestedKeywords && suggestedKeywords.length > 0 && (
          <div className="mb-5 p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100/50 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors duration-300">
            <span className="text-xs font-bold text-indigo-600 block mb-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"/> 
              AI 推荐直达:
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestedKeywords.slice(0, 3).map((kw, i) => (
                <a
                  key={i}
                  href={`${site.url}/search/${encodeURIComponent(kw)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs bg-white text-indigo-600 px-2.5 py-1 rounded-md border border-indigo-200 hover:bg-indigo-600 hover:text-white hover:scale-105 hover:shadow-md transition-all duration-200 truncate max-w-[120px]"
                  title={`在 ${site.name} 搜索 "${kw}"`}
                >
                  {kw}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {site.tags.map((tag) => (
            <span 
              key={tag} 
              className="flex items-center text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200 cursor-default"
            >
              <Hash size={10} className="mr-1 opacity-50" />
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <a 
          href={site.url} 
          target="_blank" 
          rel="noreferrer"
          className="mt-auto w-full group/btn flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          访问网站 
          <ExternalLink size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
        </a>
      </div>
    </div>
  );
};

export default SiteCard;