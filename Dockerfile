# Stage 1
FROM node AS build

WORKDIR /inbclient

# Keep package layer seperated so Docker does not recreate it on every file change
COPY package.json ./  

RUN npm install

COPY . .

VITE_BACKEND_URL=http://localhost:5000

RUN npm run build

# Stage 2
FROM nginx

COPY --from=build /inbclient/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]