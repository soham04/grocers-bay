FROM --platform=linux/amd64 node:21.6.1-alpine

# Create app directory
WORKDIR /usr/src/app  

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
# Set NODE_ENV to production
ENV NODE_ENV=production

# Install dependencies and build project
RUN npm run build

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
