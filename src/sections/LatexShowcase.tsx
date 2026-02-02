import { useRef, useEffect, useState } from 'react';
import { LatexRenderer } from '@/components/LatexRenderer';
import { Code, Eye, Sparkles } from 'lucide-react';

const examples = [
  {
    name: 'Quadratic Formula',
    code: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    description: 'The solution to any quadratic equation',
  },
  {
    name: "Euler's Identity",
    code: 'e^{i\\pi} + 1 = 0',
    description: 'Often called the most beautiful equation in mathematics',
  },
  {
    name: 'Fundamental Theorem of Calculus',
    code: '\\int_a^b f(x)\\,dx = F(b) - F(a)',
    description: 'Connecting differentiation and integration',
  },
  {
    name: 'Gaussian Integral',
    code: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
    description: 'A classic result in analysis',
  },
];

export function LatexShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeExample, setActiveExample] = useState(0);

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
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-[#1f1f1f] to-[#1a1a1a]">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4a373]/10 
                       border border-[#d4a373]/30 mb-6 transition-all duration-700 ${
                         isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                       }`}
          >
            <Sparkles className="w-4 h-4 text-[#d4a373]" />
            <span className="text-sm text-[#d4a373] font-medium">Beautiful Math Rendering</span>
          </div>
          <h2
            className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Crystal-Clear Equations
          </h2>
          <p
            className={`text-[#b0b0b0] text-lg max-w-xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Full LaTeX support for beautiful mathematical notation
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Example Selector */}
          <div
            className={`space-y-3 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setActiveExample(index)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  activeExample === index
                    ? 'bg-[#d4a373]/10 border-[#d4a373]'
                    : 'bg-[#2a2a2a] border-[#404040] hover:border-[#505050]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4
                      className={`font-medium transition-colors ${
                        activeExample === index ? 'text-[#d4a373]' : 'text-white'
                      }`}
                    >
                      {example.name}
                    </h4>
                    <p className="text-sm text-[#b0b0b0] mt-1">{example.description}</p>
                  </div>
                  <Code
                    className={`w-5 h-5 transition-colors ${
                      activeExample === index ? 'text-[#d4a373]' : 'text-[#505050]'
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Preview Area */}
          <div
            className={`bg-[#252525] rounded-2xl border border-[#404040] overflow-hidden transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#404040]">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#b0b0b0]" />
                <span className="text-sm text-[#b0b0b0]">LaTeX Source</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#b0b0b0]" />
                <span className="text-sm text-[#b0b0b0]">Rendered</span>
              </div>
            </div>

            {/* Code Preview */}
            <div className="px-6 py-4 border-b border-[#404040] bg-[#1a1a1a]">
              <code className="text-sm text-[#b0b0b0] font-mono">
                {examples[activeExample].code}
              </code>
            </div>

            {/* Rendered Output */}
            <div className="p-8 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <LatexRenderer
                  content={examples[activeExample].code}
                  display
                  className="text-2xl md:text-3xl"
                />
                <p className="text-sm text-[#b0b0b0] mt-4">
                  {examples[activeExample].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
