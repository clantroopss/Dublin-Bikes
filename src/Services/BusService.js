export function BusData() {
  return fetch(`https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation`)
    .then((res) => res.json())
}