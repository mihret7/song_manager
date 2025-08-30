# Use Node.js official image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json & lock file
COPY package*.json ./

# Install dependencies (only prod dependencies for smaller image)
RUN npm install --production

# Copy the rest of the code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
