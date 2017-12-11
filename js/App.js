const api = require('./config.js');
const HttpFactory = require('./HttpFactory.js');

const App = function() {

    this._screenElements = {
        collection: document.querySelector('.collection'),
        containerVideo: document.querySelector('.container__video'),
        containerBanner: document.querySelector('.container__banner'),
        audio: document.querySelector('#audio'),
        canvas: document.querySelector('.canvas')  
    }
};

App.prototype.getData = function() {    
    return HttpFactory.getJsonP(api.urlJsonP);
};

App.prototype.buildList = function( data ) {
    this._loadedObjects = data.objects;
    this._screenElements.collection.innerHTML = data.objects.map((o, index)=> {
        o.bg = `${data.assetsLocation}/${o.bg}`;
        o.sg = `${data.assetsLocation}/${o.sg}`;
        o.im = `${data.assetsLocation}/${o.im}`;
        o.indice = index;
        return `
        <li class="collection-item avatar" title="Click on play icon to start a video">
            <img class="material-icons circle" src="${o.im}">
            <span class="title">${o.name}</span>
            <p> ... <br> ... </p>
            <a href="#!" class="play-item secondary-content">
                <i class="material-icons" data-indice="${index}" data-bg="${o.bg}" data-sg="${o.sg}" title="Click here to start a video">play_circle_outline</i>
            </a>
        </li>`
    }).join('');    
};

App.prototype.openVideo = function() {
    this._screenElements.containerBanner.style.display = "none";
    this._screenElements.containerVideo.style.display = "block";
    return this;
};

App.prototype.hideVideo = function() {
    this._screenElements.containerVideo.style.display = "none";
    this._screenElements.containerBanner.style.display = "block";
    return this;
};

App.prototype.load = function( itemList ) {
    
    this._indiceAtual = itemList.indice;
    
    const txts = this._loadedObjects.filter(obj => obj.indice == itemList.indice)[0].txts;
    const context = this._screenElements.canvas.getContext('2d');    
    const elementVideo = document.createElement('video');
    const self = this;
    
    const hasTxts = function() { return txts; }
    const countIsLittleThanTxts = function() { return timeCont < txts.length; }
    const currentTimeIsEqualToObjectTime = function() {
        return parseFloat(self._screenElements.audio.currentTime).toFixed(1) == parseFloat(txts[timeCont].time).toFixed(1);
    }
    
    let timeCont = 0;
    
    elementVideo.src = itemList.bg;
    elementVideo.loop = true
    
    this._screenElements.audio.src = itemList.sg;
    this._videoRefer =  elementVideo;

    this._screenElements.audio.addEventListener('ended', (e) => elementVideo.loop = false);
    elementVideo.addEventListener('loadeddata', () => {
        
        this._screenElements.audio.currentTime = elementVideo.currentTime;
        this._screenElements.audio.play();
        elementVideo.play();
        updateView();
    });

    const updateView = function() {        
        
        context.drawImage(elementVideo,0,0,'600','310');
        
        if( hasTxts() 
        && countIsLittleThanTxts() 
        && currentTimeIsEqualToObjectTime()) {
        
            self._addTextToCanvas(context, txts[timeCont].txt);
            timeCont++;
        }     
        
        requestAnimationFrame(updateView);
    }
    return this;
};

App.prototype.unload = function() {
    if(this._screenElements.audio) this._screenElements.audio.src = "";
    if(this._videoRefer) this._videoRefer.src = "";
    return this;
};

App.prototype.nextItem = function() {    
    return  this._loadedObjects.find(obj => obj.indice == (parseInt(this._indiceAtual) + 1));
};

App.prototype.prevItem = function() {
    return  this._loadedObjects.find(obj => obj.indice == (parseInt(this._indiceAtual) - 1));
};

App.prototype._addTextToCanvas = function( context, text ) {
    
    context.fillStyle = 'white';
    context.font = 'bold 15px sans-serif';
    context.textAlign = "center";
    context.fillText( text, (context.canvas.width / 2), (context.canvas.height / 2) );
    return context;  
};

module.exports = App;