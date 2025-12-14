# Stemsphere Blog - Planning Document

## Overview
A blog platform for the Stemsphere Foundation to share STEM education content, workshop recaps, student spotlights, and educational tutorials.

**URL**: blog.stemsf.org

---

## Tech Stack
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Aceternity UI
- **Content**: MDX for blog posts
- **Deployment**: Vercel

---

## Features

### Phase 1 - MVP
- [ ] Homepage with blog post list
- [ ] Individual blog post pages
- [ ] Categories/tags filtering
- [ ] Dark mode support
- [ ] Responsive design
- [ ] SEO optimized

### Phase 2 - Enhanced
- [ ] Search functionality
- [ ] Newsletter signup
- [ ] Author profiles
- [ ] Related posts
- [ ] Reading time estimation
- [ ] Social sharing buttons

### Phase 3 - Advanced
- [ ] Comments system (Giscus/Discord integration)
- [ ] View count tracking
- [ ] RSS feed
- [ ] CMS integration (optional: Contentlayer, Sanity, or Notion)

---

## Content Categories
1. **Workshop Recaps** - Highlights and photos from events
2. **Student Spotlights** - Feature students who've benefited
3. **STEM Tutorials** - Educational guides and how-tos
4. **Chapter News** - Updates from different chapters
5. **Career Insights** - Interviews with STEM professionals
6. **Announcements** - Foundation news and updates

---

## Design Guidelines
- Match the main Stemsphere site aesthetic
- Primary color: Emerald (#10B981)
- Clean, modern typography (Inter font)
- Card-based layout for blog posts
- Animated transitions using Framer Motion

---

## File Structure
```
blog/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Homepage with post list
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   ├── [slug]/
│   │   │   └── page.tsx      # Individual post page
│   │   └── category/
│   │       └── [category]/
│   │           └── page.tsx  # Category filtered posts
│   ├── components/
│   │   ├── ui/               # shadcn components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── post-card.tsx
│   │   └── mdx-components.tsx
│   ├── content/
│   │   └── posts/            # MDX blog posts
│   └── lib/
│       ├── utils.ts
│       └── posts.ts          # Post fetching utilities
├── public/
│   └── images/
│       └── posts/            # Blog post images
└── PLANNING.md
```

---

## Dependencies to Install
```bash
npm install framer-motion lucide-react clsx tailwind-merge class-variance-authority
npm install @radix-ui/react-slot next-themes
npm install gray-matter next-mdx-remote
```

---

## Deployment Notes
1. Deploy to Vercel
2. Set custom domain: blog.stemsf.org
3. Configure DNS CNAME record pointing to Vercel

---

## Timeline
- **Week 1**: Setup project, basic layout, homepage
- **Week 2**: Blog post pages, MDX integration
- **Week 3**: Categories, search, polish
- **Week 4**: Testing, SEO, launch
