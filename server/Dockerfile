# Use an node 8 runtime as a parent image
FROM node:8.9.4

# Set the working directory to /server
WORKDIR /server

# Copy the current directory contents into the container at /server
ADD . /server

RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

CMD ["npm", "start"]