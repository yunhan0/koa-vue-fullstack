# Koa Vue Fullstack Boilerplate
##### Vue.js, Koa.js, Node.js, and MongoDB fullstack lightweight example application. Authentication, CRUD, and access Control included.


### Environment:
- Server
    - [Koa](http://koajs.com/)
    - Koa Router, Koa Cors, Koa Bodyparser
    - Mongoose
    - Node
- Client
    - [Vue](https://vuejs.org/)
    - [iView](https://www.iviewui.com/)
    - [Axios](https://github.com/axios/axios) (HTTP Client Library)
    - Webpack
    - WebpackDevServer (Development mode only)

### Architecture

    ├─client               # frontend folder
    │  ├─src               # frontend src
    │  │  ├─api
    │  │  ├─router
    │  │  ├─styles
    │  │  ├─components
    │  │  ├─store          # state management
    │  │  │  └─modules
    │  │  └─view           # app pages
    │  │     └─auth
    │  └─static            # static folder
    |
    └─server               # server folder
       └─src               # server src
          ├─api            # server api list
          │  ├─auth        # completely token-based authentication
          │  ├─thing
          │  └─user
          ├─config         # server configurations
          │  ├─index       # default server port, mongo uri, etc settings
          │  ├─security    # security settins
          │  └─seed        # populate database with sample data on server start
          ├─entry.js       # entry file for environment setup
          ├─main.js        # main file after entry
          └─routes.js      # router

### Run through Docker
You can boost the server by using Docker

    cd server
    docker-compose up

### Installation:
The server and client are completely seperated in this project, so go to each client and server folder and run:

    npm install

###### Running dev client:

    npm start

##### Running production client:

    npm run build

##### Running server:

    npm start
