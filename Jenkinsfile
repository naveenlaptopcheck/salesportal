pipeline {
  agent any
 
  environment {
    APP_NAME = "finsiresales"

    //AWS_REGION = 'ap-south-1'
 
    //ECR_REPO_URL = "aws_account_id.dkr.ecr.${AWS_REGION}.amazonaws.com/${APP_NAME}"

    //AWS_ACCESS_KEY_ID = credentials('AKIAZK6ED4L33EGNM35P')

    //AWS_SECRET_ACCESS_KEY = credentials('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')
  }
 
  stages {
    stage('Build Docker Image') {
      steps {
        script {
           sudo docker.build("${APP_NAME}:${BUILD_NUMBER}")

        }
      }
    }
  }
}
