FROM node:18

ARG VITE_API_URL
ARG VITE_API_PORT

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_PORT=$VITE_API_PORT

# Create app directory
WORKDIR /usr/src/api

# Install app dependencies
COPY package*.json ./
COPY apps/api ./apps/api
COPY packages ./packages

RUN npm ci --omit=dev

RUN npm build:api

EXPOSE $VITE_API_PORT

CMD ["node", "apps/api/dist"]