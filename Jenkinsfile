pipeline {
    agent any

    environment {
        DOCKERHUB_REPO = 'kuldeep265'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/kuldeep265/quicktask.git'
            }
        }

        stage('Build and Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                    bat 'docker compose build'
                    bat 'docker compose push backend frontend'
                }
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker compose down --remove-orphans || exit 0'
                bat 'docker compose up -d'
            }
        }
    }

    post {
        success {
            echo 'QuickTask deployed at http://localhost:3002'
        }

        failure {
            echo 'Deployment failed'
        }
    }
}
