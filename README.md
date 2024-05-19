# Real-Time Chat Application - Frontend

## Description

This is the frontend part of a real-time chat application built with React. It provides a user interface for chatting in a universal chat room, handling user authentication, and managing messages.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Demo Credentials](#demo-credentials)
- [Additional Information](#additional-information)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- React
- Vite
- Tailwind CSS
- react-query (Tanstack Query)
- react-hot-toast

## Project Structure

src/
  ├── components/
  │ ├── Login.js
  │ ├── ChatRoom.js
  │ ├── MessageInput.js
  │ ├── Register.js
  ├── services/
  │ ├── authService.js
  │ ├── chatService.js
  ├── App.js
  ├── index.js
  public/
  ├── index.html
  ├── ...
  package.json
  README.md

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DeepakRizal/Universal-chatRoom-app-frontend.git

   ```

2. Install dependencies:
   npm install

3. Start the frontend server:
   npm run dev

Running the Application

1. Ensure the backend server is running.
2. Start the frontend server as mentioned above.
3. Access the application by navigating to http://localhost:5173 in your browser.

Demo Credentials

Use the following credentials to log in and test the application:

Demo User:
Email: natours@gmail.com
Password: 123456

Email: test@gmail.com
Password: 123456

Additional Information

This project uses JWT for authentication.
Real-time communication is handled using Socket.io.
