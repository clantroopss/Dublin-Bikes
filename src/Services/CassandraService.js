export function fetchCassandraData(event) { 
  return fetch(`https://cors-anywhere.herokuapp.com/`+`http://54.246.198.73:8989/dbdataclient?id=56&tp1=2018-03-15&tp2=2018-03-16`)
            .then(response => response.json())
}