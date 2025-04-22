```md
# 🌱 HealthNest — AI-Powered Habit Tracker for Wellness

<p align="center">
  <img src="https://img.shields.io/badge/MERN-FullStack-blue?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/AI%20Powered-Wellness%20Scoring-ff69b4?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Responsive-UI-success?style=for-the-badge" />
</p>

---

### 🎥 Demo Video

<p align="center">
  <video width="700" controls>
    <source src="https://media-hosting.imagekit.io/05399ecc630b46f7/habitnest-demovideo.mp4?Expires=1839931728&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xgiTK9lSyRoTJbKE1wDzymaXWbdV~Y8ZYnVKylmmy35SNoo23i5p2NLNcmTRoqRnywmz7Xinnwwye1wlQk0oYDiadBY0SalPiVq5tVGXz3zy02Rk9-ZKS-SfirejkwGZJAvPzfLoP~kaXCBI18TUWibxpe7684exv3kKk7solEkTC6J8PONVscuACvXJc6AbTPUt3YRd~TxnLL2jlfcxc6e3T32EdghjNnCFfizI6wS0o8gZt3hJ1H-M60Z56Pml7n7W91OuNwQ2ALFBbTlTqMSu9g1RLUpxhlBKMqX5CnbfrRVwvg-ShpDCrya6qlnkNpZ33xKwnaNxUXu7s7Y84g__" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

---

## ✨ Overview

**HealthNest** is a full-stack wellness companion that helps users build and maintain healthy habits using AI-driven insights. With a beautiful and intuitive interface, HealthNest empowers users to track daily routines, monitor wellness metrics, and receive personalized suggestions — like having your own virtual wellness coach.

---

## 🌟 Features

- ✅ Log daily habits: **Sleep**, **Water**, **Nutrition**, **Exercise**
- 📈 View progress visually through **charts and dashboards**
- 🤖 AI-powered **Health Score** with real-time feedback
- 💡 Personalized wellness tips and **habit suggestions**
- 🔐 Secure **User Authentication & Profile Management**
- 🔁 **Streak Tracking & Motivation Points**

---

## 📊 App Structure

| Page          | Functionality                              | Tech Used                |
|---------------|---------------------------------------------|--------------------------|
| Login/Register| Secure authentication and onboarding        | React, Chakra UI, JWT    |
| Dashboard     | Visual insights and wellness overview       | Chart.js, Recharts       |
| Profile       | User data, goals, edit settings             | Redux Toolkit            |
| Habit Tracker | Daily log for key health parameters         | Chakra UI, REST API      |

---

## 🛠️ Tech Stack

### 🔷 Frontend
- **React** with **Vite**
- **Chakra UI** for accessible and responsive design
- **Redux Toolkit** for state management

### 🔶 Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Authentication**

### 🧠 AI Engine
- Health Score Calculation using:
  - Custom logic + Moving Averages
  - Linear Regression for trends
- Dynamic Recommendation Engine

---

## 🧠 AI Health Score Logic

| Area        | Metric Compared                     | Weightage |
|-------------|--------------------------------------|-----------|
| Sleep       | Duration vs user goal                | 30%       |
| Hydration   | Water intake vs recommended intake   | 20%       |
| Nutrition   | Meal consistency + food quality      | 25%       |
| Exercise    | Duration and intensity of activity   | 25%       |
| Consistency | Bonus for daily streaks              | +50 pts   |

✅ Personalized tips are triggered when scores drop or inconsistencies are detected — covering **hydration reminders**, **sleep hygiene**, **balanced meal tips**, and more.

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas Cloud)

### 📦 Backend Setup

```bash
# Clone the repository
git clone https://github.com/rithigavijayendran/HealthNest.git
cd health-tracker-backend

# Install dependencies
npm install

# Create environment file
touch .env
```

`.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

```bash
# Start backend server
npm run dev
```

---

### 🎨 Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

App will be running at: [http://localhost:5173](http://localhost:5173)

---

## 🔮 Future Roadmap

- 🔌 Integration with wearables (Fitbit, Apple Health, Google Fit)
- 📈 Time-series wellness forecasting
- 🧘 Guided meditations and wellness content
- 🎯 Weekly challenges and community rewards

---

## 🧑‍💻 Author

**Rithiga V**  
Pre-Final Year B.E CSE @ Sri Eshwar College of Engineering  
💻 Full Stack Developer | AI + Wellness Tech Enthusiast

📧 [rithiga.v2022cse@sece.ac.in](mailto:rithiga.v2022cse@sece.ac.in)  
🔗 [LinkedIn](https://www.linkedin.com/in/rithiga-v) | [GitHub](https://github.com/rithigavijayendran)

---

## 🙏 Acknowledgements

- **Adya.ai** — Mentorship & AI Logic Inspiration
- Chakra UI + Redux Toolkit — for seamless UI and state management
- MongoDB Atlas — scalable cloud database

---

> *"Let's redefine self-care — one habit at a time."* 🌿

```
