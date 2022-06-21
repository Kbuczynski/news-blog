FROM node:16.14.2

WORKDIR /usr/app

COPY package*.json .

RUN npm i --no-progress
RUN npm i concurrently -g
RUN npm i pg -g
RUN npm install --unsafe-perm -g node-sass

COPY . .