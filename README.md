# 🌱 **HealthNest: AI-Powered Habit Tracker for Wellness**

**Welcome to HealthNest** — your intelligent wellness companion designed to guide you on your journey to a healthier lifestyle. With the power of AI, HealthNest helps you cultivate self-care habits, track daily routines, and gain valuable insights into your health, all while maintaining motivation and encouragement through personalized suggestions.

## 🎥 **Watch Our Demo**
[![HealthNest Demo](https://img.youtube.com/vi/xvV1EwgCPR0/0.jpg)](https://media-hosting.imagekit.io/05399ecc630b46f7/habitnest-demovideo.mp4?Expires=1839931728&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xgiTK9lSyRoTJbKE1wDzymaXWbdV~Y8ZYnVKylmmy35SNoo23i5p2NLNcmTRoqRnywmz7Xinnwwye1wlQk0oYDiadBY0SalPiVq5tVGXz3zy02Rk9-ZKS-SfirejkwGZJAvPzfLoP~kaXCBI18TUWibxpe7684exv3kKk7solEkTC6J8PONVscuACvXJc6AbTPUt3YRd~TxnLL2jlfcxc6e3T32EdghjNnCFfizI6wS0o8gZt3hJ1H-M60Z56Pml7n7W91OuNwQ2ALFBbTlTqMSu9g1RLUpxhlBKMqX5CnbfrRVwvg-ShpDCrya6qlnkNpZ33xKwnaNxUXu7s7Y84g__)

---

## ✨ **What is HealthNest?**
**HealthNest** is a comprehensive wellness platform that empowers users to establish, track, and sustain healthier habits. By logging daily activities such as hydration, meals, sleep, and exercise, users can access real-time, AI-driven insights and personalized recommendations. It’s like having a virtual wellness coach right in your pocket!

---

## 🌟 **Key Features**
- 📈 **In-depth Habit Tracking**: Monitor your sleep, water intake, meal frequency, and exercise regimen.
- 🎯 **Goal Visualization**: Intuitive dashboards offer visual feedback to help you stay on track.
- 🤖 **AI-Driven Health Score**: Evaluate your consistency, quality of habits, and adherence to wellness goals.
- 💡 **Tailored Suggestions**: Practical tips to create sustainable, long-lasting habits.
- 🔐 **Secure User Profiles**: Advanced authentication ensures that your data remains safe and private.
- 🔁 **Reward System**: Earn points for daily habits to maintain motivation through streaks and achievements.

---

## 🔍 **How It Works**
1. **Log Your Daily Activities**: Record essential aspects of your wellness each day.
2. **Visualize Your Data**: Access patterns in your habits through easy-to-read charts and graphs.
3. **Receive Your Health Score**: An AI-generated score provides insight into your consistency and commitment.
4. **Get Actionable Recommendations**: Personalized advice is tailored to enhance your well-being.

---

## 📊 **Core Pages & Functionalities**
| Page              | Functionality                                         | Tools Used                   |
|-------------------|------------------------------------------------------|------------------------------|
| **Login/Register**     | Secure onboarding process                             | React, Chakra UI, JWT        |
| **Dashboard**          | Comprehensive overview of wellness + trends          | Chart.js, Recharts           |
| **Profile**            | Edit user goals and manage personal information      | Redux Toolkit                |
| **Habit Logging**      | Enable daily logging of essential wellness habits    | React, Chakra UI             |

---

## 🛠️ **Tech Stack**
### **Frontend**
- ⚛️ **React** + **Vite**
- 🌈 **Chakra UI**
- 📦 **Redux Toolkit**

### **Backend**
- 🧠 **Node.js** + **Express**
- 🌍 **MongoDB** + **Mongoose**
- 🔐 **JWT Authentication**

### **AI/Wellness Engine**
- 📊 **Custom Scoring Logic**
- 🔁 **Linear Regression** + **Moving Averages** for predictive insights
- 🧩 **Smart Recommendation Generation**

---

## 🧠 **AI Logic Deep Dive**
### **Health Score Components**
| Area        | Metric                                         |
|-------------|------------------------------------------------|
| Sleep       | Duration compared to goal                      |
| Hydration   | Daily water intake vs. ideal target           |
| Nutrition   | Consistency and quality of meals               |
| Exercise    | Score based on effort and frequency            |
| Consistency | Bonus points for maintaining daily habits      |

**Weightage**:
- Sleep: 30%
- Water: 20%
- Nutrition: 25%
- Exercise: 25%
- Consistency Bonus: Up to +50 points

### **Personalized Suggestions Engine**
- 🧩 Adjusts based on behavior gaps to enhance adherence.
- 📉 Recommendations tailored to address dips in performance.
- 💬 Practical tips for improving sleep hygiene, hydration, nutrition, and workouts.

---

## 🚀 **Getting Started**
### **Prerequisites**
- **Node.js** v18 or higher
- **MongoDB** (local instance or Atlas)
- **Git** for version control

### **Setup Instructions**
1. **Clone Repository**
   ```bash
   git clone https://github.com/rithigavijayendran/HealthNest.git
   ```

2. **Backend Setup**
   ```bash
   cd health-tracker-backend
   npm install
   touch .env
   node server.js
   ```
   Add the following to the `.env` file:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the App**
   Visit [http://localhost:5173](http://localhost:5173) to explore HealthNest! 🚀

---

## 🔮 **Future Enhancements**
- Integration with wearable devices (e.g., Fitbit, Apple Health)
- Anomaly detection features for identifying sleep and stress patterns
- Opportunities for engaging weekly wellness challenges with rewards
- Enhanced analytics using time-series forecasting with machine learning

---

## 🙌 **Built With Passion By**
**Rithiga V** — Pre-Final Year B.E. CSE Student @ Sri Eshwar College of Engineering  
🚀 Passionate Full Stack Developer | Wellness Technology Enthusiast

📧 Email: [rithiga.v2022cse@sece.ac.in](mailto:rithiga.v2022cse@sece.ac.in)

---

## 💡 **Inspiration & Acknowledgments**
- Driven by authentic wellness journeys and research in behavioral science.
- Special thanks to **Adya.ai** for their invaluable technical guidance.
- Gratitude to Chakra UI & Redux Toolkit for enabling delightful user interfaces.
- Kudos to MongoDB Atlas for providing reliable cloud storage solutions.

---

Together, let’s redefine self-care — one healthy habit at a time! 🌿

---
