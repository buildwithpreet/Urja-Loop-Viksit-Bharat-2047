# UrjaLoop Smart Waste Management Backend

This is the production-ready backend for the UrjaLoop system, built with Node.js, Express, TypeScript, and MongoDB.

## Features Included
- **Authentication**: Firebase Admin SDK integration with custom JWT verification middleware.
- **Role-Based Access Control**: Middleware to restrict routes for Citizens, Admins, and Municipal users.
- **Smart Bin Management**: IoT integration endpoints with Real-time Socket.IO events.
- **AI Integration Endpoint**: Boilerplate for Roboflow/Teachable Machine waste classification.
- **Route Optimization logic**: Framework for TSP algorithms and Google Maps API.
- **User Wallet & Rewards**: Track carbon credits and unique QR identities.
- **DevOps Ready**: Docker and Docker Compose setup for production deployment.
- **Swagger Documentation**: Accessible at `/api-docs`.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Docker and Docker Compose
- A Firebase Project (with Admin SDK Service Account credentials)

### Local Setup
1. Duplicate `.env.example` to `.env` and fill in your actual credentials.
2. Ensure you have MongoDB and Redis running, OR use Docker.

#### Using Docker (Recommended for Local Dev)
```bash
docker-compose up --build
```
This will start MongoDB, Redis, and the Backend API on `http://localhost:5000`.

#### Using Local Node
```bash
npm install
npm run dev
```

### API Documentation
Once the server is running, visit:
`http://localhost:5000/api-docs` to view the OpenAPI (Swagger) interface.

## Tech Stack
- **Framework**: Express (Node.js) + TypeScript
- **Database**: MongoDB (Mongoose)
- **Cache / Events**: Redis
- **Real-time**: Socket.IO
- **Validation**: Zod
- **Documentation**: Swagger UI
