#!/bin/bash

# MathNotes GitHub Setup Script
# This script helps you set up the project for GitHub Pages deployment

echo "🚀 MathNotes GitHub Setup"
echo "=========================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
else
    echo "✅ Git repository already initialized"
fi

# Get GitHub username
echo ""
read -p "Enter your GitHub username: " USERNAME

# Get repository name
read -p "Enter your repository name (default: mathnotes): " REPO_NAME
REPO_NAME=${REPO_NAME:-mathnotes}

# Update package.json with correct homepage
echo ""
echo "📝 Updating configuration files..."
sed -i "s|YOUR_USERNAME|$USERNAME|g" package.json
sed -i "s|mathnotes|$REPO_NAME|g" package.json

# Update vite.config.ts for project pages (if needed)
echo ""
read -p "Is this a GitHub User Page (username.github.io)? (y/N): " IS_USER_PAGE

if [[ $IS_USER_PAGE =~ ^[Yy]$ ]]; then
    echo "✅ Using base: '/' for user page"
    sed -i "s|base: './'|base: '/'|g" vite.config.ts
else
    echo "✅ Using base: '/$REPO_NAME/' for project page"
    sed -i "s|base: './'|base: '/$REPO_NAME/'|g" vite.config.ts
fi

# Update README with username
sed -i "s|YOUR_USERNAME|$USERNAME|g" README.md
sed -i "s|mathnotes|$REPO_NAME|g" README.md

# Add remote
echo ""
echo "🔗 Adding GitHub remote..."
git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git" 2>/dev/null || echo "Remote already exists"

# Install gh-pages if not already installed
echo ""
echo "📥 Installing gh-pages for manual deployment..."
npm list gh-pages >/dev/null 2>&1 || npm install --save-dev gh-pages

echo ""
echo "=========================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Create a repository on GitHub: https://github.com/new"
echo "   Name: $REPO_NAME"
echo "   Make it public"
echo ""
echo "2. Push your code:"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to https://github.com/$USERNAME/$REPO_NAME/settings/pages"
echo "   - Under 'Source', select 'GitHub Actions'"
echo ""
echo "4. Your site will be live at:"
if [[ $IS_USER_PAGE =~ ^[Yy]$ ]]; then
    echo "   https://$USERNAME.github.io/"
else
    echo "   https://$USERNAME.github.io/$REPO_NAME/"
fi
echo ""
echo "🎉 Happy teaching!"
