pipeline {
    agent any

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
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    bat 'echo %DOCKER_PASSWORD%| docker login -u %DOCKER_USERNAME% --password-stdin'
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
