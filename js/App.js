const api = require('./config.js');
const HttpFactory = require('./HttpFactory.js');

const App = function() {};

App.prototype._screenElements = {
    collection: document.querySelector('.collection'),
    containerVideo: document.querySelector('.container__video'),
    containerBanner: document.querySelector('.container__banner'),
    audio: document.querySelector('#audio'),
    canvas: document.querySelector('.canvas')  
};

App.prototype.getData = function() {
    
    return HttpFactory.getJsonP(api.urlJsonP);
};

App.prototype.buildList = function( data ) {
    this._objetosCarregados = data.objects;
    this._screenElements.collection.innerHTML = data.objects.map((o, index)=> {
        o.bg = `${data.assetsLocation}/${o.bg}`;
        o.sg = `${data.assetsLocation}/${o.sg}`;
        o.im = `${data.assetsLocation}/${o.im}`;
        o.indice = index;
        return `
        <li class="collection-item avatar">
            <img class="material-icons circle" src="${o.im}">
            <span class="title">${o.name}</span>
            <p> ... <br> ... </p>
            <a href="#!" class="play-item secondary-content">
                <i class="material-icons" data-indice="${index}" data-bg="${o.bg}" data-sg="${o.sg}" >play_circle_outline</i>
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

    const txts = this._objetosCarregados.filter(obj => obj.indice == itemList.indice)[0].txts;
    const context = this._screenElements.canvas.getContext('2d');
    const elementAudio = this._screenElements.audio;
    const elementVideo = document.createElement('video');    

    if(txts) {
        txts.forEach(element => {
            let track = elementVideo.addTextTrack('subtitles', 'English', 'en');
            track.mode = 'showing';
            track.addCue(new VTTCue(parseInt(element.time), parseInt(element.time) + 5, element.txt));
            //track.addCue(new TextTrackCue('Test text', element.time, element.time + 2, '', '', '', true));
        });
    }

    elementVideo.src = itemList.bg;
    elementVideo.loop = true
    elementAudio.src = itemList.sg;
    
    elementAudio.addEventListener('ended', (e) => elementVideo.loop = false);
    elementVideo.addEventListener('loadeddata', () => {
        
        elementAudio.currentTime = elementVideo.currentTime;
        elementAudio.play();
        elementVideo.play();
        update();
    });

    const update = function(){
        context.drawImage(elementVideo,0,0,'600','310');
        requestAnimationFrame(update);
    }
    return this;
};

App.prototype.unload = function() {

};

App.prototype.nextItem = function() {    
    return  this._objetosCarregados.find(obj => obj.indice == (parseInt(this._indiceAtual) + 1));
};

App.prototype.prevItem = function() {
    return  this._objetosCarregados.find(obj => obj.indice == (parseInt(this._indiceAtual) - 1));
};

const addTextToCanvas = function( context, text ) {
    
    context.fillStyle = 'white';
    context.font = 'bold 20px sans-serif';
    context.textBaseline = 'bottom';
    context.textAlign = "center";
    context.fillText( text, 10 , (context.canvas.height - 10) );
    return context;  
};

module.exports = App;