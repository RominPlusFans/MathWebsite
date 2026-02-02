import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNoteById, categories } from '@/data/notes';
import { LatexRenderer } from '@/components/LatexRenderer';
import { Paywall } from '@/components/Paywall';
import { ArrowLeft, Clock, Calendar, Tag, Youtube, Share2, Bookmark, Lock, Crown, Heart } from 'lucide-react';
import { useEffect, useState, type ReactElement } from 'react';

export function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const note = id ? getNoteById(id) : undefined;
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!note) {
    return (
      <main className="min-h-screen bg-[#1a1a1a] pt-24 pb-16">
        <div className="section-container text-center py-16">
          <h1 className="text-2xl font-bold text-white mb-4">Note Not Found</h1>
          <p className="text-[#b0b0b0] mb-8">
            The note you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/notes" className="btn-primary">
            Browse All Notes
          </Link>
        </div>
      </main>
    );
  }

  const category = categories.find((c) => c.id === note.category);

  // Parse markdown-like content
  const renderContent = (content: string, limitParagraphs?: number) => {
    const lines = content.trim().split('\n');
    const elements: ReactElement[] = [];
    let inMathBlock = false;
    let mathContent = '';
    let paragraphCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Check paragraph limit
      if (limitParagraphs && paragraphCount >= limitParagraphs && trimmedLine === '') {
        break;
      }

      // Handle math blocks
      if (trimmedLine.startsWith('$$')) {
        if (inMathBlock) {
          elements.push(
            <div key={`math-${i}`} className="my-6">
              <LatexRenderer content={mathContent.trim()} display />
            </div>
          );
          mathContent = '';
          inMathBlock = false;
          paragraphCount++;
        } else {
          inMathBlock = true;
        }
        continue;
      }

      if (inMathBlock) {
        mathContent += line + '\n';
        continue;
      }

      // Handle inline math
      if (trimmedLine.includes('$')) {
        const parts = trimmedLine.split(/(\$[^$]+\$)/g);
        elements.push(
          <p key={`p-${i}`} className="mb-4 text-[#b0b0b0] leading-relaxed">
            {parts.map((part, partIndex) => {
              if (part.startsWith('$') && part.endsWith('$')) {
                return (
                  <LatexRenderer
                    key={partIndex}
                    content={part.slice(1, -1)}
                    className="inline"
                  />
                );
              }
              return part;
            })}
          </p>
        );
        paragraphCount++;
        continue;
      }

      // Handle headers
      if (trimmedLine.startsWith('# ')) {
        elements.push(
          <h1 key={`h1-${i}`} className="text-3xl font-bold text-white mt-12 mb-6">
            {trimmedLine.slice(2)}
          </h1>
        );
        continue;
      }

      if (trimmedLine.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${i}`} className="text-2xl font-semibold text-white mt-10 mb-4">
            {trimmedLine.slice(3)}
          </h2>
        );
        continue;
      }

      if (trimmedLine.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className="text-xl font-semibold text-white mt-8 mb-3">
            {trimmedLine.slice(4)}
          </h3>
        );
        continue;
      }

      // Handle lists
      if (trimmedLine.startsWith('- ')) {
        elements.push(
          <li key={`li-${i}`} className="ml-6 mb-2 text-[#b0b0b0] list-disc">
            {trimmedLine.slice(2)}
          </li>
        );
        continue;
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(trimmedLine)) {
        elements.push(
          <li key={`oli-${i}`} className="ml-6 mb-2 text-[#b0b0b0] list-decimal">
            {trimmedLine.replace(/^\d+\.\s/, '')}
          </li>
        );
        continue;
      }

      // Handle empty lines
      if (trimmedLine === '') {
        continue;
      }

      // Regular paragraph
      elements.push(
        <p key={`p-${i}`} className="mb-4 text-[#b0b0b0] leading-relaxed">
          {trimmedLine}
        </p>
      );
      paragraphCount++;
    }

    return elements;
  };

  // Get tier badge info
  const getTierBadge = () => {
    switch (note.tier) {
      case 'premium':
        return { icon: Crown, text: 'Premium', color: 'text-[#fbbf24]', bg: 'bg-[#fbbf24]/10' };
      case 'supporter':
        return { icon: Heart, text: 'Supporter', color: 'text-[#d4a373]', bg: 'bg-[#d4a373]/10' };
      default:
        return { icon: Lock, text: 'Free', color: 'text-gray-400', bg: 'bg-gray-400/10' };
    }
  };

  const tierBadge = getTierBadge();
  const TierIcon = tierBadge.icon;

  // Generate preview content (first N paragraphs)
  const previewContent = note.previewLength && note.previewLength > 0 
    ? renderContent(note.content, note.previewLength)
    : null;

  return (
    <main className="min-h-screen bg-[#1a1a1a] pt-24 pb-16">
      <div className="section-container">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#b0b0b0] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Header */}
            <header className="mb-8">
              {/* Category & Tier */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Link
                  to={`/notes?category=${note.category}`}
                  className="inline-block px-3 py-1 text-sm font-medium bg-[#d4a373]/10 
                           text-[#d4a373] rounded-full hover:bg-[#d4a373]/20 transition-colors"
                >
                  {category?.name || note.category}
                </Link>
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium 
                                rounded-full ${tierBadge.bg} ${tierBadge.color}`}>
                  <TierIcon className="w-3.5 h-3.5" />
                  {tierBadge.text}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{note.title}</h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#b0b0b0]">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {note.readTime} read
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(note.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 text-xs bg-[#2a2a2a] 
                             text-[#b0b0b0] rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Video Link */}
            {note.videoUrl && (
              <div className="mb-8 p-4 bg-[#2a2a2a] border border-[#404040] rounded-xl 
                            hover:border-red-500/50 transition-colors">
                <Link
                  to={note.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#b0b0b0]">Watch the video explanation</p>
                    <p className="text-white font-medium">View on YouTube</p>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-[#b0b0b0] rotate-180" />
                </Link>
              </div>
            )}

            {/* Content with Paywall */}
            {note.tier === 'free' ? (
              // Free content - show everything
              <div className="prose prose-invert prose-lg max-w-none">
                {renderContent(note.content)}
              </div>
            ) : (
              // Premium content - use paywall
              <Paywall 
                requiredTier={note.tier}
                preview={
                  previewContent ? (
                    <div className="prose prose-invert prose-lg max-w-none">
                      {previewContent}
                    </div>
                  ) : undefined
                }
              >
                <div className="prose prose-invert prose-lg max-w-none">
                  {renderContent(note.content)}
                </div>
              </Paywall>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Actions */}
              <div className="bg-[#2a2a2a] border border-[#404040] rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      isBookmarked
                        ? 'bg-[#d4a373]/20 text-[#d4a373]'
                        : 'bg-[#1a1a1a] text-[#b0b0b0] hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg 
                             bg-[#1a1a1a] text-[#b0b0b0] hover:text-white transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>

              {/* Related Categories */}
              <div className="bg-[#2a2a2a] border border-[#404040] rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Related Topics</h3>
                <div className="space-y-2">
                  {categories
                    .filter((c) => c.id !== note.category)
                    .slice(0, 4)
                    .map((category) => (
                      <Link
                        key={category.id}
                        to={`/notes?category=${category.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1a1a] 
                                 transition-colors group"
                      >
                        <span className="text-lg text-[#d4a373]">{category.icon}</span>
                        <span className="text-sm text-[#b0b0b0] group-hover:text-white transition-colors">
                          {category.name}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
