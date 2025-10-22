# Vercel Setup Guide

This guide will help you deploy both websites from this monorepo to Vercel.

## Overview

You'll create **two separate Vercel projects** from the same repository:
- `stemsf-landing` → stemsf.org
- `stemsf-courses` → learn.stemsf.org

## Step-by-Step Setup

### 1. Push the Monorepo to GitHub

```bash
git add .
git commit -m "Convert to monorepo structure"
git push origin main
```

### 2. Create First Project (Landing Page)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your repository (authorize GitHub if needed)
4. Configure the project:

   **Framework Preset:** Vite

   **Root Directory:** `landing` (click "Edit" next to root directory)

   **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

   **Environment Variables:** (if any, add them here)

5. Click **"Deploy"**
6. Once deployed, note the URL (e.g., `stemsf-landing.vercel.app`)

### 3. Create Second Project (Courses Platform)

1. In Vercel Dashboard, click **"Add New"** → **"Project"** again
2. **Select the same repository** (important!)
3. Configure the project:

   **Framework Preset:** Vite

   **Root Directory:** `courses` (click "Edit" next to root directory)

   **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

   **Environment Variables:** (add any Supabase keys or other env vars needed)

4. Click **"Deploy"**
5. Once deployed, note the URL (e.g., `stemsf-courses.vercel.app`)

### 4. Configure Custom Domains

#### For Landing Page Project:
1. Open the `stemsf-landing` project in Vercel
2. Go to **Settings** → **Domains**
3. Add domain: `stemsf.org`
4. Vercel will show you DNS records to configure

#### For Courses Project:
1. Open the `stemsf-courses` project in Vercel
2. Go to **Settings** → **Domains**
3. Add domain: `learn.stemsf.org`
4. Vercel will show you DNS records to configure

### 5. Configure DNS (at your domain registrar)

You need to add DNS records at wherever you bought `stemsf.org`:

#### For stemsf.org (main domain):
Add an A record or CNAME:
- **Type:** A or CNAME
- **Name:** @ (or leave blank for root domain)
- **Value:** `76.76.21.21` (Vercel's IP) OR `cname.vercel-dns.com`

#### For learn.stemsf.org (subdomain):
Add a CNAME record:
- **Type:** CNAME
- **Name:** `learn`
- **Value:** `cname.vercel-dns.com`

### 6. Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours
- Check status at [DNS Checker](https://dnschecker.org/)
- Vercel will automatically provision SSL certificates once DNS is configured

## Deployment Workflow

### Automatic Deployments
- Every push to `main` branch will trigger deployments for **both** projects
- Vercel automatically detects changes in each app directory

### Manual Deployments
- You can trigger manual deploys from each project's dashboard
- Or use `vercel deploy` CLI command

### Branch Deployments
- Create a branch (e.g., `feature/new-course`)
- Push to GitHub
- Vercel creates preview deployments for both apps
- Preview URLs will be generated automatically

## Testing Locally Before Deploy

```bash
# Test landing page
npm run dev:landing

# Test courses platform
npm run dev:courses

# Build both to check for errors
npm run build:all
```

## Environment Variables

If your apps need environment variables:

1. Go to each project's **Settings** → **Environment Variables**
2. Add variables for Production, Preview, and Development
3. Redeploy if you add variables after initial deployment

### For Courses App (Supabase):
You might need:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Troubleshooting

### Build fails on Vercel
- Check the build logs in Vercel dashboard
- Test locally: `npm run build:landing` or `npm run build:courses`
- Ensure all dependencies are in package.json

### Domain not working
- Check DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Verify SSL certificate is provisioned in Vercel

### Wrong site showing on domain
- Check the root directory is set correctly in project settings
- Landing: `landing`
- Courses: `courses`

## Useful Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy landing page (from root)
cd landing && vercel --prod

# Deploy courses (from root)
cd courses && vercel --prod
```

## Project Structure in Vercel

```
Your GitHub Repo (stemsphere)
├── Vercel Project 1: stemsf-landing
│   ├── Root Directory: landing
│   └── Domain: stemsf.org
│
└── Vercel Project 2: stemsf-courses
    ├── Root Directory: courses
    └── Domain: learn.stemsf.org
```

Both projects deploy from the same repository but build from different directories.
