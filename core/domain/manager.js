const ClientDB = require('./clients.js');
const Dataset = require('./dataset.js');
const EventEmitter = require('node:events');

class Manager {
    constructor() {
        this.dataset = new Dataset();
        this.clientDB = new ClientDB();
        this.eventEmitter = new EventEmitter();
        this.datasetReady = false;
    }

    setupDataset() {
        this.dataset.loadDataset();
        const name = this.dataset.getName();
        this.datasetReady = true;
        for (const [userID, socket] of Object.entries(this.clientDB.clients)) {
            socket.emit('view:ready', this.dataset.getView());
        }
        return name;
    }

    addUser(socket) {
        const userID = this.clientDB.addClient(socket);
        if(this.datasetReady) socket.emit('view:ready', this.dataset.getView());
        return userID;
    }

    removeUser(userID) {
        this.clientDB.removeClient(userID);
    }
}

module.exports = Manager;
