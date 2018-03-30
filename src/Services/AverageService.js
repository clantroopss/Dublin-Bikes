export function AverageService(stationNumber, fromDate, toDate) {
  return fetch(`https://cors-anywhere.herokuapp.com/`+`http://54.246.198.73:8989/dbdataclient?tp1=`+fromDate+`&tp2= `+toDate+`&avg=true&id=` + stationNumber)
            .then(response => response.json())
}