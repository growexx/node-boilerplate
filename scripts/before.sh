#!/bin/bash

export  PATH="/home/ec2-user/.nvm/versions/node/v16.17.1/bin/:$PATH"


pm2 stop all || true
