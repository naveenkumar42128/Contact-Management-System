# Netlify Deployment Guide

## Quick Setup

1. **Connect GitHub to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your GitHub repository

2. **Set Environment Variables** (Critical!)
   - In Netlify Dashboard → Site Settings → Environment
   - Add: `VITE_API_BASE_URL` = `https://your-backend-url.com/api`
   - Replace with your actual backend URL

3. **Verify Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - (These are set in `netlify.toml`)

## Troubleshooting 404 Errors

If you get "Page not found" errors:

- ✓ The `netlify.toml` has SPA routing rules configured
- ✓ The `public/_redirects` file handles route redirects
- Make sure VITE_API_BASE_URL environment variable is set

## Local Development

```bash
cd frontend

# Install dependencies
npm install

# Start dev server (connects to localhost:8080 backend)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

### Local Development

The `.env.local` file is used locally:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

### Production (Netlify)

Set in Netlify Site Settings:

```
VITE_API_BASE_URL=https://your-deployed-backend.com/api
```

## API Configuration

The API base URL can be set via:

1. Environment variable: `VITE_API_BASE_URL`
2. Default fallback: `/api` (if deployed with backend)

This allows:

- **Local dev**: Connect to `localhost:8080`
- **Production**: Connect to your deployed backend
