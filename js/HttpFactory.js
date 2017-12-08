/**
 * This class will agregate other functions
 * 
 * GET
 * POST
 * PUT
 * DELETE
 * 
 */

export const HttpFactory = {};

HttpFactory.get = function(url, confs) {
    
    return  new Promise((resolve, reject) => {

        const xhr = createCORSRequest('GET', url);
        
        if (!xhr) {
            alert('CORS not supported');
            return;
        }

        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(xhr);
        
       // xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true'); 
        //xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
       // xhr.responseType = 'json';
        xhr.send();
    });
}

// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    } else {
        xhr = null;
    }
    return xhr;
  }