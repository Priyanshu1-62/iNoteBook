# Stage 1
FROM node:22-alpine AS build

WORKDIR /inotebook

# Keep package layer seperated so Docker does not recreate it on every file change
COPY package.json ./  

RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM nginx:alpine

COPY --from=build /inotebook/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]