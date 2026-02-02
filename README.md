# MathNotes - Lecture Notes Platform

A beautiful lecture notes platform with LaTeX rendering, organized sections, YouTube video integration, and tier-based paywall monetization.

![MathNotes Screenshot](https://via.placeholder.com/800x400/1a1a1a/d4a373?text=MathNotes)

## Features

- **LaTeX Math Rendering** - Crystal-clear mathematical equations with KaTeX
- **Organized Sections** - Browse by topic (Calculus, Linear Algebra, etc.)
- **YouTube Integration** - Link video explanations to notes
- **Search & Filter** - Find content quickly
- **Paywall System** - Tier-based content access (Free, Supporter, Premium)
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Theme** - Easy on the eyes for long study sessions

## Tech Stack

- **Framework:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Math Rendering:** KaTeX
- **Routing:** React Router
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mathnotes.git
   cd mathnotes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Demo Accounts

For testing the paywall system:

| Email | Password | Tier |
|-------|----------|------|
| `free@example.com` | `password` | Free |
| `supporter@example.com` | `password` | Supporter |
| `premium@example.com` | `password` | Premium |

## Deploying to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

This repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to `main`.

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/mathnotes.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **Done!**
   - Your site will be available at `https://YOUR_USERNAME.github.io/mathnotes`
   - Every push to `main` will automatically rebuild and deploy

### Option 2: Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   # Install gh-pages if you haven't
   npm install --save-dev gh-pages
   
   # Add to package.json scripts:
   # "deploy": "gh-pages -d dist"
   
   npm run deploy
   ```

## Project Structure

```
mathnotes/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/                      # Static assets
├── src/
│   ├── components/             # Reusable components
│   │   ├── AuthModal.tsx       # Login/signup modal
│   │   ├── LatexRenderer.tsx   # KaTeX math rendering
│   │   ├── Navigation.tsx      # Top navigation
│   │   ├── Paywall.tsx         # Content paywall
│   │   └── UserMenu.tsx        # User dropdown menu
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication state
│   ├── data/
│   │   └── notes.ts            # Lecture notes data
│   ├── pages/
│   │   ├── Home.tsx            # Homepage
│   │   ├── NotesList.tsx       # Browse notes
│   │   ├── NoteDetail.tsx      # Individual note
│   │   ├── Videos.tsx          # Video library
│   │   ├── VideoDetail.tsx     # Individual video
│   │   └── Support.tsx         # Support/monetization
│   ├── sections/               # Homepage sections
│   │   ├── Hero.tsx
│   │   ├── FeaturedSections.tsx
│   │   ├── RecentNotes.tsx
│   │   ├── VideoSection.tsx
│   │   ├── LatexShowcase.tsx
│   │   ├── Monetization.tsx
│   │   └── Footer.tsx
│   ├── App.tsx                 # Main app component
│   ├── index.css               # Global styles
│   └── main.tsx                # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Customizing Content

### Adding New Notes

Edit `src/data/notes.ts`:

```typescript
{
  id: 'your-note-id',
  title: 'Your Note Title',
  excerpt: 'Brief description...',
  content: `
# Your Content

Write with markdown-style formatting:
- Use $inline math$ for equations
- Use $$display math$$ for centered equations
  `,
  category: 'calculus',  // or your category
  readTime: '10 min',
  date: '2024-01-15',
  tags: ['tag1', 'tag2'],
  videoUrl: 'https://youtube.com/watch?v=...', // optional
  tier: 'free',  // 'free' | 'supporter' | 'premium'
  previewLength: 3,  // paragraphs to show before paywall
}
```

### Setting Content Tiers

Control access to your content:

- `tier: 'free'` - Accessible to everyone
- `tier: 'supporter'` - Requires $5/month subscription
- `tier: 'premium'` - Requires $15/month subscription

### Adding Categories

Edit the `categories` array in `src/data/notes.ts`:

```typescript
{
  id: 'your-category',
  name: 'Your Category Name',
  description: 'Description...',
  icon: '∫',  // Unicode symbol
  noteCount: 0,
}
```

## Connecting Real Payments

The current implementation uses mock authentication. To connect real payments:

1. **Set up a backend** (Node.js/Express, Firebase, etc.)
2. **Integrate Stripe** for subscription management
3. **Replace mock auth** in `AuthContext.tsx` with real API calls
4. **Add webhook handlers** for subscription events

## Environment Variables

Create a `.env` file for local development:

```env
# API URL (for when you add a backend)
VITE_API_URL=http://localhost:3000

# Stripe public key (for payments)
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## Troubleshooting

### Build fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### GitHub Pages 404

- Ensure `vite.config.ts` has `base: './'` for user pages
- For project pages, use `base: '/your-repo-name/'`

### Math not rendering

- Check that KaTeX CSS is imported in `index.css`
- Verify LaTeX syntax is correct

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## License

MIT License - feel free to use this for your own lecture notes!

## Credits

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Math rendering by [KaTeX](https://katex.org/)
- Icons by [Lucide](https://lucide.dev/)

---

**Happy teaching!** 📚✨
