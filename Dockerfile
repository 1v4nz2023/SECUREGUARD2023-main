FROM node:16-bullseye

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

RUN npm rebuild bcrypt --build-from-source


CMD ["npm","start"]

