export function fetchPredictions(stationNumber) {
  var d = new Date();
  var weekday = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var day = weekday[d.getDay()];
  var hour = d.getHours() + 1;
  window.prediction = [];
  if(stationNumber && stationNumber.length){
      stationNumber.map((item) => {
          window.prediction.push({
              number : item,
              day: day,
              hour: hour
          })
          return true;
      })
  } else {
      window.prediction.push({
          number : stationNumber,
          day: day,
          hour: hour
      })
  }
  if(window.predictionAll){
      var result = window.predictionAll.filter(function (array) {
                    array.score = Math.round(array.score);
                    return window.prediction.some(function (filter) {
                        return filter.number === array.number && filter.day === array.day && filter.hour === array.hour;
                    });
                });
    return result;
  } else {
    return fetch(`https://cors-anywhere.herokuapp.com/`+`https://s3-eu-west-1.amazonaws.com/dbikesdata/dbikesAll_pred.json`)
            .then(response => response.json())
            .then((responseJson) => {
                window.predictionAll = responseJson;
                var result = responseJson.filter(function (array) {
                    array.score = Math.round(array.score);
                    return window.prediction.some(function (filter) {
                        return filter.number === array.number && filter.day === array.day && filter.hour === array.hour;
                    });
                });
              return result;
            })
  }
}

export function fetchPredictionsDay(stationNumber) {
  var d = new Date();
  var weekday = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var day = weekday[d.getDay()];
  var hour = d.getHours() + 1;
  window.predictionday = {
      number : stationNumber,
      day: day,
      hour: hour
  }
  if(window.predictionDayEntireObject){
      var result = [];
      window.predictionDayEntireObject.map((item) => {
            if(item.number === window.predictionday.number && item.day === window.predictionday.day){
                item.score = Math.round(item.score);
                result.push(item);
            }
            return true;
        })
      return result;
  } else {
      return fetch(`https://cors-anywhere.herokuapp.com/`+`https://s3-eu-west-1.amazonaws.com/dbikesdata/dbikesAll_pred.json`)
            .then(response => response.json())
            .then((responseJson) => {
              window.predictionDayEntireObject = responseJson;
              var result = [];
              responseJson.map((item) => {
                    if(item.number === window.predictionday.number && item.day === window.predictionday.day && item.hour > window.predictionday.hour){
                        item.score = Math.round(item.score);
                        result.push(item);
                    }
                    return true;
                })
              return result;
            })
  }
  
}