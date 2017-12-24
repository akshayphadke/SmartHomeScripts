#!/bin/bash

# npm stuff
cd philipsHue
npm install
cd ../tplinkToSmartThings
npm install

# Run the node js processes
cd ../philipsHue
node philipsHue.js &
cd ../tplinkToSmartThings
node hs100.js &
