FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY . .

RUN npm ci

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
