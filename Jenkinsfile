pipeline{
    agent { label 'Agent-Vinod' }
    
    stages{
        stage("Code Clone"){
            steps{
                echo "Code Clone Stage"
                git url: "https://github.com/avisubir350/first_website.git", branch: "main"
            }
        }
        stage("Code Build & Test"){
            steps{
                echo "Code Build Stage"
                sh "docker build -t my-app:1.0 ."
            }
        }
        stage("Push To DockerHub"){
            steps{
                withCredentials([usernamePassword(
                    credentialsId:"dockerhubcred",
                    usernameVariable:"dockerHubUser", 
                    passwordVariable:"dockerHubPass")]){
                sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}" 
                sh "docker image tag my-app:1.0 ${env.dockerHubUser}/my-app:1.0"
                sh "docker push ${env.dockerHubUser}/my-app:1.0"
                }
            }
        }
    }
}
