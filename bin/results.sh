#!/usr/bin/env bash

totalYes=$(curl -X GET "https://app.greenpeace.org.ar/api/v1/forma/form/75" | jq '.total')
sleep 1
totalNo=$(curl -X GET "https://app.greenpeace.org.ar/api/v1/forma/form/77" | jq '.total')

if ! [ -f ./results.csv ]; then
  touch ./results.csv
  echo "Fecha,Sí,NO" > ./results.csv
fi

today="$(date +%F) $(date +%H:%M:%S)"
echo "$today,$totalYes,$totalNo" >> ./results.csv
