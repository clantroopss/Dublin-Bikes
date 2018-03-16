export function fetchData() {
  return fetch(`https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=abf9e3b328f8d505771cd2d3c85ddef36e995451`)
    .then((res) => res.json())
}

