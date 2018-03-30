export function fetchPredictions() {
  return fetch(`https://cors-anywhere.herokuapp.com/`+`https://s3-eu-west-1.amazonaws.com/dbikesdata/dbikesAll_pred.json`)
            .then(response => response.json())
}