# Task Management with 2FA

## Project Overview

This project is a task management application with two-factor authentication (2FA). It provides a secure login system with JWT authentication followed by OTP verification before granting access to the task management dashboard. Users can create, read, update, and delete tasks with different statuses.


## Features

### Authentication
- Secure login with JWT authentication
- Two-factor authentication (2FA) using one-time passwords (OTP)
- OTP expiration timer (5 minutes)
- Protected routes accessible only with valid authentication

### Task Management
- Create, read, update, and delete tasks
- Task categorization (Pending, In Progress, Completed)
- Search functionality for tasks
- Status-based filtering

### User Experience
- Responsive design for all device sizes
- Real-time status updates and notifications
- Light/Dark mode toggle
- Loading indicators for all API operations
- Toast notifications for feedback

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- React Hot Toast for notifications
- Lucide React for icons

### Backend
- Node.js
- Express.js for API server
- JWT for authentication
- In-memory storage for development purposes
- Nodemailer for sending OTP emails

## Project Structure

```
project-root/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   ├── Task/
│   │   │   └── UI/
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── ThemeContext.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   └── VerifyOTP.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── auth.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── email.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/
│   │   └── emailService.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### **Clone the repository:** Clone this repository to your local machine using Git:
```bash
https://github.com/Rizwanu321/Task-Management-with-2FA-.git
```

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server root with the following variables:
   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:3000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

4. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:5000

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## Application Flow

1. **Login Page** (`/login`)
   - Enter your email and password
   - Upon successful authentication, receive a JWT token
   - Automatically redirected to the OTP verification page

2. **OTP Verification Page** (`/verify-otp`)
   - An OTP is generated and sent to your email (displayed in console for development)
   - Enter the 6-digit OTP received
   - OTP expires after 5 minutes
   - Successfully verified users are redirected to the dashboard

3. **Task Dashboard** (`/dashboard`)
   - Protected route requiring both valid JWT and OTP verification
   - Create, view, edit, and delete tasks
   - Filter tasks by status (All, Pending, In Progress, Completed)
   - Search tasks by title or description
   - Toggle between light and dark mode

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/login`: Authenticate user and return JWT token
- `POST /api/auth/generate-otp`: Generate and store OTP
- `POST /api/auth/verify-otp`: Verify the entered OTP
- `GET /api/auth/verify`: Verify if the user is authenticated

### Task Management Endpoints
- `GET /api/tasks`: Retrieve all tasks for the authenticated user
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update an existing task
- `DELETE /api/tasks/:id`: Delete a task

## Development Decisions and Assumptions

1. **Authentication Strategy**:
   - JWT tokens are stored in localStorage for simplicity
   - In a production environment, HttpOnly cookies would be more secure

2. **OTP Handling**:
   - OTPs are stored in server memory with a 5-minute expiration
   - For development, OTPs are displayed in server console logs
   - Email sending is implemented but can be easily disabled

3. **Data Persistence**:
   - Using in-memory storage for development speed

4. **UI/UX Choices**:
   - Used Tailwind CSS for rapid UI development and consistent styling
   - Implemented responsive design for all screen sizes
   - Added skeleton loaders and loading states for a smoother user experience
   - Light/Dark mode toggle persists user preference

## Additional Features

1. **Enhanced Security**:
   - Route protection based on authentication state
   - OTP expiration with countdown timer
   - Automatic logout on token expiry

2. **User Experience Improvements**:
   - Toast notifications for all user actions
   - Responsive design for mobile and desktop
   - Loading indicators for all API calls
   - Clear error messages for invalid inputs
   - Light/Dark mode with system preference detection

3. **Task Management**:
   - Real-time status count updates
   - Search functionality across task title and description
   - Filter tasks by status
   - Visual indicators for different task statuses

## Sample Credentials

For testing purposes, you can use the following credentials:

```
Email: thanseehahammed26@gmail.com
Password: thanseeh123
```

## Website Link

Visit the live website: [Task Management with 2FA
](https://task-management-with-2fa.onrender.com/)
