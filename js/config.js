
export const CONFIGS = (function() {
    
    const headers = new Headers({
        'Content-Type' : 'text/plain',
        'Access-Control-Allow-Credentials': 'true'
    });

    return {
        mainUrl: 'http://pbmedia.pepblast.com/pz_challenge/assets.json',
        confsCors: { 
            method: 'GET',
            mode: 'no-cors'            
        }
    }
}());