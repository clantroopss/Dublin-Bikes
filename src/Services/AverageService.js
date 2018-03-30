export function AverageService(station) {
  return fetch(`https://cors-anywhere.herokuapp.com/`+`http://54.246.198.73:8989/dbdataclient?tp1=2018-03-15&tp2=2018-03-16&avg=true&id=` + station)
            .then(response => response.json())
}