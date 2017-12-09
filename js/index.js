const App = require('./App.js');

const initFunction = (function(){
    
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const app = new App();
    app.hideVideo();
    
    const addEventInPlayItem = function() {
        
        [...$$('.play-item')].forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                app.openVideo()
                    .load(e.srcElement.dataset);
            });
        });
    };

   $('.prev-item').addEventListener('click', (e) => {
        e.preventDefault();
        const prevItem = app.prevItem();
        if(prevItem)
            app.load(prevItem);
    });

    $('.next-item').addEventListener('click', (e) => {
        e.preventDefault();
        const nextItem = app.nextItem();
        if(nextItem)
            app.load(nextItem);
    });

    $('.close-video').addEventListener('click', (e) => {
        e.preventDefault();
        app.hideVideo();
    });

    const data = app
        .getData()
        .then(response => {
            app.buildList((response));
            addEventInPlayItem();
        });    
}());