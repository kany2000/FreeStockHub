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
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      {/* Card Header / Image */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={bgImage} 
          alt={site.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-80" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {site.name}
              {site.popular && <Star size={16} className="text-yellow-400 fill-yellow-400" />}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-4 flex-grow">
           <p className="text-slate-600 text-sm leading-relaxed">
            {site.description}
          </p>
        </div>

        {/* AI Suggested Deep Links */}
        {suggestedKeywords && suggestedKeywords.length > 0 && (
          <div className="mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
            <span className="text-xs font-semibold text-indigo-600 block mb-2">AI 推荐搜索直达:</span>
            <div className="flex flex-wrap gap-2">
              {suggestedKeywords.slice(0, 3).map((kw, i) => (
                <a
                  key={i}
                  href={`${site.url}/search/${encodeURIComponent(kw)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs bg-white text-indigo-600 px-2 py-1 rounded border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-colors truncate max-w-[120px]"
                  title={`在 ${site.name} 搜索 "${kw}"`}
                >
                  {kw}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {site.tags.map((tag) => (
            <span key={tag} className="flex items-center text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              <Hash size={10} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <a 
          href={site.url} 
          target="_blank" 
          rel="noreferrer"
          className="mt-auto w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          访问网站 <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default SiteCard;