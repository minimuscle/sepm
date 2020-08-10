# Tour Guide Manager

![Travis (.com)](https://img.shields.io/travis/com/minimuscle/sepm) ![GitHub issues](https://img.shields.io/github/issues/minimuscle/sepm) ![GitHub top language](https://img.shields.io/github/languages/top/minimuscle/sepm)

Tour Guide Manager is a software solution for the RMIT University class "Software Engineering Project Management". The following documentation will explain how to run the project.

## Pre-Installtion
The project is constructed using [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable). Yarn is a package manager like npm but is much less prone to the issues that npm suffers. Please install it prior to using this sofware. While not 100% essential, any bugs with the use of npm will not be accepted.
You can check to see if yarn is correctly installed:
```bash
yarn --version
```

## Installation
Installation of the node.js packages. 
```bash
yarn
cd api
yarn
cd ../client
yarn
```

The `yarn` command is the same as `npm install`, and actually has the same command (`yarn install`). All 3 are needed as there are essentially 3 services, with the main folder serving only as the launching platform for both the server and the client.

## Running the Software
This software is run using ***Node.js*** as the backend, and ***React.js*** as the front end. They are able to be independantly run, or run together at the same time using the concurrently package. The server is able to be activated from the `./client/` folder, this is to ensure less steps, however, it is functionally the same as navigating to the `./api/` folder and starting the server there.

There are 3 ways to start the servers, below will be the various ways. We recommend the **FIRST** way, as it will be the quickest. However, it may cause errors, so please use the *other* methods before reporting any bugs. The development team also implement a service known as ***Nodemon***. This allows the node.js server to be running while in development, and as such it reloads the server when any changes to the code is saved. 
*Note: Nodemon should **NEVER** be used in production and only in development.*

Recommended way:
```bash
yarn dev

# Runs the following:
concurrently "yarn dev-api" "yarn client"
# This runs 2 commands at the same time, which is good for testing, NOT for production.
# yarn dev-api - runs the node.js server
cd api && nodemon
# yarn client - runs the react.js client
cd client && yarn start
```

Not using Concurrently:
```bash
yarn dev-api

# Open a new Terminal Tab
yarn client
```

Production Release. This would be used when you want to test a production environment:
```bash
cd api
node .

# Open a new Terminal Tab
cd client
yarn start
```

## Testing
Testing is essential within the project, and as thus, testing will be completed throughout the entire project. We aim to have 100% testing coverage. We have yet to implement a coverage monitor. To test, several different commands must be completed:

Testing React.js:
```bash
cd client
yarn test
```

Currently there is no testing suites setup for the node.js server, but when completed, will be added to this README.
