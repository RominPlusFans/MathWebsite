import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { notes, categories, searchNotes } from '@/data/notes';
import { Search, Clock, Tag, Filter, X, Grid, List, Crown, Heart } from 'lucide-react';

export function NotesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category');
    setSelectedCategory(category);
  }, [searchParams]);

  const filteredNotes = useMemo(() => {
    let result = notes;

    if (selectedCategory) {
      result = result.filter((note) => note.category === selectedCategory);
    }

    if (searchQuery) {
      result = searchNotes(searchQuery).filter((note) =>
        result.some((n) => n.id === note.id)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || categoryId;
  };

  return (
    <main className="min-h-screen bg-[#1a1a1a] pt-24 pb-16">
      <div className="section-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Lecture Notes</h1>
          <p className="text-[#b0b0b0]">
            Browse our collection of comprehensive mathematical notes
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b0b0b0]" />
            <input
              type="text"
              placeholder="Search notes..."
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

          {/* View Mode Toggle */}
          <div className="hidden md:flex items-center gap-2 bg-[#2a2a2a] border border-[#404040] rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-[#404040] text-white' : 'text-[#b0b0b0] hover:text-white'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-[#404040] text-white' : 'text-[#b0b0b0] hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div
          className={`flex flex-wrap gap-2 mb-8 ${isFilterOpen ? 'block' : 'hidden md:flex'}`}
        >
          <button
            onClick={() => handleCategoryChange(null)}
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
              onClick={() => handleCategoryChange(category.id)}
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
          Showing {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
          {selectedCategory && ` in ${getCategoryName(selectedCategory)}`}
          {searchQuery && ` for "${searchQuery}"`}
        </div>

        {/* Notes Grid/List */}
        {filteredNotes.length > 0 ? (
          <div
            className={`${
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }`}
          >
            {filteredNotes.map((note) => (
              <Link
                key={note.id}
                to={`/notes/${note.id}`}
                className={`group bg-[#2a2a2a] border border-[#404040] rounded-xl 
                           hover:border-[#d4a373] transition-all duration-300 
                           hover:-translate-y-1 hover:shadow-xl ${
                             viewMode === 'list' ? 'flex gap-6 p-4' : 'p-6'
                           }`}
              >
                {/* Content */}
                <div className="flex-1">
                  {/* Category & Tier Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-[#d4a373]/10 
                                   text-[#d4a373] rounded-full">
                      {getCategoryName(note.category)}
                    </span>
                    {note.tier !== 'free' && (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                        note.tier === 'premium' 
                          ? 'bg-[#fbbf24]/10 text-[#fbbf24]' 
                          : 'bg-[#d4a373]/10 text-[#d4a373]'
                      }`}>
                        {note.tier === 'premium' ? <Crown className="w-3 h-3" /> : <Heart className="w-3 h-3" />}
                        {note.tier === 'premium' ? 'Premium' : 'Supporter'}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#d4a373] 
                               transition-colors line-clamp-2">
                    {note.title}
                  </h3>

                  {/* Excerpt */}
                  <p className={`text-[#b0b0b0] text-sm mb-4 ${viewMode === 'list' ? '' : 'line-clamp-2'}`}>
                    {note.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-[#b0b0b0]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {note.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      {note.tags.length} tags
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2a2a2a] flex items-center justify-center">
              <Search className="w-8 h-8 text-[#505050]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No notes found</h3>
            <p className="text-[#b0b0b0]">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
