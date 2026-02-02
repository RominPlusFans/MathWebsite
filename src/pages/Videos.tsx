import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { videos, categories } from '@/data/notes';
import { Play, Clock, Search, X, Filter } from 'lucide-react';

export function Videos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredVideos = useMemo(() => {
    let result = videos;

    if (selectedCategory) {
      result = result.filter((video) => video.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || categoryId;
  };

  return (
    <main className="min-h-screen bg-[#1a1a1a] pt-24 pb-16">
      <div className="section-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Video Library</h1>
          <p className="text-[#b0b0b0]">
            Watch step-by-step mathematical explanations on YouTube
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b0b0b0]" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#2a2a2a] border border-[#404040] rounded-lg 
                       text-white placeholder:text-[#505050] 
                       focus:outline-none focus:border-[#d4a373] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b0b0b0] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Button (Mobile) */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-[#2a2a2a] 
                     border border-[#404040] rounded-lg text-white"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Category Filters */}
        <div
          className={`flex flex-wrap gap-2 mb-8 ${isFilterOpen ? 'block' : 'hidden md:flex'}`}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-[#d4a373] text-[#1a1a1a]'
                : 'bg-[#2a2a2a] text-[#b0b0b0] border border-[#404040] hover:border-[#d4a373]'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#d4a373] text-[#1a1a1a]'
                  : 'bg-[#2a2a2a] text-[#b0b0b0] border border-[#404040] hover:border-[#d4a373]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-[#b0b0b0]">
          Showing {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
          {selectedCategory && ` in ${getCategoryName(selectedCategory)}`}
          {searchQuery && ` for "${searchQuery}"`}
        </div>

        {/* Videos Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Link
                key={video.id}
                to={`/videos/${video.id}`}
                className="group bg-[#2a2a2a] border border-[#404040] rounded-xl overflow-hidden
                         hover:border-[#d4a373] transition-all duration-300 hover:-translate-y-1 
                         hover:shadow-xl"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#d4a373]/20 flex items-center justify-center 
                                  group-hover:bg-[#d4a373]/30 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-6 h-6 text-[#d4a373] ml-1" fill="currentColor" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-white 
                                flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-[#1a1a1a]/80 rounded text-xs 
                                text-[#d4a373]">
                    {getCategoryName(video.category)}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#d4a373] 
                               transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-[#b0b0b0] text-sm line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2a2a2a] flex items-center justify-center">
              <Play className="w-8 h-8 text-[#505050]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No videos found</h3>
            <p className="text-[#b0b0b0]">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
