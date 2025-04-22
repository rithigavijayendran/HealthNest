# 🌱 HealthNest: AI-Powered Habit Tracker for Wellness

Welcome to **HealthNest** — a smart, full-stack wellness companion that helps you cultivate healthier habits, track your daily routines, and unlock insights into your personal health journey through intelligent wellness forecasting.

[🎥 Watch Demo](https://media-hosting.imagekit.io/05399ecc630b46f7/habitnest-demovideo.mp4?Expires=1839931728&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xgiTK9lSyRoTJbKE1wDzymaXWbdV~Y8ZYnVKylmmy35SNoo23i5p2NLNcmTRoqRnywmz7Xinnwwye1wlQk0oYDiadBY0SalPiVq5tVGXz3zy02Rk9-ZKS-SfirejkwGZJAvPzfLoP~kaXCBI18TUWibxpe7684exv3kKk7solEkTC6J8PONVscuACvXJc6AbTPUt3YRd~TxnLL2jlfcxc6e3T32EdghjNnCFfizI6wS0o8gZt3hJ1H-M60Z56Pml7n7W91OuNwQ2ALFBbTlTqMSu9g1RLUpxhlBKMqX5CnbfrRVwvg-ShpDCrya6qlnkNpZ33xKwnaNxUXu7s7Y84g__)

---

## ✨ What is HealthNest?
**HealthNest** is a personalized wellness platform designed to make your health journey consistent, measurable, and deeply motivating. Users can log everyday habits — from hydration and meals to sleep and workouts — and get real-time AI-driven insights, streak-based motivation, and smart suggestions that feel like a virtual wellness coach.

![HealthNest Screenshot](https://github.com/user-attachments/assets/f34f6687-2e4a-4df5-8e89-e56eba806fe0)

---

## 🌟 Key Features
- 📈 **Track Daily Habits:** Sleep, water intake, meals, exercise
- 🎯 **Goal Progression & Visual Feedback** via intuitive dashboards
- 🤖 **AI-Driven Wellness Score** based on consistency and health science
- 💡 **Personalized Suggestions** to help you build sustainable habits
- 🔐 **User Authentication & Secure Profiles**
- 🔁 **Consistency & Streak Points** to reward commitment

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
| Login/Register | Secure onboarding | React, Chakra UI, JWT |
| Dashboard | Visual wellness overview + trends | Chart.js, Recharts |
| Profile | View/edit goals and personal data | Redux Toolkit |
| Habit Logging | Daily logs for core wellness areas | React, Chakra UI |

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
### Health Score Components
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

### Personalized Suggestions Engine
- 🧩 Adjusts based on behavior gaps
- 📉 Recommends habits when scores dip
- 💬 Tips for sleep hygiene, hydration, balanced meals, and focused workouts

---

## 🚀 Getting Started
### Prerequisites
- Node.js ≥ v18
- MongoDB (Local/Atlas)
- Git

### Setup Instructions
```bash
# Clone Repository
git clone https://github.com/rithigavijayendran/HealthNest.git

# Backend Setup
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
```bash
# Frontend Setup
cd ../frontend
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
