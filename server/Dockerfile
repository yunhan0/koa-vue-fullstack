# Use an node 10 runtime as a parent image
FROM node:10.12.0

# Set environment vaiable: server port as 3002
ENV AUTH_SECRET=vHJcV7

# Set the working directory to /server
WORKDIR /server

# Copy the current directory contents into the container at /server
ADD . /server

RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

CMD ["npm", "run", "build"]
