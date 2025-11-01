# MusicStream 🎵

A modern music-streaming web app built with Next.js (App Router), TypeScript, Redux Toolkit, TanStack Query & shadcn/ui.  
Enjoy a clean, responsive UI, seamless data fetching, and a persistent global music-player across routes.

---

## 🚀 Features

- **Home Screen**: Displays Trending Songs, Popular Artists & New Releases with skeleton loading states.  
- **Global Music Player**: Persistent footer bar across all pages: shows album art, track info, play/pause/next/prev controls & seek-bar.  
- **Responsive Design**: 1-column on mobile, 2 on tablet, 3-4 on desktop, fully styled with Tailwind CSS & shadcn/ui.  
- **Smooth Data Handling**: Uses TanStack Query for fetching/caching, Redux Toolkit for player state, and dark/light mode toggle.

---

## 🧰 Project Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/musicstream.git
cd musicstream

# 2. Install dependencies
npm install
# or
yarn install
# or
pnpm install

# 3. Start development server
npm run dev
# or
yarn dev
# or
pnpm dev