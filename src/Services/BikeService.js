export function fetchData() {
  return fetch(`https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=abf9e3b328f8d505771cd2d3c85ddef36e995451`)
    .then((res) => res.json())
}

export function searchBike(event) {
    var busData = require('../data/nearestbus.json');
    var luasData = require('../data/nearestluas.json');
    var result = {};
    if(event.target.bikes){
        const stationnumber = event.target.bikes.value
        result.selectedstation = stationnumber;
        var nearestbusobject = busData.filter(function( obj ) {
                                  return obj.stationnumber == stationnumber;
                                });
        result.businfo = nearestbusobject;
        var nearestluasobject = luasData.filter(function( obj ) {
                                  return obj.stationnumber == stationnumber;
                                });
        result.luasinfo = nearestluasobject;
    }
    if(event.target.bus){
        const stationnumber = event.target.bus.value
        result.selectedstation = stationnumber;
        var nearestbusobject = busData.filter(function( obj ) {
                                  return obj.stationnumber == stationnumber;
                                });
        result.businfo = nearestbusobject;
    }
    if(event.target.luas){
        const stationnumber = event.target.luas.value
        result.selectedstation = stationnumber;
        var nearestluasobject = luasData.filter(function( obj ) {
                                  return obj.stationnumber == stationnumber;
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
  return fetch(`https://api.myjson.com/bins/ynmf7`)
    .then((res) => res.json())
}

export function luasInfo() {
  return fetch(`https://api.myjson.com/bins/188p9f`)
    .then((res) => res.json())
}