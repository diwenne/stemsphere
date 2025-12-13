# Migration Plan: React (Vite) to Next.js + shadcn/ui + Aceternity UI

## Objective
Migrate the existing `landing` site to a new Next.js application (`landing-v2`). The goal is to modernize the UI with "fancy" components (Aceternity UI, shadcn/ui) while strictly preserving all existing content, branding, colors, and assets.

## 1. Project Initialization
- [ ] Create new Next.js project: `npx create-next-app@latest landing-v2 --typescript --tailwind --eslint`
- [ ] Install dependencies:
    - `shadcn-ui` CLI
    - `framer-motion`
    - `clsx`, `tailwind-merge`
    - `lucide-react`
    - Aceternity UI components (will install as needed)

## 2. Asset & Style Migration
- [ ] **Assets:** Copy `landing/public/*` to `landing-v2/public/*`.
- [ ] **Fonts:** Configure `Inter` font in `app/layout.tsx`.
- [ ] **Colors:** Port CSS variables from `landing/src/index.css` to `landing-v2/src/app/globals.css` (or Tailwind config).
    - Accent Green: `#10B981`
    - Background: `#fcfdff`
    - Text Primary: `#1e293b`
    - Text Secondary: `#64748b`
    - Grid Pattern: Implement as a Tailwind utility or CSS class.

## 3. Component Strategy (The "Fancy" Upgrade)
We will replace standard HTML/CSS components with premium versions while keeping the same text.

| Current Component | New "Fancy" Component (Aceternity/shadcn) |
|-------------------|-------------------------------------------|
| **Hero Section**  | **Background Beams** or **Hero Parallax** |
| **Navbar**        | **Floating Navbar** (Aceternity) or Custom Sticky Header |
| **Benefits/Impact**| **Bento Grid** or **Hover Effect Cards** |
| **Carousel**      | **Infinite Moving Cards** or **Parallax Scroll** |
| **Team/About**    | **Animated Tooltip** or **Direction Aware Hover** |
| **Buttons**       | **Shimmer Button** or **Moving Border Button** |

## 4. Implementation Steps

### Phase 1: Setup
- [ ] Initialize `landing-v2`.
- [ ] Configure Tailwind with custom colors.
- [ ] Set up `utils.ts` (cn helper).

### Phase 2: Core Layout
- [ ] Create `components/ui/navbar.tsx` (Migrate links: Home, About, Gallery, Get Involved, Donate).
- [ ] Create `components/ui/footer.tsx` (Migrate links and copyright).
- [ ] Create `app/layout.tsx` wrapper.

### Phase 3: Page Migration
- [ ] **Home Page (`app/page.tsx`)**
    - Hero: Use "Background Beams" with existing title/subtitle.
    - Impact Stats: Use `CountUp` or simple animated numbers.
    - Benefits: Use "Hover Effect" cards.
- [ ] **About Page (`app/about/page.tsx`)**
    - Mission/Vision: Clean typography layouts.
    - Team: "Animated Tooltip" for leadership cards.
- [ ] **Gallery Page (`app/gallery/page.tsx`)**
    - Use "Parallax Scroll" or "Layout Grid" for the photos.
- [ ] **Get Involved (`app/get-involved/page.tsx`)**
    - Keep form/content, wrap in a nice container.
- [ ] **Donate (`app/donate/page.tsx`)**
    - Keep donation logic/links.

### Phase 4: Verification
- [ ] Verify all text matches the original.
- [ ] Verify all links work.
- [ ] Verify mobile responsiveness.

## 5. Execution Order
1.  Initialize Project
2.  Setup Styles & Assets
3.  Build Layout (Nav/Footer)
4.  Build Home Page
5.  Build Gallery Page
6.  Build About/Donate/Get Involved
