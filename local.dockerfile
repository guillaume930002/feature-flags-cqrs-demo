FROM node:16.19.1
WORKDIR /usr/src/app
COPY package.json ./
RUN npm -g add yarn
RUN yarn

COPY . .
RUN yarn build

CMD [ "yarn", "start:prod" ]