export function fetchData() {
  return fetch(`https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=abf9e3b328f8d505771cd2d3c85ddef36e995451`)
    .then((res) => res.json())
}

export function searchBike(event) {
    const magnitude = event.target.bikes.value
    var busData = require('../data/nearestbus.json');
    var luasData = require('../data/nearestluas.json');
    var result = {};
    var nearestbusobject = busData.filter(function( obj ) {
                                  return obj.stationnumber == magnitude;
                                });
    var nearestluasobject = luasData.filter(function( obj ) {
                                  return obj.stationnumber == magnitude;
                                });
    result.selectedstation = magnitude;
    result.businfo = nearestbusobject;
    result.luasinfo = nearestluasobject;
  return result;
}

export function bikeInfo() {
  return fetch(`https://api.myjson.com/bins/o2asr`)
    .then((res) => res.json())
}