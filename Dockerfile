FROM node:12.13-alpine 

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install nodemon -D
EXPOSE 3333

CMD [ "npm", "run", "dev" ]