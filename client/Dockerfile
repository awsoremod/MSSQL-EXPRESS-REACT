# Stage 1
FROM node:16-alpine as build-stage
WORKDIR /client
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL
RUN npm run build
# Stage 2
FROM nginx:1.23.0-alpine
COPY --from=build-stage /client/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]