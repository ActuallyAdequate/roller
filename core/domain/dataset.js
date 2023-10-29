const {dialog} = require('electron');
const path = require('path');
const fs = require('fs');

class Dataset {
    constructor() {
        this.settings = undefined;
    }

    getName() {
        if(!this.settings) this.loadDataSet();
        return this.settings.name;
    }

    getView() {
        if(!this.settings?.view) {
            this.loadView();
        }
        return this.settings.view
    }

    loadView() {
        if(!this.settings) return
        const viewPath = path.join(this.settings.root, this.settings.viewName);
        this.settings.view = fs.readFileSync(viewPath).toString();
    }

    loadDataset() {
        const dataSetPath = this.selectDataSet();
        this.settings = this.loadSettings(dataSetPath);
    }

    selectDataSet() {
        const [dataSetPath] = dialog.showOpenDialogSync({
            properties: ['openFile'],
            filters : [
                {name: "RPG Data Set", extensions: ['rpg', 'json']}
            ]
        });
    
        return dataSetPath;
    }

    loadSettings(dataSetPath) {
        const data = fs.readFileSync(dataSetPath);
        const json = JSON.parse(data.toString());
        const root = path.dirname(dataSetPath);

        const name = json.name;
        const viewName = json.view.includes('html') ? `${json.view}` : `${json.view}.html`;
        return {
            root,
            name,
            viewName,
        }
    }
}


module.exports = Dataset;