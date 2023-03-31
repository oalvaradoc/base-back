FROM mcr.microsoft.com/mssql/server
USER root
COPY ./Create-database.sql .
COPY ./start.sh .
COPY ./entrypoint.sh .
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=Oma.2017
RUN chmod +x ./start.sh .
CMD /bin/bash ./entrypoint.sh

# # Base image
# FROM node:18.15.0

# # Create app directory
# WORKDIR /usr/src/app

# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./

# # Install app dependencies
# RUN yarn install

# # Bundle app source
# COPY . .

# # Creates a "dist" folder with the production build
# RUN yarn run build

# # Start the server using the production build
# CMD [ "node", "dist/main.js" ]


