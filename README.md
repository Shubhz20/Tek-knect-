# Tek-knect

Tek-knect is a web application that facilitates connections and authentication using Google OAuth. It is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with a modern and interactive frontend powered by Vite, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **User Authentication**: Secure login and registration utilizing Google OAuth (`@react-oauth/google` and `google-auth-library`) as well as traditional JWT-based authentication.
- **Modern UI/UX**: Built with React and Vite, styled with Tailwind CSS, and animated with Framer Motion for a seamless and responsive user experience.
- **Backend API**: Robust Node.js and Express backend with token-based authentication and secure password hashing via `bcryptjs`.
- **Database**: MongoDB integration using Mongoose for flexible and scalable data storage.
- **Email Integration**: Integrated with `nodemailer` for email communications.
- **Deployment Ready**: Configured for deployment on Vercel (`vercel.json` included).

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth**: Google OAuth

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose
- **Authentication**: JsonWebToken (JWT) & Google Auth Library
- **Security**: bcryptjs & CORS
- **Email**: Nodemailer

## 📦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance (local or MongoDB Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shubhz20/Tek-knect-.git
   cd Tek-knect-
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   ```
   Start the backend server:
   ```bash
   npm start
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory and add necessary frontend variables (like Google Client ID).
   Start the frontend development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment

This project includes a `vercel.json` configuration file, making it easy to deploy both the frontend and backend on [Vercel](https://vercel.com).
The routing is configured to serve the API endpoints from `/api/(.*)` and the frontend from the root `/(.*)`.

## 📄 License

This project is licensed under the ISC License.
