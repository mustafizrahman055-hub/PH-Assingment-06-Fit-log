# FitLog - Workout Tracker

A fitness tracking web app I built as part of my Programming Hero Batch 14 assignment. It lets you browse workouts, build a daily plan, and save exercises for later.

## 🔗 Links
- **Live Site**: https://ph-assingment-06-fit-log.vercel.app/
- **GitHub Repo**: https://github.com/mustafizrahman055-hub/PH-Assingment-06-Fit-log

## Tech I used
- **Next.js** (App Router) — for the pages and routing
- **React** — component based UI
- **Tailwind CSS** — styling everything
- **Lucide React** — icons
- **React Hot Toast** — notifications when you add/remove workouts
- **LocalStorage** — so your plan saves even when you close the tab

## Features
1. **Workout Library** — browse 12 exercises fetched from a live API, each with image, category, equipment info and stats
2. **Add to Plan / Save for Later** — click any workout detail page and add it to your daily plan or save it
3. **5 Workout Limit** — today's plan caps at 5 lifts, you get a toast if you try to add more
4. **My Plan Page** — see your exercises, total minutes and calories at a glance. mark workouts done or remove them
5. **Sort Workouts** — sort the library or your plan by duration, calories burned or rating

## How to run locally

```bash
npm install
npm run dev
```

open http://localhost:3000
