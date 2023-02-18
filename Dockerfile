FROM node:19-slim

RUN npm update -g npm

WORKDIR /code

COPY package*json .

RUN npm install --include=dev

CMD ["npm", "run", "dev"]
