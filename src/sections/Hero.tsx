import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Play } from 'lucide-react';

const floatingSymbols = ['∫', '∑', '∂', '√', 'π', '∞', '∆', '∇', '∈', '∀', '∃', 'λ'];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mathematical curve visualization
    let animationId: number;
    let time = 0;

    const draw = () => {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing mathematical curves
      const curves = [
        { amplitude: 80, frequency: 0.01, speed: 0.02, color: 'rgba(212, 163, 115, 0.15)' },
        { amplitude: 60, frequency: 0.015, speed: 0.015, color: 'rgba(212, 163, 115, 0.1)' },
        { amplitude: 100, frequency: 0.008, speed: 0.025, color: 'rgba(42, 42, 42, 0.3)' },
      ];

      curves.forEach((curve, index) => {
        ctx.beginPath();
        ctx.strokeStyle = curve.color;
        ctx.lineWidth = 2;

        for (let x = 0; x < canvas.width; x += 2) {
          const y =
            canvas.height / 2 +
            curve.amplitude * Math.sin(curve.frequency * x + time * curve.speed + index * 2) +
            curve.amplitude * 0.5 * Math.sin(curve.frequency * 2 * x - time * curve.speed * 0.5);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      time += 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Floating Mathematical Symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingSymbols.map((symbol, index) => (
          <span
            key={index}
            className="absolute text-[#d4a373]/10 text-4xl md:text-6xl font-serif select-none"
            style={{
              left: `${10 + (index * 7) % 80}%`,
              top: `${15 + (index * 11) % 70}%`,
              animation: `float ${4 + (index % 4)}s ease-in-out infinite`,
              animationDelay: `${-index * 0.5}s`,
            }}
          >
            {symbol}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 section-container text-center pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4a373]/10 border border-[#d4a373]/30 mb-8 animate-fade-in"
            style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <BookOpen className="w-4 h-4 text-[#d4a373]" />
            <span className="text-sm text-[#d4a373] font-medium">
              Master Advanced Mathematics
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {['Beautiful', 'Lecture', 'Notes', 'for', 'the', 'Curious', 'Mind'].map(
              (word, index) => (
                <span
                  key={index}
                  className="inline-block mr-3 animate-slide-up"
                  style={{
                    animationDelay: `${0.5 + index * 0.1}s`,
                    opacity: 0,
                    animationFillMode: 'forwards',
                  }}
                >
                  {word}
                </span>
              )
            )}
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-[#b0b0b0] mb-10 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: '0.9s', opacity: 0, animationFillMode: 'forwards' }}
          >
            Explore comprehensive mathematical concepts with interactive LaTeX rendering,
            video explanations, and a community of learners.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-scale-in"
            style={{ animationDelay: '1.1s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <Link to="/notes" className="btn-primary flex items-center gap-2 text-base">
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/videos"
              className="btn-secondary flex items-center gap-2 text-base"
            >
              <Play className="w-5 h-5" />
              Browse Videos
            </Link>
          </div>

          {/* Stats */}
          <div
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in"
            style={{ animationDelay: '1.5s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#d4a373]">50+</div>
              <div className="text-sm text-[#b0b0b0] mt-1">Lecture Notes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#d4a373]">6</div>
              <div className="text-sm text-[#b0b0b0] mt-1">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#d4a373]">100+</div>
              <div className="text-sm text-[#b0b0b0] mt-1">Video Hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none" />
    </section>
  );
}
