export function fetchCassandraData(stationNumber,fromDate, toDate ) { 
  return fetch(`https://cors-anywhere.herokuapp.com/`+`http://54.246.198.73:8989/dbdataclient?id=`+ stationNumber + `&tp1=`+fromDate+` 00:00&tp2= `+toDate+` 23:59`)
            .then(response => response.json())
}