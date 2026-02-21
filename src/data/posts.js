export const posts = [
  {
    id: 1,
    slug: "glassmorphism-ui-for-beginners",
    title: "Glassmorphism UI for Beginners",
    excerpt: "Learn the modern glass look: blur, translucency, and depth—done right.",
    content: `
### What is glassmorphism?
Glassmorphism is a UI style using **blurred backgrounds**, **transparent surfaces**, and **soft highlights**.

### Key rules
- Use subtle blur (too much looks messy)
- Keep contrast readable
- Add gentle borders + shadows

### Quick tip
Always test text readability on mobile.
`,
    date: "2026-02-18",
    tags: ["Design", "UI"],
    readTime: "5 min",
    cover: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    slug: "vue-router-blog-layout",
    title: "Build a Blog Layout with Vue Router",
    excerpt: "Routes, layouts, scroll behavior, and a clean structure for a real blog.",
    content: `
### Why Vue Router?
It gives you clean navigation and proper URLs for blog details.

### Recommended structure
- pages/
- components/
- data/

### Best practice
Add scrollBehavior so new pages start at top.
`,
    date: "2026-02-15",
    tags: ["Vue", "Routing"],
    readTime: "6 min",
    cover: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    slug: "make-your-site-feel-premium",
    title: "Make Your Site Feel Premium",
    excerpt: "Spacing, typography, gradients, and micro-interactions that feel expensive.",
    content: `
### Premium feel checklist
- Bigger spacing
- Fewer colors (use one strong primary)
- Smooth hover transitions
- Consistent border radius

### Bonus
Use subtle background patterns (very low opacity).
`,
    date: "2026-02-10",
    tags: ["UX", "Design"],
    readTime: "4 min",
    cover: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 4,
    slug: "responsive-hero-sections",
    title: "Responsive Hero Sections That Convert",
    excerpt: "A hero that looks amazing on mobile and desktop, without complicated code.",
    content: `
### Hero essentials
- Clear headline
- One primary action
- Supporting short paragraph
- Visual that doesn't break on mobile
`,
    date: "2026-02-05",
    tags: ["UI", "Responsive"],
    readTime: "5 min",
    cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80",
  },
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getRecentPosts(limit = 3) {
  return [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}
