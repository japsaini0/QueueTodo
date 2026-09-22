# QueueTodo — FIFO Task Manager

A sleek, dark-themed todo app that works like a **Queue (FIFO — First In, First Out)**. Tasks are added to the back and removed from the front, just like a real queue.

![Dark Theme](https://img.shields.io/badge/Theme-Dark-1a1a26?style=flat-square)
![Vanilla JS](https://img.shields.io/badge/Built_With-Vanilla_JS-f7df1e?style=flat-square)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-22c55e?style=flat-square)

---

## ✨ Features

- **FIFO Queue** — Tasks enqueue at the back, dequeue from the front
- **Dark Premium UI** — Deep dark backgrounds, purple accent, ambient glow effects
- **Smooth Animations** — Slide-in on add, slide-out on dequeue, shake on empty input
- **Persistent Storage** — Tasks survive page refreshes via `localStorage`
- **Queue Info Bar** — Live queue size counter with a visual IN → OUT flow indicator
- **Front Highlight** — The next task to be dequeued glows with an accent border
- **Responsive** — Works on desktop and mobile screens
- **Zero Dependencies** — Pure HTML, CSS, and JavaScript

---

## 📁 Project Structure

```
QueueTodo/
├── index.html      ← Main app page (open this)
├── style.css       ← Dark theme styles & animations
├── app.js          ← FIFO queue logic & rendering
└── README.md       ← You are here
```

---

## 🚀 How to Run

1. Clone or download this repo
2. Open `index.html` in any modern browser
3. That's it — no build step, no server needed

---

## 🛠️ How It Was Built

### The Idea
A todo app where tasks behave like a **queue data structure** — the first task you add is the first one you complete and remove. No cherry-picking, no skipping ahead.

### Step-by-Step Breakdown

#### 1. HTML Structure (`index.html`)
- Built with **semantic HTML5** elements (`<header>`, `<form>`, `<ul>`)
- SVG icons are inlined (no icon library needed)
- The layout has three main sections:
  - **Header** — Logo + subtitle
  - **Input area** — A form with a text input and an add (+) button
  - **Queue info bar** — Shows queue size, a visual IN→OUT indicator, and the Dequeue button
  - **Task list** — An unordered list where tasks are rendered dynamically

#### 2. Dark Theme Styling (`style.css`)
- **Color palette** defined with CSS custom properties (variables) for easy theming
- **Ambient glow blobs** — Two large blurred gradient circles (`filter: blur(120px)`) floating behind the app with a subtle animation
- **Glassmorphic cards** — Semi-transparent dark cards with subtle borders (`rgba(255,255,255,0.06)`)
- **Animations**:
  - `slideIn` — Tasks fade + slide up when added
  - `slideOut` — First task slides left and collapses when dequeued
  - `dotPulse` — The three dots in the queue direction indicator pulse in sequence
  - `glowFloat` — Ambient blobs slowly drift
  - `shake` — Input shakes when submitting empty
- **Google Fonts** — Uses "Inter" for a clean, modern look
- **Responsive** — Flexbox layout with a media query for small screens

#### 3. Queue Logic (`app.js`)
- Wrapped in an **IIFE** (Immediately Invoked Function Expression) to avoid polluting the global scope
- The queue is a simple **JavaScript array**:
  - `queue.push(task)` → enqueue (add to back)
  - `queue.shift()` → dequeue (remove from front)
- Each task is an object: `{ id, text, createdAt }`
- **localStorage** is used to persist the queue between page reloads
- The `renderAll()` function clears and re-renders the entire list (simple and reliable for this scale)
- The first item gets a special `.is-front` CSS class for the highlight effect
- **`timeAgo()`** helper converts timestamps to human-readable strings like "5m ago"
- Timestamps auto-refresh every 30 seconds via `setInterval`
- **`escapeHtml()`** prevents XSS by using DOM-based text content escaping

### Key Design Decisions

| Decision | Why |
|----------|-----|
| No framework | The app is simple enough that vanilla JS is cleaner and faster |
| CSS custom properties | Makes theming consistent and easy to modify |
| localStorage | Simple persistence without needing a backend |
| Inline SVGs | No external icon dependency, instant load |
| IIFE pattern | Keeps all variables private, avoids global namespace pollution |
| Array as queue | JavaScript arrays have built-in `push`/`shift` which map perfectly to enqueue/dequeue |

---

## 📝 License

MIT — free to use, modify, and distribute.
