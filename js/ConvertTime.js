
const ConvertTime = function() {};

ConvertTime.toMinutes = function(timestamp) {
    return Math.floor(timestamp / 60);
}

ConvertTime.toSeconds = function(timestamp) {
    return timestamp - ConvertTime.toMinutes(timestamp) * 60; 
}

export default ConvertTime;