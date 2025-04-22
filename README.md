# 🧠 Health Habit Tracker with Wellness Prediction

This repository presents *Health Habit Tracker with Wellness Prediction*, a full-stack web application designed to promote healthier lifestyles through intelligent habit tracking and AI-powered wellness forecasting.

![📺 Demo Video Link](https://#)

## Overview

![Habitnest](https://github.com/user-attachments/assets/f34f6687-2e4a-4df5-8e89-e56eba806fe0)

*Health Habit Tracker with Wellness Prediction* is an AI-enhanced web application that empowers users to build and maintain healthy lifestyle habits. The app allows users to log daily routines like sleep, water intake, meals, and exercise, while providing real-time feedback, visual insights, and personalized improvement suggestions.

It combines habit tracking with predictive analytics to deliver a dynamic *health score* based on user consistency and scientific wellness metrics. By identifying patterns and projecting future health trends, the app helps users stay motivated and informed in their journey toward better health.

## Key Capabilities:
🎯 Monitor daily wellness inputs (sleep, meals, water, workouts) <br>
🎯 Track progress with graphs and consistency streaks <br>
🎯 View AI-predicted health score trendlines <br>
🎯 Receive personalized habit recommendations <br>
🎯 Secure user profiles and goal tracking <br>

Whether you're trying to improve sleep hygiene, stay hydrated, or maintain a consistent fitness routine, this application offers a smart and interactive platform to guide and motivate you every step of the way.

## Core Functionalities
✅ *User Authentication:* Secure registration and login using JWT. <br>
✅ *Profile Management:* Users can set age, weight, and wellness goals. <br>
✅ *Habit Logging:* Track daily sleep hours, water intake, meals, and workout duration. <br>
✅ *Progress Visualization:* Intuitive dashboards with weekly and monthly graphs. <br>
✅ *AI Health Scoring:* Predictive health trend analysis and smart habit suggestions. <br>
✅ *Consistency Scoring:* Tracks habit regularity and assigns streak points. <br>

## Pages Overview

| *Page*            | *Purpose*                                                                 | *Tools Used*                  |
|---------------------|-----------------------------------------------------------------------------|---------------------------------|
| *Login/Register*  | Allows users to sign up or log in to their profile                         | React, Chakra UI, Redux Toolkit |
| *Dashboard*       | Visualizes the user's health habits, goals, and AI-generated health score trends | React, Redux Toolkit, Chart.js, Recharts |
| *Profile Page*    | Allows users to view and edit personal information (age, weight, goals)      | React, Redux Toolkit            |
| *Habit Tracking*  | Lets users log daily habits (sleep, water, meals, exercise)                | React, Redux Toolkit            |


## Tech Stack

### 🔧 Frontend
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [Chakra UI](https://chakra-ui.com/) for beautiful, accessible UI components
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management

### 🔧 Backend
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) for persistent data storage
- JWT-based authentication for secure API access

### 🔧 AI & Wellness Engine
- Python/JS-based scoring algorithm (see below for logic)
- Predictive analytics to visualize future wellness score trends
- Smart habit suggestions based on user behavior patterns

## Installation & Setup

### Prerequisites
- Node.js ≥ 18
- MongoDB installed locally or Atlas cluster
- Git

### Steps to Run Locally

1. *Clone the repository*
   bash
   git clone https://github.com/yourusername/health-habit-tracker.git
   cd health-habit-tracker
   
2. *Setup Backend*
   bash
   cd backend
   npm install
   touch .env
   
3. Add the following to .env
   
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   
4. Start the backend server
   
   npm run dev
   
5. *Setup Frontend*
   
   cd ../frontend
   npm install
   npm run dev
   
6. *Access App*
   
   Open http://localhost:5173 in your browser.
   
   
## 🎥 Demo Video
- Watch a full walkthrough including:
- User login and profile setup
- Daily habit input logging
- Dashboard insights and predictions
![📺 Demo Video Link](https://#)

## Technical Approach

This project follows a modular full-stack architecture, leveraging modern web technologies and AI-powered insights for habit tracking and wellness prediction.

### 1. Frontend (React + Vite + Chakra UI + Redux Toolkit)
📍 *React* for UI components and user interaction. <br>
📍 *Vite* for fast development and build performance. <br>
📍 *Chakra UI* for a consistent, accessible UI. <br>
📍 *Redux Toolkit* for efficient state management (user data, logs, and health scores). <br>

### 2. Backend (Node.js + Express + MongoDB)
📍 *Express* for RESTful API endpoints. <br>
📍 *MongoDB* for storing user data and logs. <br>
📍 *JWT Authentication* for secure login and session management. <br>

### 3. AI & Scoring Engine with Data Visualization
📍 *Health Score* based on sleep, water intake, meals, workouts, and consistency. <br>
📍 *Prediction* using moving averages and linear regression for future health trends. <br>
📍 *Charts* to display habits and predicted health trends using libraries like Recharts. <br>
📍 *Consistency streaks* and health milestones visually tracked. <br>

This architecture enables a responsive, data-driven web app focused on tracking and improving user health through simple UI and AI insights.

## AI Logic Description

This section explains the core logic behind how the application calculates health scores and provides personalized recommendations.

### Overview

The AI component evaluates user habit data (sleep, hydration, meals, exercise) to compute a *health score* and deliver *tailored suggestions*. This helps users make data-driven lifestyle changes by monitoring patterns and offering actionable advice.


### Health Score Calculation Logic

The score is computed from five key areas:

| *Component*         | *Description* |
|-----------------------|-----------------|
| *Sleep Score*       | Based on average hours vs. user goal. Under-sleeping penalized more than over-sleeping. |
| *Water Intake Score*| Calculated relative to weight-adjusted hydration targets (based on 70kg reference). |
| *Nutrition Score*   | Evaluates healthy meals ratio and consistency in meal timing. |
| *Exercise Score*    | Assesses duration and intensity of workouts relative to goals. |
| *Consistency Bonus* | Rewards daily habit streaks up to 50 bonus points. |

#### Final Score Computation

- *Weightage*:
  - Sleep: 30%
  - Water: 20%
  - Nutrition: 25%
  - Exercise: 25%
- *Bonus*: Consistency adds up to 50 extra points.
- *Range*: Final score is normalized to a 0–100+ range.

### AI Recommendation Engine

When a category score drops below 80 or the streak is under 3 days, the engine provides *personalized tips* using:

- *Deficit analysis*
- *Behavioral trends*
- *Priority tagging*

#### Focus Areas

| *Area*     | *Suggestions*                                |
|--------------|------------------------------------------------|
| Sleep        | Improve bedtime routines and maintain consistency. |
| Water        | Encourage daily hydration based on intake percentage. |
| Nutrition    | Promote healthy balanced meals and consistent timing.     |
| Exercise     | Optimize both duration and intensity of sessions. |
| Consistency  | Encourage daily logging and building streaks.     |

### Unique AI Features

| *Feature*                       | *Details*                                                   |
|-----------------------------------|---------------------------------------------------------------|
| Adaptive Scoring                  | Dynamic adjustment based on overshooting or undershooting goals. |
| Streak Bonus                      | Rewards consistent tracking behavior.                         |
| Intensity-Based Workout Scoring   | Encourages effort, not just time spent.                       |

##  Future Improvements

- Machine learning-based anomaly detection (e.g., sleep disruption patterns).
- Integration with wearable device data (Apple Health, Fitbit, etc.).
- Time-series prediction of future health scores using habit trends.

## Contributors
- Rithiga V, Pre-Final Year Student, Sri Eshwar College of Engineering.

##  Acknowledgements
- *Adya.ai* team for providing the opportunity and the technical assessment that inspired the creation of this project
- Chakra UI for elegant components
- Redux Toolkit for clean state management
- MongoDB Atlas for cloud storage

## Contact Information
- Rithiga V, Pre-Final Year Student, Sri Eshwar College of Engineering, rithiga.v2022cse@sece.ac.in
