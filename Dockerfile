FROM node:14.17.5

WORKDIR /usr/app

COPY package*.json .

RUN npm i --no-progress
RUN npm i concurrently -g
RUN npm install --unsafe-perm -g node-sass

COPY . .