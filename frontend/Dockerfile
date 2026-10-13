FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
ENV YARN_NODE_LINKER=node-modules
COPY package.json yarn.lock ./
RUN yarn install --immutable
COPY . .
ARG API_URL=http://backend:3001
ENV API_URL=$API_URL
RUN yarn build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
