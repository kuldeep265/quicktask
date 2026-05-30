pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/kuldeep265/quicktask.git'
            }
        }

        stage('Build and Deploy') {
            steps {
                bat 'docker compose down --remove-orphans || exit 0'
                bat 'docker compose up -d --build'
            }
        }

        stage('Verify Services') {
            steps {
                bat 'docker compose ps'
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
