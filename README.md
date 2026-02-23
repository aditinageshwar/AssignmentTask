📝 Full-Stack Task Management System

A robust Task Management application built with the MERN stack (specifically NestJS for the backend and React/Vite for the frontend), featuring secure JWT authentication and MongoDB integration.

🚀 Key Fixes Included

Dependency Injection: Resolved the ConfigService resolution error in AuthModule.

JWT Synchronization: Synchronized secret keys using registerAsync and ConfigService.

CORS Handling: Configured backend to allow Authorization headers from the React frontend.

Payload Mapping: Standardized sub to userId mapping between token signing and the JwtStrategy.


🛠️ Tech Stack

Backend:

Framework: NestJS

Database: MongoDB via Mongoose

Security: Passport.js, JWT, Bcrypt

Configuration: @nestjs/config

Frontend:

Library: React (Vite)

Styling: Tailwind CSS

API Client: Axios (with request interceptors)

State Management: React Context API (Auth)

🤖 AI Collaboration Prompts

Build a full-stack Task Management application using NestJS for the backend and React (Vite) with Tailwind CSS for the frontend. The backend should include JWT Authentication using Passport.js and MongoDB for storage. The frontend should have a Login/Register toggle and a Dashboard that allows users to create tasks, view tasks, and filter tasks by status (All/Pending/Completed). Use a shared Axios utility with interceptors to handle the token and ensure the project follows a modular folder structure.

I am getting a NestJS error: 'Nest can't resolve dependencies of the JwtStrategy (?). Please make sure that the argument ConfigService at index [0] is available in the AuthModule context.' How do I properly import the ConfigModule to fix this

My NestJS backend is returning a 401 Unauthorized for valid tokens. How can I use JwtModule.registerAsync with ConfigService to ensure my JWT_SECRET is loaded correctly from the .env file during initialization?

What is the correct way to enable CORS in a NestJS main.ts file to allow a React frontend on port 5173 to send 'Authorization' headers and 'credentials'?

In a NestJS AuthService, should I convert the Mongoose user._id to a string before signing the JWT payload? Show me the code to ensure the payload is compatible with Passport-JWT.

My app keeps showing 'Session Expired' and logging me out immediately after login. How do I fix the 401 Unauthorized error between my React Axios interceptor and the NestJS JwtAuthGuard?