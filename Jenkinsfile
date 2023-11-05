pipeline {
    agent any
    
    environment {
        // Define environment variables here          
        // REMOTE_SERVER = '209.97.134.94'
        BREMOTE_SERVER = '10.106.0.3'
        CREMOTE_SERVER = '10.106.0.2'
        REMOTE_USER = 'root'
        REMOTE_PORT = '22' // Default SSH port
        //PROJECT_DIR = '/usr/share/nginx/html/my-react-app' // Remote directory where your project should be deployed
        CPROJECT_DIR = '/var/www/html' // Remote directory where your project should be deployed
        BPROJECT_DIR = '/backend'
        //GIT_URL = 'https://github.com/MujWorks/yuproject2.git' // Remote directory where your project should be deployed
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from your GitHub repository
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'CleanBeforeCheckout']], userRemoteConfigs: [[url: 'https://github.com/MujWorks/yuproject2.git']]])
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'npm install'  // Replace with your npm build commands for the frontend
                    sh 'npm run build'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'  // Replace with your npm build commands for the backend
                    //sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                // Copy the built project to the Nginx server using SSH                      
                script {
                    sshagent(['MySSHKey']) {
                        //sh "scp -r -P ${REMOTE_PORT} build/* ${REMOTE_USER}@${REMOTE_SERVER}:${PROJECT_DIR}"

                        //detailed debugging
                        // ssh -o StrictHostKeyChecking=no -p ${REMOTE_PORT} ${REMOTE_USER}@${REMOTE_SERVER} 'mkdir -p ${PROJECT_DIR}'                        
                        sh """
                        set -x
                        ssh -o StrictHostKeyChecking=no -p ${REMOTE_PORT} ${REMOTE_USER}@${CREMOTE_SERVER} 'mkdir -p ${CPROJECT_DIR}'
                        scp -r -P ${REMOTE_PORT} client/build/* ${REMOTE_USER}@${CREMOTE_SERVER}:${CPROJECT_DIR}
                        ssh -o StrictHostKeyChecking=no -p ${REMOTE_PORT} ${REMOTE_USER}@${BREMOTE_SERVER} 'mkdir -p ${BPROJECT_DIR}'
                        scp -r -P ${REMOTE_PORT} backend/* ${REMOTE_USER}@${BREMOTE_SERVER}:${BPROJECT_DIR}/backend
                        """
                    }
                }
            }
        }

        // stage('Deploy') {
        //     steps {
        //         // Copy the built project to the Nginx server using SSH    
        //         sh "ssh -o StrictHostKeyChecking=no -p ${REMOTE_PORT} ${REMOTE_USER}@${REMOTE_SERVER} 'mkdir -p ${PROJECT_DIR}'"
        //         sh "scp -o StrictHostKeyChecking=no -r -P ${REMOTE_PORT} build/* ${REMOTE_USER}@${REMOTE_SERVER}:${PROJECT_DIR}"
        //     }
        // }
    }
}
