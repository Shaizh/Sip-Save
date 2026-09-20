# Sip & Save – Café Reservation & Loyalty Platform

Sip & Save is a modern café management and customer engagement web application designed to simplify **table reservations, food ordering, customer accounts, loyalty rewards, and feedback**.

The platform provides customers with an easy way to explore the café menu, reserve tables, place food orders, manage their profile, and track their loyalty points through a clean and responsive interface.

---

## 📌 Overview

Sip & Save brings common café services together in a single web application.

Customers can:

* Browse the café menu
* Add food items to a cart
* Place food orders
* Book café tables
* View and manage reservations
* Track loyalty points and rewards
* Manage their profile
* Submit feedback
* Receive order and reservation confirmations

The application is built with a component-based React architecture and uses centralized application state for managing customer interactions.

---

## ✨ Key Features

### 🍽️ Menu & Food Ordering

* Browse available food and beverage items
* View menu items through a dedicated menu page
* Add items to the shopping cart
* Update cart items
* Review the order before confirmation

### 🪑 Table Reservation

* Browse available tables
* Select a table for a preferred date and time
* Create café reservations
* View existing reservations
* Manage reservation information

### 🛒 Shopping Cart

* Add menu items to the cart
* View selected products
* Adjust order information
* Review the total order before confirmation

### 🎁 Loyalty Program

* Track customer loyalty points
* View loyalty information
* Manage available rewards
* Encourage repeat visits through a reward-based system

### 👤 Customer Account

* Customer registration
* Login
* Profile management
* View personal information
* Access customer dashboard

### 💬 Feedback

* Submit customer feedback
* Provide feedback through a dedicated modal
* Support customer engagement and service improvement

### ✅ Confirmation

* Display confirmation after successful actions
* Provide customers with clear reservation/order status information

### 📱 Responsive Interface

* Clean café-focused user interface
* Responsive layouts
* Reusable React components
* Navigation across major application sections

---

## 🧩 Application Modules

| Module             | Description                              |
| ------------------ | ---------------------------------------- |
| **Home**           | Landing page and café overview           |
| **Authentication** | Registration and login                   |
| **Menu**           | Browse available café items              |
| **Cart**           | Manage selected food items               |
| **Table Booking**  | Select and reserve café tables           |
| **Reservations**   | View and manage reservations             |
| **Orders**         | Manage customer orders and confirmations |
| **Loyalty**        | Track loyalty points and rewards         |
| **Profile**        | Manage customer account information      |
| **Feedback**       | Submit customer feedback                 |
| **Dashboard**      | Central customer activity interface      |

---

## 🛠️ Technologies Used

| Technology           | Purpose                             |
| -------------------- | ----------------------------------- |
| **React 19**         | Frontend application development    |
| **TypeScript**       | Type-safe application development   |
| **Vite**             | Development server and build tool   |
| **Tailwind CSS**     | Styling and responsive UI           |
| **Express.js**       | Backend/server support              |
| **Google Gemini AI** | AI-related application capabilities |
| **Lucide React**     | Interface icons                     |
| **Motion**           | UI animations and transitions       |
| **Node.js**          | JavaScript runtime                  |
| **dotenv**           | Environment variable management     |

---

## 📂 Project Structure

```text
sip-&-save/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── CartPage.tsx
│   │   ├── ConfirmationPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── FeedbackModal.tsx
│   │   ├── Footer.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── LoyaltyPage.tsx
│   │   ├── MenuPage.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── ReservationsPage.tsx
│   │   ├── TableBookingPage.tsx
│   │   └── Toast.tsx
│   │
│   ├── context/
│   │   └── AppContext.tsx
│   │
│   ├── data/
│   │   └── initialData.ts
│   │
│   ├── utils/
│   │   └── timeUtils.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   └── vite-env.d.ts
│
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔄 Application Workflow

```text
                    ┌──────────────────┐
                    │   Sip & Save     │
                    │      Home        │
                    └────────┬─────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
        Authentication     Menu          Table Booking
             │               │                │
             │               ▼                ▼
             │             Cart          Reservation
             │               │
             │               ▼
             │           Order
             │               │
             └───────┬───────┘
                     ▼
              Customer Dashboard
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
     Profile      Loyalty      Feedback
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/Shaizh/Sip-Save.git
cd Sip-Save
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a local environment file if required:

```bash
cp .env.example .env.local
```

Add the required environment values to `.env.local`.

> Never commit `.env.local` or API keys to GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Starts the development server        |
| `npm run build`   | Creates a production build           |
| `npm run preview` | Previews the production build        |
| `npm run lint`    | Runs TypeScript checking             |
| `npm run clean`   | Removes generated build/server files |

---

## 🔐 Security

The project follows basic security practices including:

* Environment variables for sensitive configuration
* `.env` files excluded through `.gitignore`
* `.env.example` provided for configuration reference
* Client/server separation for application functionality
* No sensitive credentials should be committed to the repository

---

## 🎯 Project Objective

The main objective of Sip & Save is to provide a **simple digital café experience** where customers can conveniently manage food ordering, table reservations, loyalty rewards, and customer interactions from one platform.

---

## 🔮 Future Enhancements

Potential future improvements include:

* Online payment integration
* Real-time order tracking
* Advanced loyalty and reward rules
* Push notifications
* Admin management dashboard
* Inventory management
* Customer analytics
* Café staff management
* QR-based table ordering
* Cloud database integration
* Deployment as a Progressive Web App

---

## 📸 Screenshots

Screenshots can be added here to demonstrate the application's:

* Home page
* Menu
* Cart
* Table booking
* Reservations
* Loyalty page
* Customer dashboard
* Profile
* Confirmation screens

Example:

```text
screenshots/
├── home.png
├── menu.png
├── cart.png
├── booking.png
└── loyalty.png
```

---

## 📚 Project Information

**Project:** Sip & Save
**Type:** Café Reservation & Loyalty Platform
**Frontend:** React + TypeScript
**Build Tool:** Vite
**Styling:** Tailwind CSS
**Backend Support:** Express.js / Node.js

---

## 📄 License

This project is developed as an academic/software project for learning and demonstration purposes.

