#!/bin/bash

# make the out folder, we'll store all packaged games here
mkdir -p out
cd out

# remove old game dir if it's there
rm -f game

# create new dir for game
mkdir game
cd game

# copy all the files in
cp ../../index.html .
cp -r ../../js .
cp -r ../../assets .

# zip it up, quietly, recursively, and compressed with maximum compression
zip -qr9 ../game-$(date +%m-%d-%y:%H:%M:%S).zip *

# clean everything up
cd ../
rm -rf game/
cd ../