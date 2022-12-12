FROM node:alpine as react-builder

WORKDIR /home/app

COPY . .

RUN npm install

# EXPOSE 3000

CMD [ "npm", "start" ]

# RUN npm run build

# FROM nginx:alpine
# COPY --from=react-builder /home/app/build /usr/share/nginx/html

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# CMD ["nginx", "-g", "daemon off;"]