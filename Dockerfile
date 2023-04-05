FROM node:latest

# ENV POSTGRES_PASSWORD: mysecretpassword

WORKDIR /srv

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]