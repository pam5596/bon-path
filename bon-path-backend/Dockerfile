FROM node:23.0.0

COPY . /bon-path-backend
WORKDIR /bon-path-backend

RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

RUN pnpm install --frozen-lockfile
RUN npm install -g dotenv-cli