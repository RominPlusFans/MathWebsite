import type { UserTier } from '@/contexts/AuthContext';

export interface Note {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
  videoUrl?: string;
  tier: UserTier; // Minimum tier required to access full content
  previewLength?: number; // Number of paragraphs to show as preview
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
  category: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  noteCount: number;
}

export const categories: Category[] = [
  {
    id: 'calculus',
    name: 'Calculus',
    description: 'Limits, derivatives, integrals, and infinite series',
    icon: '∫',
    noteCount: 12,
  },
  {
    id: 'linear-algebra',
    name: 'Linear Algebra',
    description: 'Vectors, matrices, transformations, and eigenvalues',
    icon: '𝐴',
    noteCount: 8,
  },
  {
    id: 'differential-equations',
    name: 'Differential Equations',
    description: 'ODEs, PDEs, and dynamical systems',
    icon: '∂',
    noteCount: 6,
  },
  {
    id: 'probability-statistics',
    name: 'Probability & Statistics',
    description: 'Random variables, distributions, and inference',
    icon: '𝑃',
    noteCount: 10,
  },
  {
    id: 'abstract-algebra',
    name: 'Abstract Algebra',
    description: 'Groups, rings, fields, and Galois theory',
    icon: '𝔾',
    noteCount: 5,
  },
  {
    id: 'real-analysis',
    name: 'Real Analysis',
    description: 'Measure theory, convergence, and continuity',
    icon: 'ℝ',
    noteCount: 7,
  },
];

