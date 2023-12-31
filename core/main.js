const electron = require('electron');
const express = require('express');
const {createServer} = require('http');
const { Server } = require('socket.io');
// Module to control application life.
const app = electron.app;
const ipcMain = electron.ipcMain;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

const Manager = require('./domain/manager.js');

if (require('electron-squirrel-startup')) app.quit();

let manager = new Manager();


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });

    ///////////////////////////////////////////////////////////////////////////
    // Electron (electron main - renderer communication)
    ///////////////////////////////////////////////////////////////////////////
    // and load the index.html of the app.
    mainWindow.webContents.loadFile(path.join("server", "build", "index.html"))

    ipcMain.handle("dataset:load", (event) => {
        const datasetName = manager.setupDataset();
        return datasetName;
    });

    ///////////////////////////////////////////////////////////////////////////
    // Server (electron (express)  - client communication)
    ///////////////////////////////////////////////////////////////////////////
    mainWindow.webContents.once("did-finish-load", function () {
        const expressApp = express();
        const httpServer = createServer(expressApp)
        expressApp.use(express.static(path.join(__dirname, 'client', 'build' )))
        expressApp.get("/", (req, res) => {
            res.sendFile("index.html", {root: path.join(__dirname, 'client', 'build')});
        });

        const io = new Server(httpServer, {
            cors: {
                origin: [path.join(__dirname, 'client', 'build')],
                methods: ['GET', 'POST'],
                allowedHeaders: [],
                credentials: true
            }
        });

        
        // A new client connection request received
        io.on("connection", (socket) => {
            const userID = manager.addUser(socket)
            mainWindow.webContents.send('socket:connect', [userID])


            socket.on("disconnect", () => {
                mainWindow.webContents.send('socket:disconnect', [userID])
                manager.removeUser(userID);
            })
        });

        httpServer.listen(8000, () => {
            console.log(`http://localhost:8000`);
        });
    });

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow()
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.