pipeline {
  agent any
 
  environment {
    APP_NAME = "finsiresales"
    //DOCKER_REGISTRY = "your-docker-registry"
    //KUBECONFIG = credentials('kubeconfig')
  }
 
  stages {
    stage('Build Docker Image') {
      steps {
        script {
           docker.build("${APP_NAME}:${BUILD_NUMBER}")
          //docker.withRegistry("${DOCKER_REGISTRY}", 'docker-registry-credentials') {
            //docker.push("${APP_NAME}:${BUILD_NUMBER}")
         // }
        }
      }
    }
   
    stage('Deploy to EKS Cluster') {
      steps {
        script {
          sh "kubectl apply -f kubernetes/deployment.yaml"
          sh "kubectl apply -f kubernetes/service.yaml"
        }
      }
    }
  }
}
