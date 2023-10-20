# Roller

An Advanced Rolling App

## Features

## Explanation of Boilerplate

This electron app is able to run two react apps, one as the view for the host run in electron, and a second react app which is served so that others can join on the local network.

### Setting up client

The client frontend is stored in `client/` and contains a react app that will be served to anyone connecting to port 8000. Mae sure you cd into this directory and run npm install first.

### Setting up server

The 'server' frontend (renderer process of electron) is in the `server/` directory, again you will need to cd and run npm install in this directory.

### Electron main process

The electron main process starts with the main.js folder in the root direcotry however any additional scripts relating to your business logic can go in the `domain/` folder.

### Dev and Build

`npm run start` will build both the client and server react apps then run electron on main.js, you can then access the client thorugh http://localhost:8000

`npm run make` will use electron forge to build your electrong app which will be avaible in the `out/` directory