FROM node:alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm i --silent
RUN npm i concurrently -g
RUN npm install --unsafe-perm -g node-sass

COPY . .