FROM node:21

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
RUN npm install multer

COPY ./index.js ./

EXPOSE 2000

CMD ["node", "index.js"]
