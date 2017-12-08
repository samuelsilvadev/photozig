import { App } from './App.js';

const initFunction = (function(){
    
    const app = new App();
    app.hideVideo();
    
    const addEventInPlayItem = function() {
        
        [...document.querySelectorAll('.play-item')].forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(e.srcElement.dataset);
                app.openVideo()
                    .load(e.srcElement.dataset);
            });
        });
    }

    const data = app
        .getData()
        .then(response => {
            app.buildList(JSON.parse(response));
            addEventInPlayItem();
        });    
}());