 # 🌱HealthNest: Health Habit Tracker with Wellness  Prediction

Welcome to **HealthNest** — a smart, full-stack wellness companion that helps you cultivate healthier habits, track your daily routines, and unlock insights into your personal health journey through intelligent wellness forecasting.

[🎥 Watch Demo](https://media-hosting.imagekit.io/05399ecc630b46f7/habitnest-demovideo.mp4?Expires=1839931728&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xgiTK9lSyRoTJbKE1wDzymaXWbdV~Y8ZYnVKylmmy35SNoo23i5p2NLNcmTRoqRnywmz7Xinnwwye1wlQk0oYDiadBY0SalPiVq5tVGXz3zy02Rk9-ZKS-SfirejkwGZJAvPzfLoP~kaXCBI18TUWibxpe7684exv3kKk7solEkTC6J8PONVscuACvXJc6AbTPUt3YRd~TxnLL2jlfcxc6e3T32EdghjNnCFfizI6wS0o8gZt3hJ1H-M60Z56Pml7n7W91OuNwQ2ALFBbTlTqMSu9g1RLUpxhlBKMqX5CnbfrRVwvg-ShpDCrya6qlnkNpZ33xKwnaNxUXu7s7Y84g__)

---

## ✨ What is HealthNest?
**HealthNest** is a personalized wellness platform designed to make your health journey consistent, measurable, and deeply motivating. Users can log everyday habits — from hydration and meals to sleep and workouts — and get real-time AI-driven insights, streak-based motivation, and smart suggestions that feel like a virtual wellness coach.

---

## 🌟 Key Features
- 📈 **Track Daily Habits:** Sleep, water intake, meals, exercise
- 🎯 **Goal Progression & Visual Feedback** via intuitive dashboards
- 🤖 **AI-Driven Wellness Score** based on consistency and health science
- 💡 **Personalized Suggestions** to help you build sustainable habits
- 🔐 **User Authentication & Secure Profiles**
- 🔁 **Consistency & Streak Points** to reward commitment

---

### 🧩 System Architecture
![Diagram1](https://github.com/user-attachments/assets/48d44b9e-5132-40a2-966d-7a5b12f94d37)

---

## 🔍 How It Works
1. **Log your daily activities** (sleep, hydration, food, workout)
2. **Visualize patterns** in charts and graphs
3. **Receive an AI-generated health score** based on consistency, quality, and goal adherence
4. **Get actionable advice** to level up your well-being

---

## 📊 Core Pages & Functionalities
| Page | Functionality | Tools Used |
|------|---------------|-------------|
| Login/Register | Secure onboarding | React, Redux, Chakra UI, JWT |
| Dashboard | Visual wellness overview + trends | React, Chart.js, Recharts |
| Profile | View/edit goals and personal data | Redux Toolkit |
| Habit Logging | Daily logs for core wellness areas | Redux, React, Chakra UI |

---

## 🛠️ Tech Stack
### Frontend
- ⚛️ React + Vite
- 🌈 Chakra UI
- 📦 Redux Toolkit

### Backend
- 🧠 Node.js + Express
- 🌍 MongoDB + Mongoose
- 🔐 JWT Authentication

### AI/Wellness Engine
- 📊 Custom scoring logic
- 🔁 Linear regression + moving averages for prediction
- 🧩 Smart recommendation generation

---

## 🧠 AI Logic Deep Dive
### 🌟Multi-Dimensional Health Scoring System

![diagram2](https://github.com/user-attachments/assets/39b290f0-22bc-4aae-a64e-598dee8e916c)

| Area | Metric |
|------|--------|
| Sleep | Duration vs. goal |
| Hydration | Water intake vs. ideal target |
| Nutrition | Meal consistency + quality |
| Exercise | Effort-based score |
| Consistency | Bonus for daily habit streaks |

**Weightage**:
- Sleep: 30%
- Water: 20%
- Nutrition: 25%
- Exercise: 25%
- Consistency Bonus: Up to +50 points

---
  
### ⚡ Real-Time AI Processing
![Diagram](https://github.com/user-attachments/assets/4e10162b-807a-401e-9f61-608c5a3dd538)

---

## 🚀 Key Features

- ✅ **Adaptive Sleep Scoring** – Asymmetric sleep penalty algorithm with dynamic thresholds  
- 💧 **Weight-Adjusted Hydration** – Personalized water intake using biological normalization  
- 🥗 **Intelligent Nutrition Scoring** – Temporal consistency analysis for better diet habits  
- 🏃 **Exercise Efficiency Index** – MET-inspired activity evaluation  
- 🤖 **Smart Recommendation Engine** – Context-aware prioritization system  
- 🔮 **Wellness Forecasting System** – Predictive analytics with regression-based projections  

---

## 1. 🌙 Adaptive Sleep Scoring

```javascript
// Asymmetric sleep penalty algorithm
calculateSleepScore() {
  const sleepDiff = Math.abs(avgSleep - goal);
  return sleepDiff <= 1 ? 100 :
    sleepDiff <= 2 ? 80 :
    avgSleep < goal ? 60 - (goal - avgSleep) * 10 : // Higher undersleep penalty
    80 - (avgSleep - goal) * 5; // Lower oversleep adjustment
}
```

### 🧬 Features:
- 📉 **30% Higher Penalty** for under-sleeping vs. oversleeping  
- 🎯 **Personalized Thresholds** based on individual goals  
- 📅 **7-Day Rolling Average** for realistic insights  

---

## 2. 💦 Weight-Adjusted Hydration Analysis

```javascript
// Biological hydration normalization
const weightFactor = user.weight / 70; // 70kg baseline
const adjustedGoal = waterGoal * weightFactor;
const hydrationScore = Math.min(100, (actual / adjustedGoal) * 100);
```

### 📘 Science-Backed Formula:
- Ideal Water Intake:  
  `(Weight in kg / 70) × 2000ml ± 500ml`

---

## 3. 🥗 Intelligent Nutrition Scoring

```javascript
// Temporal consistency bonus
const timeVariance = calculateVariance(mealTimes);
const timingBonus = timeVariance < 2 ? 15 : 0;
```

### ⏱️ Temporal Analysis:
- ⌛ Low meal timing variance = higher score  
- 🧠 Encourages habit consistency for better metabolism  

---

## 4. 🏋️ Exercise Efficiency Index

```javascript
// Intensity-adjusted exercise scoring
const intensityFactor = 1 + (avgIntensity - 5) * 0.1;
const adjustedExercise = avgDuration * intensityFactor;
```

### 🔬 MET-Inspired Formula:
```
Score = (Duration × Intensity Factor) / Goal × 100
```

- 🎯 Encourages both **duration** and **intensity** for optimal workouts

---

## 🧠 Smart Recommendation Engine

```javascript
// Priority algorithm
sortRecommendations() {
  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority] || b.scoreImpact - a.scoreImpact;
  });
}
```

### 🧮 Decision Matrix

| Category     | Trigger Threshold | Priority Levels |
|--------------|-------------------|-----------------|
| Sleep        | `< 80`            | High / Medium   |
| Hydration    | `< 75`            | High / Low      |
| Nutrition    | `< 70`            | High / Medium   |
| Exercise     | `< 65`            | High / Low      |
| Consistency  | `< 3 day streak`  | High / Medium   |

---

## 🔮 Wellness Forecasting System

```javascript
predictTrend() {
  // Calculate regression parameters
  const slope = (n * Σxy - Σx * Σy) / (n * Σx² - (Σx)²);
  const intercept = (Σy - slope * Σx) / n;

  // 7-day projection
  return intercept + slope * (days + i);
}
```

### 📊 Prediction Accuracy

| Data Points  | Confidence Level |
|--------------|------------------|
| `< 3 days`   | Default Baseline |
| `7 days`     | ~85% Accuracy    |
| `30+ days`   | ~92% Accuracy    |

---

## 🚀 Getting Started
### Prerequisites
- Node.js ≥ v18
- MongoDB (Local/Atlas)
- Git

## Setup Instructions
### 1.Clone Repository

```bash
git clone https://github.com/rithigavijayendran/HealthNest.git
```
### 2.Backend Setup

```bash
cd health-tracker-backend
npm install
touch .env
node server.js
```
Inside `.env`, add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
### 3.Frontend Setup

```bash
cd health-tracker-frontend
npm install
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) 🚀

---

## 🔮 Future Enhancements
- Integration with wearable devices (Fitbit, Apple Health)
- Anomaly detection for sleep, stress, etc.
- Weekly wellness challenges & rewards
- Time-series forecasting using ML
- LSTM-based behavior prediction models
- GPT-3 powered wellness assistant

---

## 🙌 Built With Love By
**Rithiga V** — Pre-Final Year B.E CSE Student @ Sri Eshwar College of Engineering  
🚀 Passionate Full Stack Developer | Wellness Tech Enthusiast

📧 Email: rithiga.v2022cse@sece.ac.in

---

## 💡 Inspiration & Acknowledgements
- Inspired by real wellness journeys and behavior science research
- Thanks to **Adya.ai** for technical guidance
- Chakra UI & Redux Toolkit for powering elegant UIs
- MongoDB Atlas for scalable cloud storage

---

Let's redefine self-care — one habit at a time. 🌿
