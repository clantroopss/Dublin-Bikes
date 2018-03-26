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
        if (this.props.stations.stations) {
          this.props.stations.stations.map( (station) => {
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
              if(this.props.stations.busData && this.props.stations.busData.length === 1) {
                    var nearestbusobject = this.props.stations.busData.filter(function( obj ) {
                            return obj.stationnumber === station.number;
                    });
                    if(nearestbusobject[0] != null){
                      const busmarker = new google.maps.Marker({
                      position: {lat: parseFloat(nearestbusobject[0].businfo.latitude), lng: parseFloat(nearestbusobject[0].businfo.longitude)},
                      map: this.map,
                      title: nearestbusobject[0].businfo.fullname,
                      icon: {
                        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADYElEQVRYR+2XeUgUURzHv++Nu+5sxUYh2UGYRUSE2zIhdOJWfxQGUf1RQXSRBhFFlwRdhFF0GEXQaSdUf3VAVCRUipRG2amum6WuEtslXTqzO7PzXsyYFrmNu2H0zw48Zobf9Xnf95uZNwT/+SD/uT4SAFEV4I+yvUwPFnCtOUNgqvDXy8SBSIjqrMnWwDjPFXMCd37P1QmA3x8r6kliQAj5Uv668O+BDJCfiK1Ooa4vWYXwr+bOAI9nLES48Sy0D91W30ikvkwG4WSRPaf+nCXAm/IlW1u+vduepDdbAiRRDYMdQdOnSUmFxu2W/u8besNFWraOXH4v3xKg8MrRq0XB4TMVTbdMyDjD5iF7QTiwI5AH0sUD9f6rgim2h1d3bsyf1S0ARpIl/U6CEoaTb3O6XK4EQEKBf6LA0tRCswkLg7nd14QXrxdceBAcMJ8xxTKpjbdgQ/pxMA7sD+RC5T0t/RuabZggPD2fl1ewwPpN+HTGWsh1BYh86nJW8Tior5PBI1jjyGk4EDuAmAYQEZB9HTFXyhyobrRFrT12hIbJ7tBPmzgUAAeUOsQBkL0Ocv0+3ms8yKhjAAj0il0Q5ENm4k3nXLj7okdUgOmSjC3zPps2nrIAZMQe81ovXw+95lKsCvwA6J8Pkja7LUHjEwj12QAFGANawwScm3NrO3NAoEAvkYP8+Lzx9PMgA71t8f7b0MuWxQmQNAZEOgVQAVrRNtgcJwwxsOKwC+V+EaS90i9aTB2tYPfiNgWYOAdUOmjSaTfWgH+8Fh+A0YQslAomOyH0rAexG/MFKl7Z8SIQ/cvnHqLCk652IOnKIHCZQnA1Qa1xADbWdRM2Pb98E/zLNDAtnia39o0QsFYKjdpuDZu0cJrlU1BR8UjhHI7uq/4zk6LIoYkTJ4mWACUlJXMJIZnFxcUrAdgZYzBGZmbmGafT+a09mFJqrgnnRgt2PkpLS1cbJmMY8V6v9yAh5FlWVtZpS4B2oyRJRje5jHtN04yR5vP5ArEqI0lSB1g4HEZlZWXUDfAf/ws8Hk8zpbSPUVBVVWMW/auqqt7GCuDxeCKUUnNHrSgKq66ujrq7/iOA2+3eFYlENhBCqKZp5X6/f1ysxQ2/jIyMI7qum1slVVWLa2trp0aLT/wZJRT4Do616jDlHb7WAAAAAElFTkSuQmCC"
                      }
                    });
                    const busDatawindow = new google.maps.InfoWindow({
                      content: `<h3>${nearestbusobject[0].businfo.fullname}</h3>
                      <h4>Distance: ${geolib.convertUnit("km", nearestbusobject[0].distance)} KM</h4>
                      <h4>BusStation ID: ${nearestbusobject[0].businfo.stopid}</h4>`
                    });
                    busmarker.addListener('mouseover', function() {
                      busDatawindow.open(this.map, busmarker);
                    });
                    busmarker.addListener('mouseout', function() {
                      busDatawindow.close(this.map, busmarker);
                    });
                  }
              }
              if(this.props.stations.luasData && this.props.stations.luasData.length === 1) {
                    var nearestluasobject = this.props.stations.luasData.filter(function( obj ) {
                            return obj.stationnumber === station.number;
                    });
                  if(nearestluasobject[0] != null) {
                      const luasmarker = new google.maps.Marker({
                      position: {lat: parseFloat(nearestluasobject[0].luasinfo.latitude), lng: parseFloat(nearestluasobject[0].luasinfo.longitude)},
                      map: this.map,
                      title: nearestluasobject[0].luasinfo.name,
                      icon: {
                        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEIklEQVRYR8WWbUxbVRjH/+fc0sJQBx126uy2WF0guA1NjdCV5raiyJStShgxi2bxDafxg4oazRJdblyiUxMdNr4g0y37MDfHFpTQdaXdtGXL6pcyxoBIdDFEBxvjZZRy6TmmEEgmhd72xux8u+c8z//53ee8PA/BDR7kBsdHSgBWqzVXp9WeZYzlJAKnlHIQst3r9R5W+mMpAVRUVOii0egeQog+YQDOOWXsQ4/fH/pfAJSKpmKnKAM2m80IxuxcEHRKxBljXBOLdZ4MBtuT2ScFKLSIb8sFZe8MrH18KY1NzuhxnliXzMhxKmDJQK+sD/3Yrp8cKPf7/RMLgSwKUFJSkv9PUVWoz/5G9qyAkYxC7NwLFo3M07y02gpP7oa5+bw/T+OOozt2hwPet9ICMBeXvtb79NefDt+aP+1POEPR2HlUszAoofM0O0YIDtxZc938usYtv4RbD9nSAii22nZ0bXFJw7cVQiNHMJv4zPFB0Oj4PM1IrhEcBIQQTGkyp9fNDc5w6Pix9aoAjNkCSq8EIY+PJjtT0+uCJgP92uVoXlkF87cqAbqf3CM5I+1ofLdWUfBZox9+Po6Xug0wud9Xl4ELznqp8oob+z6oSwng0E9u1HYZYDqxUyXApnqp8moaAM1u1J43wNSmFuCxeqlyxI19u1LMQBygwwDTSZUA3RX1klM+hcb3XklpC462tuHZ33Jh8u8Mh06ouQWPuiSz5i9UrYwCnCmC0AgCzvT047tl23BfU41KgEdc0vCyQtw81AMy9xIk5xhbehcYzYC5yakSoMwlDesLZ+63fA2xjLlXOTlF/CE65gyHvGq2wDEDYI/4kc/74NOV4oJwT8LgWjaB6sFvwCDgcN5zkKkO5ma1AKJL4oTik4IePP/UZrz+0V58wZ7ApHZ+U+QYbkLDtiLIsowX9nfhVO5mmFvUAthc0khOAZ651oCN96/C9+FJtGRWJszAiqmLeFHbghjj+FLehEsZK2BuVQHwYMmGuq6yxt0jt6wBYVPIudqJIf2CdWUaKmu8H5wImMhaPv19b0vVr+d8R+LVMGETsWg/YLFYiv5eszXYV/hylqIT9x+jnKEOGH1v1ne0u19NqxrGndZZHv547O7K7YOrypfEs6BkxEty9ugf3NC5P3zTxMXSQCCwYBlN2pLFA4qiWByJMisoV5QJxjkXCO89HQgcTAacFMBut68HY0FQ6vD5fGeSCc6uP+RwDIBzyevzfb6Yz6IAoijmCZSe5cA5QshBwvlqJQCc8xgojbFYbJeGkHKPz+dN+QyIoqgRKHVz4HadTlc8GY1+RoC1SgAATDFgK2WsDpTWMOCBtra23xP5LpgBh8NhIoCbCkKFx+PpVRj4OrPq6mrt0OXLzZyQI16v96uUANIJmI5P0kOYjmgqPv8CVWW3MDgrIWAAAAAASUVORK5CYII="
                      }
                    });
                    const luasDatawindow = new google.maps.InfoWindow({
                      content: `<h3>${nearestluasobject[0].luasinfo.name}</h3>
                      <h4>Distance: ${geolib.convertUnit("km", nearestluasobject[0].distance)} KM</h4>`
                    });
                    luasmarker.addListener('mouseover', function() {
                      luasDatawindow.open(this.map, luasmarker);
                    });
                    luasmarker.addListener('mouseout', function() {
                      luasDatawindow.close(this.map, luasmarker);
                    });
                  }
              }



            const infowindow = new google.maps.InfoWindow({
              content: `<h3>${station.name}</h3>
              <h4 style="color: green;">Available Bikes: ${station.available_bikes}</h4>
              <h4 style="color: red;">Available Bikes Stands: ${station.available_bike_stands}</h4>
              <h4>Status: ${station.status}</h4>
              <h4>${(new Date(station.last_update)).toGMTString()}</h4>`
            });

            marker.addListener('mouseover', function() {
              infowindow.open(this.map, marker);
            });
            marker.addListener('mouseout', function() {
              infowindow.close(this.map, marker);
            });

          })
        }
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