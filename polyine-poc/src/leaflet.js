import React from "react";
import { Map, TileLayer, Polyline } from "react-leaflet";
//import { latLongGeo } from './latLongGeoJSON';
// import { latLongGeo } from './tempLatLong';
import { latLongGeo } from './convertcsv';

// Returning distance in km
const getDistance = (origin, destination) => {
  var lon1 = toRadian(origin[1]),
      lat1 = toRadian(origin[0]),
      lon2 = toRadian(destination[1]),
      lat2 = toRadian(destination[0]);

  var deltaLat = lat2 - lat1;
  var deltaLon = lon2 - lon1;

  var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
  var c = 2 * Math.asin(Math.sqrt(a));
  var EARTH_RADIUS = 6371;
  return (c * EARTH_RADIUS).toFixed(2);
}

const toRadian = (degree) => {
  return degree*Math.PI/180;
};

export default class Leaflet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      lat: 32.34756253,
      lng: 34.8613223,
      zoom: 14,
      latLongGeo:latLongGeo,
      data: [
        {
          from_lat: "32.347562525",
          from_long: "34.8613223",
          id: "132511",
          to_lat: "32.3476183",
          to_long: "34.8610698"
        },
        {
          from_lat: "42.315278",
          from_long: "-83.2124667",
          id: "132512",
          to_lat: "32.3476183",
          to_long: "34.8610698"
        },
        {
          from_lat: "32.3480779",
          from_long: "34.8611593",
          id: "132513",
          to_lat: "32.3483077",
          to_long: "34.86120405"
        }
      ],
      consoleLog: this.consoleLog()
    };
  }

  consoleLog =()=> {
    console.log("from console.log");
  }
  render() {
    const position = [this.state.lat, this.state.lng];
    return (
        <div id="map">
          <Map
            style={{ height: "100vh" }}
            center={position}
            zoom={this.state.zoom}
          >

          <TileLayer     
            url='https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day.grey/{z}/{x}/{y}/256/png?app_id=QrOYbXD0yrMx8UcKw28N&app_code=abfAjaeBfd5ipdxSQY529Q'
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">Here Maps</a> contributors, Imagery © <a href="https://www.mapbox.com/">Here Maps</a>'
          />

            {this.state.latLongGeo.features.map((feature) => {
              // Stored distance in same object.
              const { lat0, lng0, lat1, lng1 } = feature.properties;
              feature.distance = getDistance([lat0, lng0], [lat1, lng1]);
            //   console.log('************************')
            // console.log([feature.properties.lat0, feature.properties.lng0], [feature.properties.lat1, feature.properties.lng1])
            // console.log('########################')

            // if(feature.properties.events_count!==1) {
            //   continue;
            // } 
            // if(feature.properties.events_count!==2) {
            //   continue;
            // } 
            return <div onClick={this.state.consoleLog}>
                <Polyline key = {feature.properties.id} positions={[
                [feature.properties.lat0, feature.properties.lng0], [feature.properties.lat1, feature.properties.lng1]
                ]}


                color = {
                feature.properties.events_count === 1 ? 'red':
                feature.properties.events_count === 2 ? 'light blue' :
                feature.properties.events_count === 3 ? 'green': 
                feature.properties.events_count === 4 ? 'maroon': 
                feature.properties.events_count === 5 ? 'blue' :  'red' 
                }
                // color={'black'}
                />
             </div>
          })} 
          </Map>
        </div>
      );
  }
}
