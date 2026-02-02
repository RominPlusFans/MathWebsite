import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { videos } from '@/data/notes';
import { Play, Clock, ArrowRight } from 'lucide-react';

export function VideoSection() {
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

  const featuredVideo = videos[0];
  const playlistVideos = videos.slice(1, 5);

  return (
    <section ref={sectionRef} className="py-24 bg-[#1a1a1a]">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Video Explanations
          </h2>
          <p
            className={`text-[#b0b0b0] text-lg max-w-xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Watch step-by-step walkthroughs on YouTube
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured Video */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <Link
              to={`/videos/${featuredVideo.id}`}
              className="group block relative rounded-2xl overflow-hidden bg-[#2a2a2a] border border-[#404040] 
                        hover:border-[#d4a373] transition-all duration-500 hover:shadow-2xl"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#d4a373]/20 flex items-center justify-center 
                                group-hover:bg-[#d4a373]/30 group-hover:scale-110 transition-all duration-300">
                    <Play className="w-8 h-8 text-[#d4a373] ml-1" fill="currentColor" />
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/80 rounded text-xs text-white 
                              flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {featuredVideo.duration}
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#d4a373] transition-colors">
                  {featuredVideo.title}
                </h3>
                <p className="text-[#b0b0b0] text-sm line-clamp-2">
                  {featuredVideo.description}
                </p>
              </div>
            </Link>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-2 space-y-4">
            {playlistVideos.map((video, index) => (
              <Link
                key={video.id}
                to={`/videos/${video.id}`}
                className={`group flex gap-4 p-3 rounded-xl bg-[#2a2a2a] border border-[#404040] 
                           hover:border-[#d4a373]/50 hover:bg-[#2a2a2a]/80 transition-all duration-300 ${
                             isVisible
                               ? 'opacity-100 translate-x-0'
                               : 'opacity-0 translate-x-8'
                           }`}
                style={{ transitionDelay: isVisible ? `${400 + index * 100}ms` : '0ms' }}
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-16 rounded-lg bg-[#1a1a1a] flex-shrink-0 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-5 h-5 text-[#d4a373]/50 group-hover:text-[#d4a373] transition-colors" />
                  </div>
                  <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 rounded text-[10px] text-white">
                    {video.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white group-hover:text-[#d4a373] transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-xs text-[#b0b0b0] mt-1 line-clamp-1">
                    {video.description}
                  </p>
                </div>
              </Link>
            ))}

            {/* View All Link */}
            <Link
              to="/videos"
              className={`flex items-center justify-center gap-2 py-3 text-[#d4a373] hover:text-white 
                         border border-dashed border-[#404040] rounded-xl hover:border-[#d4a373] 
                         transition-all duration-300 ${
                           isVisible ? 'opacity-100' : 'opacity-0'
                         }`}
              style={{ transitionDelay: '800ms' }}
            >
              View All Videos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
