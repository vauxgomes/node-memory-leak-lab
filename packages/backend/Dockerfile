# Node 22 (LTS/Current)
FROM node:22-slim

# Working directory
WORKDIR /app

# 
COPY package*.json ./
COPY packages/backend/package*.json ./packages/backend/
COPY packages/shared/package*.json ./packages/shared/

# 
RUN npm install

# 
COPY packages/shared ./packages/shared
COPY packages/backend ./packages/backend

# New WD
WORKDIR /app/packages/backend

# PORT
EXPOSE 3000

# RUN
CMD ["npx", "tsx", "--env-file=.env", "src/server.ts"]