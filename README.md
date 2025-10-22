# STEMSF Monorepo

This monorepo contains all STEMSF web applications.

## Structure

```
stemsphere/
├── landing/         # Main website (stemsf.org)
├── courses/         # Learning platform (learn.stemsf.org)
├── package.json     # Monorepo root configuration
├── .gitignore
└── VERCEL_SETUP.md  # Deployment guide
```

## Getting Started

### Install Dependencies

From the root directory:
```bash
npm install
```

### Development

Run landing page:
```bash
npm run dev:landing
```

Run courses platform:
```bash
npm run dev:courses
```

### Building

Build landing page:
```bash
npm run build:landing
```

Build courses platform:
```bash
npm run build:courses
```

Build all apps:
```bash
npm run build:all
```

## Vercel Deployment

This monorepo is deployed to Vercel with two separate projects:

### Landing Page (stemsf.org)
- **Root Directory**: `landing`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Domain**: stemsf.org

### Courses Platform (learn.stemsf.org)
- **Root Directory**: `courses`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Domain**: learn.stemsf.org

### Setting up on Vercel

1. **Import the repository** to Vercel (only once)

2. **Create first project (Landing Page)**:
   - Project name: `stemsf-landing`
   - Framework Preset: Vite
   - Root Directory: `landing`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Create second project (Courses)**:
   - Go to Vercel dashboard → Add New Project
   - Select the same repository
   - Project name: `stemsf-courses`
   - Framework Preset: Vite
   - Root Directory: `courses`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Configure Domains**:
   - In `stemsf-landing` project: Add domain `stemsf.org`
   - In `stemsf-courses` project: Add domain `learn.stemsf.org`

5. **DNS Configuration**:
   - For `stemsf.org`: Point A record to Vercel IP or CNAME to `cname.vercel-dns.com`
   - For `learn.stemsf.org`: Add CNAME record pointing to `cname.vercel-dns.com`

## Development Workflow

1. Make changes in respective app directories
2. Test locally with `npm run dev:landing` or `npm run dev:courses`
3. Commit and push to main branch
4. Vercel will automatically deploy both projects
