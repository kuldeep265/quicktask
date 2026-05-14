# QuickTask - MERN Stack To-Do Application

A full-stack To-Do application built with MERN (MongoDB, Express, React, Node.js) with Docker containerization and Jenkins CI/CD pipeline.

## Project Structure

```
quicktask/
│
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── server.js
│   └── package.json
│
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

## Features

- ✅ Add new tasks
- ✅ View all tasks
- ✅ Mark tasks as completed
- ✅ Delete tasks
- ✅ Responsive UI with modern design
- ✅ Docker containerization
- ✅ Jenkins CI/CD pipeline

## Prerequisites

- Node.js
- MongoDB Compass
- Docker Desktop
- Git
- Visual Studio Code
- Jenkins

## Local Development

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on: http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: http://localhost:3000

## Docker Setup

### Build and Run with Docker Compose

```bash
docker-compose up --build
```

Services:
- Frontend → http://localhost:3000
- Backend → http://localhost:5000
- MongoDB → localhost:27017

## Jenkins CI/CD Setup

1. Install Jenkins from https://www.jenkins.io/
2. Start Jenkins and open http://localhost:8080
3. Install required plugins:
   - Git Plugin
   - Docker Plugin
   - NodeJS Plugin
   - Pipeline Plugin
4. Create a new Pipeline project in Jenkins
5. Connect to your GitHub repository
6. Update the Jenkinsfile with your GitHub repository URL
7. Set up GitHub webhook for automatic builds:
   - Go to your GitHub repository Settings → Webhooks
   - Add webhook URL: `http://YOUR_JENKINS_URL/github-webhook/`

## API Endpoints

- `GET /tasks` - Get all tasks
- `POST /tasks/add` - Add a new task
- `PUT /tasks/:id` - Update task completion status
- `DELETE /tasks/:id` - Delete a task

## Tech Stack

- **Frontend**: React, Axios
- **Backend**: Express, Node.js
- **Database**: MongoDB with Mongoose
- **Containerization**: Docker, Docker Compose
- **CI/CD**: Jenkins

## License

ISC
