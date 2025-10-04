FROM node:23.0.0

COPY . /backend
WORKDIR /backend

RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

RUN pnpm install --frozen-lockfile
RUN npm install -g dotenv-cli