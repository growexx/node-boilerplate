#!/usr/bin/env bash
sleep 10

nc -zv 127.0.0.1 3000

if [ $? -eq 0 ]; then
    echo service started succesfully
else
    echo service failed to start
fi
