import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { notes, categories } from '@/data/notes';
import { ArrowRight, Clock, Tag } from 'lucide-react';

export function RecentNotes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const recentNotes = notes.slice(0, 6);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || categoryId;
  };

  return (
    <section ref={sectionRef} className="py-24 bg-[#1f1f1f]">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2
              className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              Latest Notes
            </h2>
            <p
              className={`text-[#b0b0b0] text-lg transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              Fresh insights and explanations
            </p>
          </div>
          <Link
            to="/notes"
            className={`mt-4 md:mt-0 flex items-center gap-2 text-[#d4a373] hover:text-white transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            View All Notes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentNotes.map((note, index) => (
            <Link
              key={note.id}
              to={`/notes/${note.id}`}
              className={`group bg-[#2a2a2a] border border-[#404040] rounded-xl p-6 
                         transition-all duration-500 hover:border-[#d4a373] hover:-translate-y-2 
                         hover:shadow-xl ${
                           isVisible
                             ? 'opacity-100 translate-y-0'
                             : 'opacity-0 translate-y-16'
                         }`}
              style={{
                transitionDelay: isVisible ? `${100 + index * 100}ms` : '0ms',
                transform: isVisible ? `rotate(${(index % 3 - 1) * 0.5}deg)` : 'rotate(0deg)',
              }}
            >
              {/* Category Tag */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-medium bg-[#d4a373]/10 text-[#d4a373] rounded-full">
                  {getCategoryName(note.category)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#d4a373] transition-colors line-clamp-2">
                {note.title}
              </h3>

              {/* Excerpt */}
              <p className="text-[#b0b0b0] text-sm mb-4 line-clamp-2 leading-relaxed">
                {note.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-[#b0b0b0]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {note.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    {note.tags.length} tags
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
