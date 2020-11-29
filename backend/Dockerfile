FROM node:lts-slim

RUN npm -g config set user root

RUN npm -g install @foal/cli

RUN mkdir -p /usr/src/sofomo-task

WORKDIR /usr/src/sofomo-task

EXPOSE 3001

CMD [ "npm", "run", "develop" ]