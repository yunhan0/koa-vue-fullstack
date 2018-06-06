# Koa Vue Fullstack Boilerplate
##### Vue.js, Koa.js, Node.js, and MongoDB fullstack lightweight example application. Authentication, CRUD, and access Control included.


### Environment:
- Server
    - [Koa](http://koajs.com/)
    - Koa Router, Koa Cors, Koa Bodyparser
    - Mongoose
    - Node v8.9.4
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
```bash
    cd server # You can boost the server by using Docker
    docker-compose up
    # Open a new tab
    cd client
    npm install
    npm start
```

### Setup Locally:
- Steps:
The server and client are completely seperated in this project, so go to each client and server folder and run:

```bash
    cd client
    npm install
    npm start # Running dev client
    # Open a new tab
    mongod    # Boost Mongo DB
    # Open a new tab
    cd server
    npm install
    npm start # Running dev server
```

- Others:
```bash
npm run build      # Running production mode
npm run eslint     # Check your coding style
npm run eslint-fix # Use auto ESLint fix
```