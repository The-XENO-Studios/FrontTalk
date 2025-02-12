# FrontTalk

FrontTalk is an open-source project built with Next.js and Firebase to handle real-time messaging for customer service. This project leverages the power of Next.js for server-side rendering and Firebase for real-time database capabilities. Using third party customer chat service can be expensive. But it can be free of cost if you know how to do it. Self host your own customer service chat system.

## What's included

- The client side chat bubble component for customers
- A demo admin dashboard for checking the messages

## What you have to implement

This project doesn't have any Authentication system set up. Because that's up to you. Authentication may vary from project to project. But as this project doesn't have any auth system means that you can use any auth system as you like.

## Features

- Real-time messaging with Firebase
- Server-side rendering with Next.js
- User authentication and management
- Responsive design with CSS
- Easy deployment

## Installation

Follow these steps to get started with FrontTalk:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/The-XENO-Studios/FrontTalk.git
   cd FrontTalk
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a Firebase project:**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.
   - Enable Firebase Authentication.
   - Set up the Firebase Realtime Database.

4. **Set up environment variables:**
   - Create a `.env.local` file in the root directory of the project.
   - Add your Firebase configuration to the `.env.local` file. Example:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

## Summary

FrontTalk is designed to be a simple yet powerful messaging platform that utilizes the latest web technologies. The combination of Next.js and Firebase provides a seamless development experience with real-time capabilities. Contributions are welcome, and feel free to open issues or pull requests.

---

Feel free to modify this draft to better fit your project's specifics.
