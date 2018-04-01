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
                center: {lat: 53.346057, lng: -6.268001},
                zoom: 14,
                gestureHandling: "cooperative",
                mapTypeId: 'terrain',
                styles:
                [
                    {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station.bus",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "weight": 4.5
                            }
                        ]
                    }
                ]
            })
            this.map = new maps.Map(node, mapConfig);
            var heatmapData = [];
            if (this.props.stations.stations) {
                this.props.stations.stations.map( (station) => {
                    heatmapData.push({
                        location: new google.maps.LatLng(station.position.lat, station.position.lng),
                        weight: station.available_bike_stands/station.bike_stands      //naba
                    })
                    //naba
                    var image = "https://image.ibb.co/hbLAN7/yellow_Icon.png"
                    var bikesFrac = station.available_bikes/(station.available_bikes + station.available_bike_stands)
                    if(bikesFrac > 0.6)
                    {
                        image = "https://image.ibb.co/nsMEzn/green_Icon.png"
                    }
                    if(station.available_bikes < 4)
                    {
                        image = "https://image.ibb.co/gAvPzn/redIcon.png"
                    }

                    const marker = new google.maps.Marker({
                        position: {lat: station.position.lat, lng: station.position.lng},
                        map: this.map,
                        title: station.name,
                        icon: {
                            url: image
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
                            var buswindow ="";
                            if (this.props.stations.stations.length === 1){
                                buswindow = new google.maps.InfoWindow({
                                    content: `<h5 style="color: blue;">${nearestbusobject[0].businfo.fullname}</h5>
<h5>Distance: ${geolib.convertUnit("m", nearestbusobject[0].distance)} Meters</h5>
<h5>BusStation ID: ${nearestbusobject[0].businfo.stopid}</h5>`
                                });
                            } else {
                                buswindow = new google.maps.InfoWindow({
                                    content: `<h5 style="color: blue;">${nearestbusobject[0].businfo.fullname}</h5>
<h5>BusStation ID: ${nearestbusobject[0].businfo.stopid}</h5>`
                                });
                            }
                            const busDatawindow = buswindow;
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
                            var luaswindow ="";
                            if (this.props.stations.stations.length === 1){
                                luaswindow = new google.maps.InfoWindow({
                                    content: `<h5 style="color: blue;">${nearestluasobject[0].luasinfo.name}</h5>
<h5>Distance: ${geolib.convertUnit("m", nearestluasobject[0].distance)} Meters</h5>`
                                });
                            } else {
                                luaswindow = new google.maps.InfoWindow({
                                    content: `<h5>${nearestluasobject[0].luasinfo.name}</h5>`
                                });
                            }
                            const luasDatawindow = luaswindow;
                            luasmarker.addListener('mouseover', function() {
                                luasDatawindow.open(this.map, luasmarker);
                            });
                            luasmarker.addListener('mouseout', function() {
                                luasDatawindow.close(this.map, luasmarker);
                            });
                        }
                    }

                    var total = station.available_bikes + station.available_bike_stands;

                    const infowindow = new google.maps.InfoWindow({
                        content: `<h5  style="color: blue;">${station.name}</h5>
<h5>Available Bikes: ${station.available_bikes}/${total}</h5>
<h5>Status: ${station.status}</h5>
<h5>${(new Date(station.last_update)).toGMTString()}</h5>`
                    });

                    marker.addListener('mouseover', function() {
                        infowindow.open(this.map, marker);
                    });
                    marker.addListener('mouseout', function() {
                        infowindow.close(this.map, marker);
                    });
                    return true;
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
            height: '90vh'
        }
        return (
            <div ref="map" style={style}>
            loading map...
            </div>
        )
    }
}