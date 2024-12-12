FROM node:18-alpine AS builder

RUN apk add --no-cache bash curl openssl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

COPY prisma-mg.sh .
RUN chmod +x prisma-mg.sh

EXPOSE 3000

CMD ["./prisma-mg.sh"]