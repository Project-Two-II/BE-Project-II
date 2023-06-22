# BUILD STAGE
# ==============

FROM node:16-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build


# PRODUCTION STAGE
# ================

FROM nginx:1.21.6-alpine

COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
