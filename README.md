# Validify AI – AI Startup Validation Platform

Validate startup ideas using AI-powered market research, competitor analysis, and actionable business insights.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple?logo=vite)
![Gemini](https://img.shields.io/badge/Google-Gemini-orange)
![Tavily](https://img.shields.io/badge/Tavily-Web_Search-green)

---

## Live Demo

**Website:** https://startup-validator-tan.vercel.app

---

## Overview

Validify AI is an AI-powered startup validation platform that helps founders evaluate startup ideas before investing significant time and resources.

Instead of relying on intuition, Validify generates a structured business validation report using Google's Gemini AI along with real-time competitor and market research.

The platform provides:

- Startup validation score
- SWOT analysis
- Live competitor research
- Market opportunity analysis
- Buyer personas
- Failure risk assessment
- 30-day smoke test plan
- Strategic pivot recommendations

---

## Features

### AI Startup Validation

- Generates structured startup validation reports
- Provides an overall validation score
- Risk level assessment
- Business summary

### Live Competitor Research

- Real-time competitor discovery using the Tavily Search API
- Competitor strengths and weaknesses
- Competitive positioning

### Market Research

- Market opportunity insights
- Market size estimates
- Growth trends

### Buyer Persona Analysis

- Target customer personas
- Customer pain points
- Willingness to pay analysis

### Risk Analysis

- Startup risk identification
- Suggested mitigation strategies

### Go-to-Market Recommendations

- 30-day smoke test plan
- Strategic pivot recommendations

### User Experience

- Responsive interface
- Animated validation score breakdown
- Interactive dashboard
- Mobile-friendly design

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

### Backend

- Express.js
- Node.js

### AI & APIs

- Google Gemini API
- Tavily Search API

---

## Project Structure

```text
Startup-Validator/
│
├── server/
│   ├── services/
│   │   ├── competitorSearch.ts
│   │   └── marketResearch.ts
│   │
│   └── server.ts
│
├── src/
│   ├── components/
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
└── vite.config.ts
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/Shravanii-03/Startup-Validator.git
```

Navigate into the project

```bash
cd Startup-Validator
```

Install dependencies

```bash
npm install
```


---

## Running the Project

Development

```bash
npm run dev
```

Production Build

```bash
npm run build
```

---

## Example Output

Validify generates reports containing:

- Overall Validation Score
- SWOT Analysis
- Competitor Analysis
- Market Size Estimation
- Buyer Personas
- Risk Assessment
- Smoke Test Plan
- Strategic Pivot Recommendation

---

## Future Improvements

- User authentication
- Validation history
- PDF report export
- Investor readiness scoring
- Pitch deck generation
- Revenue forecasting
- Startup benchmarking

---

## Author

**Shravani Isukapalli**

---

## License

This project is developed for educational and portfolio purposes.
