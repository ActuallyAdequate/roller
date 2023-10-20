const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  socket : {
    onConnect: (callback) => ipcRenderer.on('socket:connect', (event, args) => {callback(args)}),
    onDisconnect: (callback)=> ipcRenderer.on('socket:disconnect', (event, args) => {callback(args)}),
  }
})