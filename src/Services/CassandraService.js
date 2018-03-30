export function fetchCassandraData(stationNumber,fromDate, toDate ) { 
  return fetch(`https://cors-anywhere.herokuapp.com/`+`http://54.246.198.73:8989/dbdataclient?id=`+ stationNumber + `&tp1=`+fromDate+`&tp2= `+toDate+``)
            .then(response => response.json())
}