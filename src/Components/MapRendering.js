import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import geolib from 'geolib';

export default class MapRendering extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google || prevProps.stations !== this.props.stations) {
      this.loadMap();
    }
  }
  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = Object.assign({}, {
        center: {lat: 53.350140, lng: -6.266155},
        zoom: 14,
        gestureHandling: "cooperative",
        mapTypeId: 'terrain'
      })
      this.map = new maps.Map(node, mapConfig);
      var heatmapData = [];
      var nearsetbus = [];
      this.props.stations.map( (station) => {
        heatmapData.push({
          location: new google.maps.LatLng(station.position.lat, station.position.lng),
          weight: station.available_bike_stands
        })
          //code to calculate nearset bus stop
        /*var busData = require('../data/busstops.json');
        var geolib = require('geolib');
        var result = geolib.findNearest({latitude: station.position.lat, longitude: station.position.lng}, busData.results, 1)
          
          nearsetbus.push({ stationnumber: station.number ,distance: result.distance, businfo: busData.results[result.key]});*/
          var busData = require('../data/nearestbus.json');
          const marker = new google.maps.Marker({
          position: {lat: station.position.lat, lng: station.position.lng},
          map: this.map,
          title: station.name,
          icon: {
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABsklEQVRIS7XVPajPURzH8df1tFiUYrFiIAyGm4VYKI/ZDLqDgXRzCWU3iCRPJSWTiQhhMV0bi/LUHWRTrBIpD33r+9Pp+N//79f9uWf7dc7n8/7+vg/njJjlNdLDfwUu4RfG8X6QVx/AE2xN04fY+b8Bj7EtTR9gV1/AAlzDFlxEmF7IFE3gQx9AmN8u0hB5H8WLthp2qUFt3ng+T8jvYZA2wCDzz/iBZTiAG30At7CvMAjzzViKp/hatee6Gtb2BxHp/BR9wQa8zu/zOFYZ/uPXBriJscLkOo7ge1txm/02QJzbj3NYkqJXWDMTwF5EP69PcbRg9Pk9LMJpHMIclIEN0/092OTzHR6lwXaszOhPJvQl1haAVl1EEhHcyYvraE5m+M3NiT2M3biPEtBJF4BnWIzVhXmT4oC8wSdsrACddAH4his4MU3hIg0HsbACdNI1gKs4PgNAqy4Ak9mCq/CzgszDW3zEpmqvky4Ae3AXEU0MUQMJ88uZnnhM4lEpVydd089nswZT2aZhtAPLcQanpklfq64cmHiR4m4pBy0KXEdes4bqulwVXW+FgedmHfAHX490ILcnh9AAAAAASUVORK5CYII="
          }
        });
          var filteredobject = busData.filter(function( obj ) {
                                  return obj.stationnumber == station.number;
                                }); 
          if(filteredobject[0] != null){
              const busmarker = new google.maps.Marker({
              position: {lat: parseFloat(filteredobject[0].businfo.latitude), lng: parseFloat(filteredobject[0].businfo.longitude)},
              map: this.map,
              title: filteredobject[0].businfo.fullname,
              icon: {
                url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAReSURBVGhD7VlpTBRnGB5qQH/4QzG2UWOaeEWbaj1j1Rir7m5EAi0aZXdoA2HWA03dxCtV7jYqXsQjwtJYEWU9am0qqGA8kKWAFxIVj6XlBz+a/jEmRo36Z16/d/ab2Znd2cjOzsyi4UmeMPne93sOWMKxTB8+Zljs2cPp43sRya5pSGZzBltZZ4vFwb2al5k5iB6HBe7gLt7Bu/S4d8Dq4O6TYEC4lh6FBe4Iu+QOPeo9iCRcJKVNh+zlArb0FbPpcQhwhjs9fRmaAr6MWcCXM5dF/rsn8b+2HSMAP8rP5Qy7Q7SorPng3QwLbgb0IGpRWePAN8R/yTf238k3JlQoeDXhJF8f79WFqBWsj57ehC9ojOjAe+MnEcE30NgfYkHi/Zq/Hj+RxtEO8pk5gIJvrw6EvYWpsMG13BSWFn0reNIy+2kc7SAiHhQryUuDcVO/NpW78r8Ti3hoHO0Qi6xemS6IT7dPgYU/T+gR5+dPkELhs3w20TpDmoUjehpWBEM4uz7rEbMeDJNC4bN8NoOdLM3C0dAiM7MnQXLFmB4x6eBYKRQ+y2dfLZ4mzcLR0CJm0pAixbnZYFvCmUr01L1Ia80vUHmq01SiZ1+RYIQr8tsJH5QfewzlVUr+Wv1EsadG3Am+h1qoKd8zvIj7+BPILbkDW7bfVuWesvuKQHLiTO0OEjUriLa4a3iRUneHahCRBbvapN1g4kztjsjSig5p1/Aie90PVEOIjKTIT9uUd1Fb3O3dRXa2QZarARal18Ds5D9gVtIZmJf6J6Rl1oErr+XDKHKYfDOn/nBBCK9GLLa+oEXaN6TIjdpCyUBrEVfu30LgOSRwRs5lcOW3wMaiG5CzuQmS2fPCbG7KWThU+UjYv1lboH+RrvqlUiCtRRY7aoWwWeuuhd4j3yu2ZeeE+abiVmG/61Ka/kWgcQA015QQA5/mIkn2GiHoqs1e1Xsp3/tfdhsKm4nXdsHTgCJ+vr0+FLrrvoGH59LC8nFtCjy9MjWE985YoO5IFjR5MkLudPy1BC4e5qChahk8rf9c8kMaUiQW1KdIddw+vvqTttgybh+Nox18OeNR+z+UmcQMNI52fLxFjg8HuLkR4PYWgFNjFYZREbVQE7XRQzbTv0jVpwDP2wHedPv50gdwerzCVBNR41VnQBc9qoZKc/2LNK0ImIlsLwoE0sr24lDdJqc017+Ilws1vEt+jRDnWnm3MFTXS/5ep3P9i1QOAXh2K2D24hHAiVGBQFp5crRfS9RFj8pEaa5/EeRRUqZ5NUDrOoDqkYHzaOkhP81RE7XRQzYzpkgMqE8RN/OjmriZJEXW0DjaAb8z/UiZvM7dQ7rxLbNg/rM78X9ipHh7LVKihpo2ehLvrQBMHI0TPayss4y+E6ukwxn1lx01VLWJJ13RDygaZOLnh1bEwnKHVIwMLYKedEU/LLRzi6ws5yOmXRJZrtPGcul0RTMsdqcDtYK0fdaMbBtd6UMfYgOGeQdL06EQZ3nm6QAAAABJRU5ErkJggg=="
              }
            });
            const businfowindow = new google.maps.InfoWindow({
              content: `<h3>${filteredobject[0].businfo.fullname}</h3>
              <h4>Distance: ${geolib.convertUnit("km", filteredobject[0].distance)} KM</h4>`
            });
            busmarker.addListener('mouseover', function() {
              businfowindow.open(this.map, busmarker);
            });
            busmarker.addListener('mouseout', function() {
              businfowindow.close(this.map, busmarker);
            });
          }

        const infowindow = new google.maps.InfoWindow({
          content: `<h3>${station.name}</h3>
          <h4 style="color: green;">Available Bikes: ${station.available_bikes}</h4>
          <h4 style="color: red;">Available Bikes Stands: ${station.available_bike_stands}</h4>
          <h4>Status: ${station.status}</h4>
          <h4>Nearest Bus Stop: ${filteredobject[0].businfo.fullname}</h4>
          <h4>${(new Date(station.last_update)).toGMTString()}</h4>`
        });
        
        marker.addListener('mouseover', function() {
          infowindow.open(this.map, marker);
        });
        marker.addListener('mouseout', function() {
          infowindow.close(this.map, marker);
        });
          
      })
      const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        radius: 40
      });
      heatmap.setMap(this.map);
    }
  }
  render() {
    const style = {
      height: '85vh'
    }
    return (
        <div ref="map" style={style}>
        loading map...
      </div>
    )
  }
}