pipeline {
    agent any
    stages {
        stage('Compile & Build') {
            steps {
                echo "Building" 
                sh '(docker stop $(docker ps -q --filter ancestor=sadfront)) || true'
                sh 'docker build -t sadfront .'
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying"
                sh 'docker run --name front --rm -d -p 4200:4200 sadfront'
            }
        }
    }
}
