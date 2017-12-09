const $ = require('jquery');
/**
 * This class will agregate other functions
 * 
 * GET
 * POST
 * PUT
 * DELETE
 * 
 */

const HttpFactory = {};

HttpFactory.get = function( url, confs ) {
    
    return  new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        
        xhr.open('GET', url, true);
        
        xhr.setRequestHeader('Accept', '*/*'); 
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*'); 
        xhr.setRequestHeader('Content-Type', 'application/json'); 
        
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(xhr);
        xhr.send();
    });
};

HttpFactory.getJsonP = function( url ) {
    
    return new Promise((resolve, reject) => {
        
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'JSONP_CALLBACK',
            success: function ( response ) {
                resolve(response);
            }
        });
    });
};

module.exports = HttpFactory;