export const notes: Note[] = [
  {
    id: 'fundamental-theorem-calculus',
    title: 'The Fundamental Theorem of Calculus',
    excerpt: 'Understanding the profound connection between differentiation and integration.',
    category: 'calculus',
    readTime: '15 min',
    date: '2024-01-15',
    tags: ['calculus', 'integration', 'differentiation', 'theorems'],
    videoUrl: 'https://youtube.com/watch?v=example1',
    tier: 'free',
    previewLength: 0,
    content: `
# The Fundamental Theorem of Calculus

The Fundamental Theorem of Calculus is one of the most important results in all of mathematics. It establishes the relationship between differentiation and integration, showing that they are essentially inverse operations.

## Part 1: The Derivative of an Integral

If $f$ is continuous on $[a, b]$, then the function $F$ defined by:

$$F(x) = \\int_a^x f(t) \\, dt$$

is continuous on $[a, b]$, differentiable on $(a, b)$, and:

$$F'(x) = f(x)$$

This tells us that differentiation "undoes" integration.

## Part 2: Evaluation Theorem

If $f$ is continuous on $[a, b]$ and $F$ is any antiderivative of $f$, then:

$$\\int_a^b f(x) \\, dx = F(b) - F(a)$$

## Example

Let's evaluate $\\int_0^1 x^2 \\, dx$:

Since $F(x) = \\frac{x^3}{3}$ is an antiderivative of $f(x) = x^2$:

$$\\int_0^1 x^2 \\, dx = \\left[\\frac{x^3}{3}\\right]_0^1 = \\frac{1}{3} - 0 = \\frac{1}{3}$$

## Significance

This theorem revolutionized calculus by showing that:
- Definite integrals can be evaluated using antiderivatives
- The seemingly unrelated processes of differentiation and integration are intimately connected
- Area problems can be solved without taking limits of Riemann sums
    `,
  },
  {
    id: 'eigenvalues-eigenvectors',
    title: 'Eigenvalues and Eigenvectors Explained',
    excerpt: 'A geometric and algebraic exploration of eigenvalues and eigenvectors.',
    category: 'linear-algebra',
    readTime: '12 min',
    date: '2024-01-12',
    tags: ['linear-algebra', 'eigenvalues', 'eigenvectors', 'matrices'],
    videoUrl: 'https://youtube.com/watch?v=example2',
    tier: 'free',
    previewLength: 0,
    content: `
# Eigenvalues and Eigenvectors

Eigenvalues and eigenvectors are fundamental concepts in linear algebra with applications across physics, engineering, computer science, and data analysis.

## Definition

For a square matrix $A$, a non-zero vector $\\mathbf{v}$ is an **eigenvector** if:

$$A\\mathbf{v} = \\lambda \\mathbf{v}$$

where $\\lambda$ is the **eigenvalue** associated with $\\mathbf{v}$.

## Geometric Interpretation

An eigenvector is a vector that, when transformed by $A$, only changes in magnitude (not direction). The eigenvalue tells us by how much the vector is scaled.

## Finding Eigenvalues

To find eigenvalues, we solve the **characteristic equation**:

$$\\det(A - \\lambda I) = 0$$

For a $2 \\times 2$ matrix $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$:

$$\\det\\begin{pmatrix} a-\\lambda & b \\\\ c & d-\\lambda \\end{pmatrix} = (a-\\lambda)(d-\\lambda) - bc = 0$$

## Example

Find the eigenvalues of $A = \\begin{pmatrix} 4 & 2 \\\\ 1 & 3 \\end{pmatrix}$:

$$\\det\\begin{pmatrix} 4-\\lambda & 2 \\\\ 1 & 3-\\lambda \\end{pmatrix} = (4-\\lambda)(3-\\lambda) - 2 = 0$$

$$\\lambda^2 - 7\\lambda + 10 = 0$$

$$(\\lambda - 5)(\\lambda - 2) = 0$$

So $\\lambda_1 = 5$ and $\\lambda_2 = 2$.

## Applications

- **Principal Component Analysis (PCA)**: Dimensionality reduction
- **Quantum Mechanics**: Energy states of systems
- **PageRank**: Google's original ranking algorithm
- **Vibration Analysis**: Natural frequencies of mechanical systems
    `,
  },
  {
    id: 'second-order-odes',
    title: 'Solving Second-Order ODEs',
    excerpt: 'Techniques for solving linear second-order ordinary differential equations.',
    category: 'differential-equations',
    readTime: '18 min',
    date: '2024-01-10',
    tags: ['differential-equations', 'ODE', 'second-order', 'characteristic-equation'],
    videoUrl: 'https://youtube.com/watch?v=example3',
    tier: 'supporter',
    previewLength: 3,
    content: `
# Solving Second-Order Linear ODEs

Second-order linear ordinary differential equations appear throughout physics and engineering, describing oscillations, circuits, and mechanical systems.

## Standard Form

$$ay'' + by' + cy = 0$$

where $a$, $b$, and $c$ are constants.

## The Characteristic Equation

We look for solutions of the form $y = e^{rx}$. Substituting:

$$ar^2e^{rx} + bre^{rx} + ce^{rx} = 0$$

$$e^{rx}(ar^2 + br + c) = 0$$

This gives the **characteristic equation**:

$$ar^2 + br + c = 0$$

## Three Cases

### Case 1: Distinct Real Roots ($b^2 - 4ac > 0$)

If $r_1$ and $r_2$ are distinct real roots:

$$y = c_1e^{r_1x} + c_2e^{r_2x}$$

### Case 2: Repeated Real Root ($b^2 - 4ac = 0$)

If $r$ is a repeated root:

$$y = (c_1 + c_2x)e^{rx}$$

### Case 3: Complex Roots ($b^2 - 4ac < 0$)

If $r = \\alpha \\pm \\beta i$:

$$y = e^{\\alpha x}(c_1\\cos(\\beta x) + c_2\\sin(\\beta x))$$

## Example: Harmonic Oscillator

Solve $y'' + 4y = 0$ with $y(0) = 1$ and $y'(0) = 0$.

Characteristic equation: $r^2 + 4 = 0$, so $r = \\pm 2i$

General solution: $y = c_1\\cos(2x) + c_2\\sin(2x)$

Applying initial conditions:
- $y(0) = c_1 = 1$
- $y'(0) = 2c_2 = 0$, so $c_2 = 0$

Final solution: $y = \\cos(2x)$
    `,
  },
  {
    id: 'central-limit-theorem',
    title: 'The Central Limit Theorem',
    excerpt: 'Why the normal distribution appears everywhere in nature and statistics.',
    category: 'probability-statistics',
    readTime: '10 min',
    date: '2024-01-08',
    tags: ['statistics', 'probability', 'normal-distribution', 'CLT'],
    videoUrl: 'https://youtube.com/watch?v=example4',
    tier: 'free',
    previewLength: 0,
    content: `
# The Central Limit Theorem

The Central Limit Theorem (CLT) is one of the most remarkable results in probability theory, explaining why the normal distribution appears so frequently in nature.

## Statement

Let $X_1, X_2, \\ldots, X_n$ be independent and identically distributed random variables with mean $\\mu$ and variance $\\sigma^2$. Then as $n \\to \\infty$:

$$\\frac{\\bar{X} - \\mu}{\\sigma/\\sqrt{n}} \\xrightarrow{d} N(0, 1)$$

where $\\bar{X} = \\frac{1}{n}\\sum_{i=1}^n X_i$.

## In Plain Language

The sum (or average) of a large number of independent random variables will be approximately normally distributed, **regardless of the underlying distribution**.

## Why This Matters

1. **Universality**: Many natural phenomena result from the sum of many small effects
2. **Statistical Inference**: Justifies using normal-based methods for large samples
3. **Practical Computation**: Normal distributions are mathematically tractable

## Visualizing the CLT

Even if we start with a highly non-normal distribution (like uniform or exponential), the distribution of sample means approaches a bell curve as sample size increases.

## Applications

- **Quality Control**: Monitoring manufacturing processes
- **Polling**: Estimating population proportions
- **Finance**: Modeling returns as sums of many small factors
- **Error Analysis**: Measurement errors are often normally distributed

## The Mathematical Beauty

$$\\lim_{n \\to \\infty} P\\left(\\frac{\\sum_{i=1}^n X_i - n\\mu}{\\sigma\\sqrt{n}} \\leq x\\right) = \\Phi(x)$$

where $\\Phi(x)$ is the standard normal CDF.
    `,
  },
  {
    id: 'group-homomorphisms',
    title: 'Group Homomorphisms',
    excerpt: 'Structure-preserving maps between groups and their properties.',
    category: 'abstract-algebra',
    readTime: '14 min',
    date: '2024-01-05',
    tags: ['abstract-algebra', 'groups', 'homomorphisms', 'isomorphisms'],
    videoUrl: 'https://youtube.com/watch?v=example5',
    tier: 'premium',
    previewLength: 2,
    content: `
# Group Homomorphisms

Group homomorphisms are structure-preserving maps between groups, forming the foundation of abstract algebra's power to relate different algebraic structures.

## Definition

Let $(G, \\cdot)$ and $(H, \\star)$ be groups. A function $\\phi: G \\to H$ is a **homomorphism** if:

$$\\phi(a \\cdot b) = \\phi(a) \\star \\phi(b)$$

for all $a, b \\in G$.

## Key Properties

1. $\\phi(e_G) = e_H$ (identity maps to identity)
2. $\\phi(a^{-1}) = \\phi(a)^{-1}$ (inverses are preserved)
3. $\\phi(a^n) = \\phi(a)^n$ for all integers $n$

## Kernel and Image

**Kernel**: $\\ker(\\phi) = \\{g \\in G : \\phi(g) = e_H\\}$

**Image**: $\\text{Im}(\\phi) = \\{\\phi(g) : g \\in G\\}$

The kernel is always a normal subgroup of $G$, and the image is a subgroup of $H$.

## Types of Homomorphisms

- **Monomorphism**: Injective (one-to-one) homomorphism
- **Epimorphism**: Surjective (onto) homomorphism
- **Isomorphism**: Bijective homomorphism (groups are "the same")
- **Endomorphism**: Homomorphism from a group to itself
- **Automorphism**: Isomorphism from a group to itself

## The First Isomorphism Theorem

$$G/\\ker(\\phi) \\cong \\text{Im}(\\phi)$$

This fundamental result shows that every homomorphism factors through a quotient.

## Example

The map $\\phi: (\\mathbb{Z}, +) \\to (\\mathbb{Z}_n, +_n)$ defined by $\\phi(k) = k \\mod n$ is a homomorphism.

- $\\ker(\\phi) = n\\mathbb{Z}$ (multiples of $n$)
- $\\text{Im}(\\phi) = \\mathbb{Z}_n$
- By the First Isomorphism Theorem: $\\mathbb{Z}/n\\mathbb{Z} \\cong \\mathbb{Z}_n$
    `,
  },
  {
    id: 'uniform-convergence',
    title: 'Uniform Convergence',
    excerpt: 'The difference between pointwise and uniform convergence of functions.',
    category: 'real-analysis',
    readTime: '16 min',
    date: '2024-01-03',
    tags: ['real-analysis', 'convergence', 'uniform-convergence', 'continuity'],
    videoUrl: 'https://youtube.com/watch?v=example6',
    tier: 'supporter',
    previewLength: 3,
    content: `
# Uniform Convergence

Uniform convergence is a stronger form of convergence than pointwise convergence, preserving important properties like continuity and integrability.

## Pointwise vs. Uniform Convergence

**Pointwise**: For each $x$, $f_n(x) \\to f(x)$ as $n \\to \\infty$.

**Uniform**: $\\sup_{x} |f_n(x) - f(x)| \\to 0$ as $n \\to \\infty$.

## Epsilon-Delta Definitions

**Pointwise**: For each $x$ and $\\epsilon > 0$, there exists $N$ such that:

$$n \\geq N \\implies |f_n(x) - f(x)| < \\epsilon$$

**Uniform**: For each $\\epsilon > 0$, there exists $N$ (independent of $x$) such that:

$$n \\geq N \\implies |f_n(x) - f(x)| < \\epsilon \\text{ for all } x$$

## Key Theorems

### Continuity is Preserved

If $f_n \\to f$ uniformly and each $f_n$ is continuous, then $f$ is continuous.

### Integration is Preserved

If $f_n \\to f$ uniformly on $[a, b]$, then:

$$\\lim_{n \\to \\infty} \\int_a^b f_n(x) \\, dx = \\int_a^b f(x) \\, dx$$

### Weierstrass M-Test

If $|f_n(x)| \\leq M_n$ for all $x$ and $\\sum M_n$ converges, then $\\sum f_n$ converges uniformly.

## Classic Example

Consider $f_n(x) = x^n$ on $[0, 1]$.

- Pointwise limit: $f(x) = \\begin{cases} 0 & 0 \\leq x < 1 \\\\ 1 & x = 1 \\end{cases}$
- The convergence is **not uniform** (the limit is discontinuous)
- On $[0, a]$ where $a < 1$, convergence **is uniform**

## Importance

Uniform convergence allows us to:
- Interchange limits and integrals
- Preserve continuity through limits
- Justify term-by-term differentiation of series
    `,
  },
];

