#!/bin/bash
echo "";
echo "/***** To make sure install packge successuflly, remove package-lock.json first! ****/ \n"
rm -rf package-lock.json
echo "/***** npm clean ****/ \n"
npm run clean

echo "/***** npm update ****/ \n"
npm update

echo "/***** npm install ****/ \n"
npm install

echo "/***** npm run dev then try to run localhost:8080 ****/ \n\n"
echo "/***** input file at: /data/overlapping.json & output file at /data/overlapping.optimal.json ****/ \n\n"
npm run dev
