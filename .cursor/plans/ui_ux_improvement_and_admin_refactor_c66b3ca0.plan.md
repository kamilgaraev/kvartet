---
name: UI/UX Improvement and Admin Refactor
overview: Refactor the Hero section with interactive elements, improve the Services menu with visual cards, and modernize the Admin panel (Portfolio/Blog) with shadcn-like UI, bulk actions, and SEO tools.
todos:
  - id: setup-ui
    content: Create src/lib/utils.ts and base UI components
    status: completed
  - id: refactor-hero
    content: Refactor Hero section with 3D/Parallax visual
    status: completed
    dependencies:
      - setup-ui
  - id: refactor-menu
    content: Implement Visual Services Mega Menu in Header
    status: completed
    dependencies:
      - setup-ui
  - id: admin-portfolio-list
    content: Refactor Admin Portfolio Page (Table, Bulk Actions)
    status: completed
    dependencies:
      - setup-ui
  - id: admin-portfolio-editor
    content: Refactor Admin Portfolio Editor (SEO, DnD)
    status: completed
    dependencies:
      - admin-portfolio-list
  - id: admin-blog
    content: Refactor Admin Blog Page
    status: completed
    dependencies:
      - setup-ui
---