export const videos: Video[] = [
  {
    id: 'eulers-identity',
    title: 'The Beauty of Euler\'s Identity',
    description: 'Exploring why $e^{i\\pi} + 1 = 0$ is considered the most beautiful equation in mathematics.',
    duration: '18:24',
    thumbnail: 'https://img.youtube.com/vi/example1/maxresdefault.jpg',
    youtubeId: 'example1',
    category: 'calculus',
    date: '2024-01-14',
  },
  {
    id: 'complex-analysis-intro',
    title: 'Introduction to Complex Analysis',
    description: 'A gentle introduction to functions of complex variables.',
    duration: '15:30',
    thumbnail: 'https://img.youtube.com/vi/example2/maxresdefault.jpg',
    youtubeId: 'example2',
    category: 'calculus',
    date: '2024-01-11',
  },
  {
    id: 'fourier-series',
    title: 'Fourier Series Basics',
    description: 'Decomposing periodic functions into sums of sines and cosines.',
    duration: '22:15',
    thumbnail: 'https://img.youtube.com/vi/example3/maxresdefault.jpg',
    youtubeId: 'example3',
    category: 'differential-equations',
    date: '2024-01-09',
  },
  {
    id: 'riemann-hypothesis',
    title: 'The Riemann Hypothesis Explained',
    description: 'Understanding the most famous unsolved problem in mathematics.',
    duration: '25:00',
    thumbnail: 'https://img.youtube.com/vi/example4/maxresdefault.jpg',
    youtubeId: 'example4',
    category: 'real-analysis',
    date: '2024-01-07',
  },
  {
    id: 'linear-transformations-3d',
    title: 'Linear Transformations in 3D',
    description: 'Visualizing matrices as transformations of 3D space.',
    duration: '19:45',
    thumbnail: 'https://img.youtube.com/vi/example5/maxresdefault.jpg',
    youtubeId: 'example5',
    category: 'linear-algebra',
    date: '2024-01-04',
  },
];

export function getNotesByCategory(categoryId: string): Note[] {
  return notes.filter((note) => note.category === categoryId);
}

export function getNoteById(id: string): Note | undefined {
  return notes.find((note) => note.id === id);
}

export function getVideosByCategory(categoryId: string): Video[] {
  return videos.filter((video) => video.category === categoryId);
}

export function searchNotes(query: string): Note[] {
  const lowerQuery = query.toLowerCase();
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(lowerQuery) ||
      note.excerpt.toLowerCase().includes(lowerQuery) ||
      note.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
