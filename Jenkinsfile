pipeline {

    agent any

    environment {

        FRONTEND_IMAGE = "kuldeep7860/quicktask-frontend"
        BACKEND_IMAGE  = "kuldeep7860/quicktask-backend"

    }

    stages {

        stage('Clone Repository') {

            steps {

                git branch: 'main',
                url: 'https://github.com/kuldeep265/quicktask.git'

            }
        }

        stage('Build Frontend Docker Image') {

            steps {

                dir('frontend') {

                    bat 'docker build -t %FRONTEND_IMAGE%:latest .'

                }
            }
        }

        stage('Build Backend Docker Image') {

            steps {

                dir('backend') {

                    bat 'docker build -t %BACKEND_IMAGE%:latest .'

                }
            }
        }

        stage('Docker Hub Login') {

            steps {

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'

                }
            }
        }

        stage('Push Frontend Docker Image') {

            steps {

                bat 'docker push %FRONTEND_IMAGE%:latest'

            }
        }

        stage('Push Backend Docker Image') {

            steps {

                bat 'docker push %BACKEND_IMAGE%:latest'

            }
        }

        stage('Deploy Application') {

            steps {

                bat 'docker compose down'

                bat 'docker compose up -d'

            }
        }
    }

    post {

        success {

            echo 'CI/CD Pipeline Executed Successfully'

        }

        failure {

            echo 'Pipeline Failed'

        }
    }
}