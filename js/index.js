const App = require('./App.js');

/*
* pollify to requestAnimationFrame
* value 33 - Used to get 30 frames per seconds
*/
// window.requestAnimationFrame = (function() { 
//     return
//         window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ) { window.setInterval(callback, 33); };
// })();

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
                    .unload().load(e.srcElement.dataset);
            });
        });
    };

   $('.prev-item').addEventListener('click', (e) => {
        e.preventDefault();
        const prevItem = app.prevItem();
        if(prevItem)
            app.unload().load(prevItem);
    });

    $('.next-item').addEventListener('click', (e) => {
        e.preventDefault();
        const nextItem = app.nextItem();
        if(nextItem)
            app.unload().load(nextItem);
    });

    $('.close-video').addEventListener('click', (e) => {
        e.preventDefault();
        app.hideVideo();
        app.unload();
    });

    const data = app
        .getData()
        .then(response => {
            app.buildList(response);
            addEventInPlayItem();
        });    
})();