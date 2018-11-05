FROM node:8.12.0-alpine as builder
WORKDIR /build
COPY package.json tsconfig.json package-lock.json client ./
RUN mkdir -p dist && npm install

COPY src/ ./src/
RUN npm run build

FROM node:8.12.0-alpine as prod
WORKDIR /prod
COPY --from=builder build/dist build/package.json build/package-lock.json client ./
RUN npm install --production
EXPOSE 3000:3000
CMD ["node", "index.js"]