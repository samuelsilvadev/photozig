import { CONFIGS as api } from './config.js';
import { HttpFactory } from './HttpFactory.js';
import { ConvertTime } from './ConvertTime.js';

export const App = function() {}

App.prototype._screenElements = {
    collection: document.querySelector('.collection'),
    containerVideo: document.querySelector('.container__video'),
    audio: document.querySelector('#audio'),
    canvas: document.querySelector('.canvas')  
}

/**
 * This method will load the datas come from API
 */
App.prototype.getData = function() {
    
    return HttpFactory.get(api.mainUrl, api.confsCors);
}

App.prototype.buildList = function(data) {

    this._objetosCarregados = data.objects;

    const assetsFolder = data.assetsLocation;
    const objects = data.objects;
    
    this._screenElements.collection.innerHTML = objects.map((o, index)=> {
        o.indice = index;
        return `
        <li class="collection-item avatar">
            <img class="material-icons circle" src="${assetsFolder}/${o.im}">
            <span class="title">${o.name}</span>
            <p> ... <br> ... </p>
            <a href="#!" class="play-item secondary-content">
                <i class="material-icons" data-indice="${index}" data-video="${assetsFolder}/${o.bg}" data-music="${assetsFolder}/${o.sg}" >play_circle_outline</i>
            </a>
        </li>`
    }).join('');    
}

App.prototype.openVideo = function() {
    this._screenElements.containerVideo.style.display = "block";
    return this;
}

App.prototype.hideVideo = function() {
    this._screenElements.containerVideo.style.display = "none";
    return this;
}

App.prototype.load = function(itemList) {
    
    const txts = this._objetosCarregados.filter(obj => obj.indice == itemList.indice).txts;

    const context = this._screenElements.canvas.getContext("2d");
    const elementAudio = this._screenElements.audio;
    const elementVideo = document.createElement("video");
    
    elementVideo.src = itemList.video;
    elementVideo.loop = true
    elementAudio.src = itemList.music;
    
    elementVideo.addEventListener('loadeddata', () => {
        
        elementAudio.currentTime = elementVideo.currentTime;

        elementAudio.play();
        elementVideo.play();
        update();
    });
    
    function update(){
        context.drawImage(elementVideo,0,0 ,256,256);
        requestAnimationFrame(update);
    }

    elementAudio.addEventListener('ended', (e) => elementVideo.loop = false);
    elementAudio.addEventListener("timeupdate", (e) => console.log(elementAudio.currentTime));
    return this;
}

App.prototype.nextItem = () => {
    
}

App.prototype.prevItem = () => {
    
}