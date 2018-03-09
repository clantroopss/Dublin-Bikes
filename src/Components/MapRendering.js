import React, { Component } from 'react';
import ReactDOM from 'react-dom'


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

      this.props.stations.map( (station) => {
        heatmapData.push({
          location: new google.maps.LatLng(station.position.lat, station.position.lng),
          weight: station.available_bike_stands
        })

        const marker = new google.maps.Marker({
          position: {lat: station.position.lat, lng: station.position.lng},
          map: this.map,
          title: station.name,
          icon: {
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABsklEQVRIS7XVPajPURzH8df1tFiUYrFiIAyGm4VYKI/ZDLqDgXRzCWU3iCRPJSWTiQhhMV0bi/LUHWRTrBIpD33r+9Pp+N//79f9uWf7dc7n8/7+vg/njJjlNdLDfwUu4RfG8X6QVx/AE2xN04fY+b8Bj7EtTR9gV1/AAlzDFlxEmF7IFE3gQx9AmN8u0hB5H8WLthp2qUFt3ng+T8jvYZA2wCDzz/iBZTiAG30At7CvMAjzzViKp/hatee6Gtb2BxHp/BR9wQa8zu/zOFYZ/uPXBriJscLkOo7ge1txm/02QJzbj3NYkqJXWDMTwF5EP69PcbRg9Pk9LMJpHMIclIEN0/092OTzHR6lwXaszOhPJvQl1haAVl1EEhHcyYvraE5m+M3NiT2M3biPEtBJF4BnWIzVhXmT4oC8wSdsrACddAH4his4MU3hIg0HsbACdNI1gKs4PgNAqy4Ak9mCq/CzgszDW3zEpmqvky4Ae3AXEU0MUQMJ88uZnnhM4lEpVydd089nswZT2aZhtAPLcQanpklfq64cmHiR4m4pBy0KXEdes4bqulwVXW+FgedmHfAHX490ILcnh9AAAAAASUVORK5CYII="
          }
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<h3>${station.name}</h3>
          <h4>Available Bikes: ${station.available_bikes}</h4>
          <h4>Available Bikes Stands: ${station.available_bike_stands}</h4>
          <h4>Status: ${station.status}</h4>
          <h4>${(new Date(station.last_update)).toDateString()}</h4>`
        });
        marker.addListener('click', function() {
          infowindow.open(this.map, marker);
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
      width: '85vw',
      height: '75vh'
    }

    return (
      <div ref="map" style={style}>
        loading map...
      </div>
    )
  }
}