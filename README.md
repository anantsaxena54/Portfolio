# Anant Saxena — Angular 18 Portfolio

A futuristic developer portfolio built with **Angular 18** (standalone components) + **Spring Boot 3.3** backend.

---

## Project Structure

```
anant-ng-portfolio/
├── src/
│   ├── index.html
│   ├── main.ts                          ← Bootstrap (standalone API)
│   ├── styles/
│   │   └── global.scss                  ← Shared CSS variables & utilities
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── app/
│       ├── app.component.ts             ← Root component
│       ├── models/
│       │   └── portfolio.models.ts      ← TypeScript interfaces
│       ├── services/
│       │   ├── portfolio.service.ts     ← Data + HTTP API calls
│       │   └── three-scene.service.ts   ← Three.js 3D engine
│       └── components/
│           ├── cursor/                  ← Custom animated cursor
│           ├── navbar/                  ← Sticky nav with active tracking
│           ├── hero/                    ← Typewriter + 3D canvas init
│           ├── about/                   ← Bio + animated stat cards
│           ├── skills/                  ← Orb grid + scroll-animated bars
│           ├── experience/              ← Expandable timeline
│           ├── projects/                ← Project cards with 3D hover
│           ├── contact/                 ← Form + Spring Boot API
│           └── footer/
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
ng serve
# → http://localhost:4200
```

### 3. Build for production
```bash
ng build
# Output in /dist/anant-portfolio
```

---

## Backend (Spring Boot)

```bash
cd ../backend   # (use the backend from anant-portfolio.zip)
mvn spring-boot:run
# → http://localhost:8080
```

### API Endpoints
| Method | Endpoint                    | Description        |
|--------|-----------------------------|--------------------|
| GET    | `/api/portfolio/profile`    | Profile data       |
| GET    | `/api/portfolio/skills`     | Skills list        |
| GET    | `/api/portfolio/experience` | Timeline entries   |
| GET    | `/api/portfolio/projects`   | Projects list      |
| POST   | `/api/contact`              | Send contact email |

---

## 3D Features (Three.js)

- **Wireframe icosahedron** — pulsing core with animated torus ring
- **Orbiting 3D shapes** — octahedra, tetrahedra, cubes orbiting the core
- **2200-particle field** — purple/teal/pink particles drifting through space
- **Orbit rings** — 3 rotating holographic rings
- **Data streams** — vertical falling light streams
- **Holographic grid** — subtle background grid
- **Mouse parallax** — entire scene tracks cursor movement

---

## Tech Stack

| Layer     | Tech                                        |
|-----------|---------------------------------------------|
| Frontend  | Angular 18, TypeScript, SCSS                |
| 3D        | Three.js r128                               |
| Animation | CSS animations, IntersectionObserver        |
| Fonts     | Syne (headings), DM Mono (code), Outfit     |
| Backend   | Spring Boot 3.3, Java 21, Maven             |
| Email     | JavaMailSender (Gmail SMTP)                 |

---

## To add your photo

Replace the `<div class="photo-initials">AS</div>` in `about.component.html` with:
```html
<img class="profile-image" src="assets/images/anant.jpg" alt="Anant Saxena" />
```

And add to `about.component.scss`:
```scss
.profile-image { width: 100%; height: 100%; object-fit: cover; border-radius: 14px; }
```
