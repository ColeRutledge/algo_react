# --- build ---

FROM node:12.22.12 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY public/ ./public/
COPY src/ ./src/

RUN npm run build


# --- prod ---

FROM nginx:stable-alpine AS production

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
