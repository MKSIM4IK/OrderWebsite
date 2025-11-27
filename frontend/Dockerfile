# Build stage
FROM node:18-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./
RUN npm ci --silent

COPY . .
RUN npm run build

# Production stage - serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
