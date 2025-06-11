FROM node:24-alpine3.21

RUN apk add --no-cache openssl openssl-dev

WORKDIR /var/www/sambal_server

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start"]