export function fetchLCData() {
  return fetch(`https://cors-anywhere.herokuapp.com/`+`http://localhost:8080/ts/hour/23`)
            .then(response => response.json())
}