export function fetchData() {
  return fetch(`https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=abf9e3b328f8d505771cd2d3c85ddef36e995451`)
    .then((res) => res.json())
}

export function searchBike(event) {
    var busData = require('../data/nearestbus.json');
    var luasData = require('../data/nearestluas.json');
    var nearestbusobject = undefined;
    var nearestluasobject = undefined;
    var result = {};
    if(event.target.bikes){
        const stationnumber = JSON.parse(event.target.bikes.value);
        result.selectedstation = stationnumber;
        nearestbusobject = busData.filter(function( obj ) {
                                  return obj.stationnumber === stationnumber;
                                });
        result.businfo = nearestbusobject;
        nearestluasobject = luasData.filter(function( obj ) {
                                  return obj.stationnumber === stationnumber;
                                });
        result.luasinfo = nearestluasobject;
    }
    if(event.target.bus){
        const stationnumber = JSON.parse(event.target.bus.value);
        result.selectedstation = stationnumber;
        nearestbusobject = busData.filter(function( obj ) {
                                  return obj.stationnumber === stationnumber[0];
                                });
        result.businfo = nearestbusobject;
    }
    if(event.target.luas){
        const stationnumber = JSON.parse(event.target.luas.value);
        result.selectedstation = stationnumber;
        nearestluasobject = luasData.filter(function( obj ) {
                                  return obj.stationnumber === stationnumber[0];
                                });
        result.luasinfo = nearestluasobject;
    }
  return result;
}

export function bikeInfo() {
  return fetch(`https://api.myjson.com/bins/o2asr`)
    .then((res) => res.json())
}

export function busInfo() {
  return fetch(`https://api.myjson.com/bins/7vfun`)
    .then((res) => res.json())
}
export function luasInfo() {
  return fetch(`https://api.myjson.com/bins/11ebqn`)
    .then((res) => res.json())
}
