FROM node:14

WORKDIR /usr/src/app/my-app

COPY package*.json ./

RUN yarn

EXPOSE 3333

ENTRYPOINT [ "yarn", "dev" ]