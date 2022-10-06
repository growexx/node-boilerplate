#!/bin/bash
export  PATH="/home/ec2-user/.nvm/versions/node/v12.14.0/bin/:$PATH"
cd /home/ec2-user/api
if [ "$DEPLOYMENT_GROUP_NAME" == "group-dev-mddata-api" ]; then
    ###Copying env file####
   aws s3 cp s3://mddata-codedeploy-dev-node-api-releases/config/development.env /home/ec2-user/api
   aws s3 cp s3://mddata-codedeploy-dev-node-api-releases/config/privatekey.pem /home/ec2-user/api
   aws s3 cp s3://mddata-codedeploy-dev-node-api-releases/config/testing.env /home/ec2-user/api
    pm2 start dev.json
elif [ "$DEPLOYMENT_GROUP_NAME" == "group-stg-mddata-api" ]; then
    ###Copying env file####
#   aws s3 cp s3://codedeploy-stg-node-api-releases/config/staging.env /home/ec2-user/api
    pm2 start staging.json
#elif [ "$DEPLOYMENT_GROUP_NAME" == "group-ew2-preprod-zsig-node" ]; then
   ###Copying env file####
   #aws s3 cp s3://s3-secure-ew2-prod-zsig-keys/dotenv-preprod/preproduction.env /home/ec2-user
#   cd /home/ec2-user/api
#   pm2 start prod.json
else
  echo "Deployment failed"
fi

