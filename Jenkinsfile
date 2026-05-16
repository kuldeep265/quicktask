pipeline {

    agent any

    stages {

      



        stage('Build Docker Containers') {

            steps {

                bat 'docker-compose up --build -d'

            }

        }



        stage('Test') {

            steps {

                echo 'Testing Application'

            }

        }



        stage('Deploy') {

            steps {

                echo 'Deployment Successfull'

            }

        }

    }

}