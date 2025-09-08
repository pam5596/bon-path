FROM node:23.0.0

COPY . /backend
WORKDIR /backend

RUN npm install
RUN npm install -g dotenv-cli

CMD ["npm", "run", "dev"]