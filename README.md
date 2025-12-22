# Foreign Language Center Management - Student Portal (Frontend)

## 📖 Project Overview

**Foreign Language Center Management (Student Portal)** is a modern, responsive web application designed to provide students with a seamless experience in managing their language learning journey. This portal serves as the primary interface for students to discover courses, register for classes, track their schedules, and access learning materials.

Built with **React 19** and **Material UI (MUI)**, the application ensures a high-quality user experience with a polished, professional design and intuitive navigation.

## ✨ Key Features

*   **Course Discovery & Registration**:
    *   Browse a wide range of language courses and categories.
    *   View detailed course information, schedules, and pricing.
    *   Seamless course registration and payment processing.
    *   Access to current promotions and student benefits.

*   **Student Dashboard**:
    *   **Personalized Profile**: Manage account details and personal information.
    *   **Learning Roadmap**: Visual tracking of academic progress and certifications.
    *   **Weekly Schedule**: View upcoming classes and session details.
    *   **Registered Courses**: Access list of active and completed courses.

*   **Learning Resources**:
    *   **Student Documents**: Download and view study materials and resources.
    *   **Review History**: Track past assessments and reviews.

*   **Authentication & Security**:
    *   Secure Login and Registration.
    *   Password recovery (Forgot/Reset Password).
    *   Session persistence.

## 🛠️ Technology Stack

This project uses a modern frontend stack to deliver performance and scalability:

*   **Core Framework**: [React 19](https://react.dev/) (via Create React App)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and code quality.
*   **UI Library**: [Material UI (MUI v7)](https://mui.com/) + Emotion for styling.
*   **Routing**: [React Router DOM v6](https://reactrouter.com/) for client-side routing.
*   **State Management & API**:
    *   [Axios](https://axios-http.com/) for REST API communication.
    *   Context API for global state management.
*   **Utilities**:
    *   `date-fns` for robust date manipulation.
    *   `Swiper` for responsive carousels and sliders.
    *   `FontAwesome` for iconography.

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16 or higher recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/quan_ly_trung_tam_ngoai_ngu.git
    cd quan_ly_trung_tam_ngoai_ngu
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm start
    ```
    The app will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

2.  **Build for production:**
    ```bash
    npm run build
    ```
    Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## 📂 Project Structure

```bash
src/
├── api/            # API configuration and endpoints
├── auth/           # Authentication logic and pages
├── componets/      # Reusable UI components (header, footer, cards, etc.)
├── context/        # React Context headers (Global state)
├── css/            # Global styles
├── hook/           # Custom React hooks
├── layouts/        # Page layout definitions (MainLayout, etc.)
├── model/          # TypeScript interfaces and data models
├── pages/          # Application pages (Home, Course, Profile, etc.)
├── route/          # Routing configuration
├── services/       # API service functions
└── utils/          # Utility functions and helpers
```
