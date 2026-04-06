# Project Management API

A backend REST API for a multi-user project and task management platform built with **Node.js**, **Express**, and **MongoDB**.

**Repository:** https://github.com/ranjanthapa/project-mangement

---

## Environment Variables

Create a `.env` file in the root of the project with the following variables:
```env
CONNECTION_STRING=""
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```


## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod
- **Password Hashing:** bcrypt

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/ranjanthapa/project-mangement
cd project-mangement
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/projectmanagement
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

### Run the App

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:3000`

---

## API Reference

### Base URL

```
http://localhost:3000/api
```

### Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_token>
```

---

## User Module

### Register User

```
POST /api/user
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@e.com",
  "password": "secret123",
  "role": "admin"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "user registered successfully",
  "result": {
    "name": "John Doe",
    "email": "john@e.com",
    "role": "admin",
    "status": "active",
    "_id": "69d3a90199c76fd5c776f56f",
    "createdAt": "2026-04-06T12:37:21.383Z",
    "updatedAt": "2026-04-06T12:37:21.383Z"
  }
}
```

---

### Login

```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@e.com",
  "password": "secret123"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Get All Users *(Admin only)*

```
GET /api/user?page=1&limit=2
```

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page |
| sort | string | createdAt | Sort field |

**Response:**
```json
{
  "status": "success",
  "data": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 2,
    "totalPages": 25,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## Project Module

### Create Project *(Authenticated)*

```
POST /api/project
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Project Management App",
  "description": "A platform to manage tasks and projects"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "name": "Project Management App",
    "description": "A platform to manage tasks and projects",
    "owner": "69d36baeb873577b453ec7b7",
    "members": ["69d36baeb873577b453ec7b7"],
    "_id": "69d37696f0f5df97853d5e0a",
    "createdAt": "2026-04-06T09:02:14.047Z",
    "updatedAt": "2026-04-06T09:02:14.047Z"
  }
}
```

---

### Add Member *(Project Owner only)*

```
POST /api/project/:projectId/:memberId
```

**Headers:** `Authorization: Bearer <owner_token>`

**Example:**
```
POST /api/project/69d37696f0f5df97853d5e0a/69d3689f2f603d9affbca3e7
```

---

### Remove Member *(Project Owner only)*

```
DELETE /api/project/:projectId/members/:memberId
```

**Headers:** `Authorization: Bearer <owner_token>`

**Example:**
```
DELETE /api/project/69d37696f0f5df97853d5e0a/members/69d3689f2f603d9affbca3e7
```

---

## Task Module

### Create & Assign Task *(Project Owner only)*

```
POST /api/project/:projectId/task
```

**Headers:** `Authorization: Bearer <owner_token>`

**Request Body:**
```json
{
  "title": "Design landing page",
  "description": "Create wireframes for the landing page",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-12-31",
  "assignedTo": "69d36baeb873577b453ec7b7"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "task assign successfully",
  "data": {
    "title": "Design landing page",
    "description": "Create wireframes for the landing page",
    "status": "todo",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "project": "69d37696f0f5df97853d5e0a",
    "assignedTo": "69d36baeb873577b453ec7b7",
    "createdBy": "69d36baeb873577b453ec7b7",
    "_id": "69d3a66299c76fd5c776f56e",
    "createdAt": "2026-04-06T12:26:10.441Z",
    "updatedAt": "2026-04-06T12:26:10.441Z"
  }
}
```

---

### Update Task *(Assigned Member only)*

```
PATCH /api/tasks/:taskId
```

**Headers:** `Authorization: Bearer <member_token>`

**Request Body:**
```json
{
  "status": "done"
}
```

---

### Delete Task *(Project Owner only)*

```
DELETE /api/tasks/:taskId
```

**Headers:** `Authorization: Bearer <owner_token>`

---

### Get All Tasks *(Project Members)*

```
GET /api/project/:projectId/tasks
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| status | string | Filter by status (`todo`, `in-progress`, `done`) |
| priority | string | Filter by priority (`low`, `medium`, `high`) |
| assignedTo | string | Filter by assigned user ID |
| search | string | Search by title or description |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| sort | string | Sort field (default: createdAt) |

**Example:**
```
GET /api/project/69d37696f0f5df97853d5e0a/tasks?search=landing
GET /api/project/69d37696f0f5df97853d5e0a/tasks?status=todo&priority=high&page=1&limit=5
```

---

## Roles & Permissions

| Action | User (Owner) | User (Member) | Admin |
|--------|-------------|---------------|-------|
| Register/Login | ✅ | ✅ | ✅ |
| View all users | ❌ | ❌ | ✅ |
| Create project | ✅ | ✅ | ✅ |
| Edit project | ✅ own only | ❌ | ✅ |
| Delete project | ❌ | ❌ | ✅ |
| Add/remove members | ✅ own only | ❌ | ✅ |
| Create & assign task | ✅ own only | ❌ | ✅ |
| Update task | ✅ | ✅ assigned only | ✅ |
| Delete task | ✅ own only | ❌ | ✅ |
| View tasks | ✅ | ✅ | ✅ |

---

## Error Responses

All errors follow this format:

```json
{
  "status": "error",
  "message": "Error description here"
}
```

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request — validation error |
| 401 | Unauthorized — missing or invalid token |
| 403 | Forbidden — insufficient permissions |
| 404 | Not Found — resource not found |
| 409 | Conflict — email already in use |
| 500 | Internal Server Error |
