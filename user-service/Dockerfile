FROM --platform=linux/amd64 node:21.6.1-alpine

# Create app directory
WORKDIR /usr/src/app  

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package*.json ./

RUN npm install

COPY . .

# Copy the service account key into the container
COPY ./credentials/user-service-gcp-credentials.json /usr/src/app/credentials/user-service-gcp-credentials.json

# Set the environment variable to point to the service account key
ENV GOOGLE_APPLICATION_CREDENTIALS /usr/src/app/credentials/user-service-gcp-credentials.json

# Install dependencies and build project
RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000
