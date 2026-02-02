import { useParams, Link, useNavigate } from 'react-router-dom';
import { videos, categories, getVideosByCategory } from '@/data/notes';
import { ArrowLeft, Clock, Calendar, Youtube, Share2, ThumbsUp, MessageSquare } from 'lucide-react';
import { useEffect } from 'react';

export function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const video = id ? videos.find((v) => v.id === id) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!video) {
    return (
      <main className="min-h-screen bg-[#1a1a1a] pt-24 pb-16">
        <div className="section-container text-center py-16">
          <h1 className="text-2xl font-bold text-white mb-4">Video Not Found</h1>
          <p className="text-[#b0b0b0] mb-8">
            The video you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/videos" className="btn-primary">
            Browse All Videos
          </Link>
        </div>
      </main>
    );
  }

  const category = categories.find((c) => c.id === video.category);
  const relatedVideos = getVideosByCategory(video.category)
    .filter((v) => v.id !== video.id)
    .slice(0, 4);

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player Placeholder */}
            <div className="relative aspect-video bg-[#2a2a2a] rounded-xl overflow-hidden mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <a
                    href={`https://youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-col items-center gap-4 group"
                  >
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center 
                                  group-hover:bg-red-500/30 group-hover:scale-110 transition-all duration-300">
                      <Youtube className="w-10 h-10 text-red-500" />
                    </div>
                    <span className="text-[#b0b0b0] group-hover:text-white transition-colors">
                      Watch on YouTube
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="mb-8">
              {/* Category */}
              <Link
                to={`/videos?category=${video.category}`}
                className="inline-block px-3 py-1 text-sm font-medium bg-[#d4a373]/10 
                         text-[#d4a373] rounded-full mb-4 hover:bg-[#d4a373]/20 transition-colors"
              >
                {category?.name || video.category}
              </Link>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{video.title}</h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#b0b0b0] mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {video.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(video.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 
                           rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  Watch on YouTube
                </a>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-[#b0b0b0] 
                                 rounded-lg hover:bg-[#404040] transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  Like
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-[#b0b0b0] 
                                 rounded-lg hover:bg-[#404040] transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
              <p className="text-[#b0b0b0] leading-relaxed">{video.description}</p>
            </div>

            {/* Comments Section Placeholder */}
            <div className="mt-8 bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-[#d4a373]" />
                <h2 className="text-lg font-semibold text-white">Comments</h2>
              </div>
              <p className="text-[#b0b0b0] text-sm">
                Join the discussion on{' '}
                <a
                  href={`https://youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4a373] hover:underline"
                >
                  YouTube
                </a>
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Related Videos */}
              <div className="bg-[#2a2a2a] border border-[#404040] rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-4">
                  More from {category?.name}
                </h3>
                <div className="space-y-4">
                  {relatedVideos.length > 0 ? (
                    relatedVideos.map((relatedVideo) => (
                      <Link
                        key={relatedVideo.id}
                        to={`/videos/${relatedVideo.id}`}
                        className="flex gap-3 group"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-24 h-14 rounded-lg bg-[#1a1a1a] flex-shrink-0 
                                      overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Youtube className="w-4 h-4 text-[#505050] group-hover:text-red-500 
                                             transition-colors" />
                          </div>
                          <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 
                                        rounded text-[10px] text-white">
                            {relatedVideo.duration}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white group-hover:text-[#d4a373] 
                                       transition-colors line-clamp-2">
                            {relatedVideo.title}
                          </h4>
                          <p className="text-xs text-[#b0b0b0] mt-1 line-clamp-1">
                            {relatedVideo.description}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-[#b0b0b0]">
                      No related videos in this category.
                    </p>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="mt-6 bg-[#2a2a2a] border border-[#404040] rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Browse Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/videos?category=${cat.id}`}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        cat.id === video.category
                          ? 'bg-[#d4a373] text-[#1a1a1a]'
                          : 'bg-[#1a1a1a] text-[#b0b0b0] hover:text-white'
                      }`}
                    >
                      {cat.name}
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
