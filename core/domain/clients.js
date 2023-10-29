
const { randomUUID } = require('crypto');

class ClientDB {
    constructor() {
        this.clients = {}
    }

    addClient(socket) {
        const userID = randomUUID();
        this.clients[userID] = socket;
        return userID
    }

    removeClient(userID) {
        delete this.clients[userID];
    }  
    
    getClient(userID) {
        return this.clients[userID];
    }
}


module.exports = ClientDB