import { CONFIGS as api } from './config.js';
import { HttpFactory } from './HttpFactory.js';

export const App = function() {}

App.prototype._screenElements = {
    collection: document.querySelector('.collection')
}

/**
 * This method will load the datas come from API
 */
App.prototype.getData = function() {
    
    return HttpFactory.get(api.mainUrl, api.confsCors);
}

App.prototype.buildList = function(data) {
   
    const assetsFolder = data.assetsLocation;
    const objects = data.objects;
    
    this._screenElements.collection.innerHTML = objects.map(o => {
        return `
        <li class="collection-item avatar">
            <i class="material-icons circle red"></i>
            <span class="title">${o.name}</span>
            <p>First Line
            <br> Second Line </p>
                <a href="#!" class="secondary-content">
                    <i class="material-icons">grade</i>
                </a>
        </li>
        `
    }).join('');
    console.log(objects);
}

App.prototype.nextItem = function() {
    
}

App.prototype.prevItem = function() {
    
}