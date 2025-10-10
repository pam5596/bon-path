FROM node:23.0.0

COPY . /bon-path-backend
WORKDIR /bon-path-backend

# RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

RUN npm install --legacy-peer-deps
RUN npm install -g dotenv-cli