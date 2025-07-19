# 🌍 Welcome to TripWise — Your Smart Online Trip Planner 🧳✨

![React](https://img.shields.io/badge/Frontend-ReactJS-blue?logo=react)
![Vite](https://img.shields.io/badge/Bundler-Vite-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?logo=tailwindcss)
![NodeJS](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![ExpressJS](https://img.shields.io/badge/API-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-yellow?logo=jsonwebtokens)
![GoogleAuth](https://img.shields.io/badge/Auth-Google-red?logo=google)

---

## 🧠 Problem Statement

We often go on spontaneous trips without planning. Someone says, "Let's go to XYZ place today!" and suddenly, you're stuck searching for **places to visit**, **restaurants**, and **hotels** on the fly — wasting valuable time.

**TripWise** solves this problem by allowing users to:
- Quickly filter destinations
- Set custom sequences for visits
- View everything in one place

---

## 🚀 Tech Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Frontend   | ReactJS + Vite + TailwindCSS   |
| Backend    | NodeJS + ExpressJS             |
| Database   | MongoDB                        |
| Auth       | JWT + bcrypt + Google OAuth    |
| Charts     | Recharts.js                    |
| Maps       | Leaflet.js                     |

---

## ✨ Features

### 🔐 Authentication
- Secure login using **JWT**
- Passwords encrypted via **bcrypt**
- Optional **Sign in with Google**

### 📝 Create Trip
- After login, users can:
  - Create a trip
  - Set **Trip Name**, **Start Date**, and **Return Date**

### 📍 See Destinations
- Browse **Places**, **Hotels**, **Restaurants**, and **Religious Places**
- Apply filters based on **Location**
- Add/Remove destinations to/from your trip

### 📊 Trip Graph & Map
- Visualize your trip using:
  - **Recharts.js** (Graphs)
  - **Leaflet.js** (Maps)

### 🖼️ Image Gallery
- View images of selected **hotels**, **restaurants**, and **places**

### 💬 Feedback System
- Leave your feedback on the homepage
- Help us improve TripWise!

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/yourusername/tripwise.git
cd tripwise
npm install
npm run dev  # For frontend
