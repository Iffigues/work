FROM node:latest

COPY ./react /react

WORKDIR /react

RUN npm install --save-dev xxxxx
RUN npm install -g npm-install-peers
RUN npm install npm@latest -g
RUN npm audit fix --force
RUN npm install
RUN npm i -D webpack-cli
RUN npm install --save-dev xxxxx
RUN npm install -g npm-install-peers
RUN npm-install-peers
RUN npm run client-dev
