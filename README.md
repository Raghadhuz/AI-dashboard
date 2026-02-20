# AI Analyst Dashboard

## Overview

This project is a React-based AI Dashboard that displays AI-generated insights using a card-based UI. It includes filtering, pinning functionality, and light/dark theme support.

---

## Tech Stack

- React (Vite)
- JavaScript (No TypeScript as required)
- Context API for Theme Management
- Custom Hooks for data logic
- LocalStorage for persistence

---

## Architecture Decisions

### 1. Component Separation

The UI is divided into reusable components:

- InsightCard
- Sidebar
- Header
- FilterToggle

This makes the system scalable and maintainable.

### 2. Custom Hook (useInsights)

The simulated API call is handled inside a custom hook.
This separates business logic from UI components.

### 3. Context API

Theme management is handled globally using React Context.
This prevents prop drilling and keeps the app scalable.

### 4. Utility Functions

Confidence color logic is separated into a utility file.
This improves readability and reusability.

### 5. State Management

- Filter state handled locally in App
- Pinned state persisted using localStorage
- Pinned items remain even when filter changes

---

## Setup Instructions

1. Install dependencies
   npm install

2. Run development server
   npm run dev

3. Open in browser
   http://localhost:5173

## Author

Raghad Huzayen
Email: raghadhuzayen@gmail.com
