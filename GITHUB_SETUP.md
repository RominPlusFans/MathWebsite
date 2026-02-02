# GitHub Pages Setup Guide

This guide will walk you through deploying MathNotes to GitHub Pages.

## Quick Start (Recommended)

### Step 1: Run the Setup Script

```bash
bash setup-github.sh
```

This interactive script will:
- Initialize Git (if needed)
- Ask for your GitHub username and repo name
- Configure the correct base URL
- Set up the GitHub remote

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Enter your repository name (e.g., `mathnotes`)
3. Make it **Public**
4. Don't initialize with README (we already have one)
5. Click **Create repository**

### Step 3: Push Your Code

```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Build and deployment** → **Source**
4. Select **GitHub Actions**
5. The workflow will automatically run and deploy your site

### Step 5: View Your Site

Your site will be available at:
- **Project Page**: `https://YOUR_USERNAME.github.io/mathnotes/`
- **User Page**: `https://YOUR_USERNAME.github.io/`

## Manual Setup (If You Prefer)

### 1. Configure vite.config.ts

For **Project Pages** (most common):
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

For **User Pages** (username.github.io):
```typescript
export default defineConfig({
  base: '/',
  // ...
});
```

### 2. Update package.json

```json
{
  "homepage": "https://yourusername.github.io/your-repo-name"
}
```

### 3. Install gh-pages (optional, for manual deploy)

```bash
npm install --save-dev gh-pages
```

Add to package.json scripts:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

### 4. Deploy Manually

```bash
npm run build
npm run deploy
```

## Understanding the Deployment

### Automatic Deployment (GitHub Actions)

The `.github/workflows/deploy.yml` file configures automatic deployment:

- **Triggers**: Every push to `main` branch
- **Build**: Runs `npm run build`
- **Deploy**: Publishes `dist/` folder to GitHub Pages

### File Structure for GitHub Pages

```
.github/
└── workflows/
    └── deploy.yml          # GitHub Actions workflow
public/                      # Static assets (copied to dist)
src/
└── ...                      # Source code
dist/                        # Build output (deployed)
```

## Troubleshooting

### 404 Errors

**Problem**: Site shows 404 or blank page

**Solutions**:
1. Check `vite.config.ts` base URL matches your repo name
2. Ensure GitHub Pages is enabled in Settings
3. Wait 2-3 minutes for deployment to complete
4. Check Actions tab for build errors

### Assets Not Loading

**Problem**: CSS/JS files return 404

**Solution**: The `base` URL in vite.config.ts must match your repository name exactly:
```typescript
// For repo "mathnotes"
base: '/mathnotes/',

// For user page "username.github.io"
base: '/',
```

### Build Fails

**Problem**: GitHub Actions build fails

**Solutions**:
1. Check the Actions tab for error logs
2. Ensure all dependencies are in `package.json`
3. Test locally: `npm run build`

### React Router Issues

**Problem**: Refreshing page shows 404

**Solution**: GitHub Pages doesn't support client-side routing by default. Add a `404.html` that redirects to `index.html`:

```html
<!-- public/404.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=./index.html">
  </head>
</html>
```

## Custom Domain (Optional)

To use your own domain:

1. Add a `CNAME` file in the `public/` folder:
   ```
   echo "yourdomain.com" > public/CNAME
   ```

2. Configure DNS:
   - **A Record**: Point to GitHub Pages IPs
   - **CNAME**: Point `www` to `yourusername.github.io`

3. Enable in GitHub Settings → Pages → Custom domain

## Updating Your Site

After making changes:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

GitHub Actions will automatically rebuild and deploy!

## Local Testing Before Deploy

Always test locally first:

```bash
npm run build
npm run preview
```

This serves the production build locally at `http://localhost:4173`

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [React Router on GH Pages](https://create-react-app.dev/docs/deployment/#github-pages)
