import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/notes';
import { ArrowRight } from 'lucide-react';

export function FeaturedSections() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#1a1a1a]">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Explore by Topic
          </h2>
          <p
            className={`text-[#b0b0b0] text-lg max-w-xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Dive deep into specialized mathematical domains
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/notes?category=${category.id}`}
              className={`group relative bg-[#2a2a2a] border border-[#404040] rounded-2xl p-8 
                         transition-all duration-500 hover:border-[#d4a373] hover:-translate-y-2 
                         hover:shadow-xl hover:shadow-[#d4a373]/5 ${
                           isVisible
                             ? 'opacity-100 translate-y-0'
                             : 'opacity-0 translate-y-12'
                         }`}
              style={{
                transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-[#d4a373]/10 flex items-center justify-center mb-6 
                            group-hover:bg-[#d4a373]/20 transition-colors duration-300">
                <span className="text-3xl text-[#d4a373]">{category.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#d4a373] transition-colors">
                {category.name}
              </h3>
              <p className="text-[#b0b0b0] text-sm mb-4 leading-relaxed">
                {category.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#b0b0b0]">
                  {category.noteCount} notes
                </span>
                <span className="flex items-center gap-1 text-sm text-[#d4a373] opacity-0 
                               group-hover:opacity-100 transition-opacity duration-300">
                  Explore
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4a373]/5 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
