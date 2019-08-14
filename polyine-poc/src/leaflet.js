import React from "react";
import { Map, TileLayer, Polyline } from "react-leaflet";
//import { latLongGeo } from './latLongGeoJSON';
// import { latLongGeo } from './tempLatLong';
import { latLongGeo } from './convertcsv';

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
    this.mapRef = React.createRef();
  }

  consoleLog =()=> {
    console.log("from console.log");
  }

  componentDidMount() {
    const { latLongGeo } = this.state;
    for (let i = 0; i < latLongGeo.features.length; i++) {
      const feature = latLongGeo.features[i];
      const { lat0, lng0, lat1, lng1 } = feature.properties;
      const distance = this.mapRef.current.leafletElement.distance([lat0, lng0], [lat1, lng1]);
      // Currently distance in meters, if you want we can change it as KM by dividing it as 1000
      latLongGeo.features[i].distance = distance;
    }
    this.setState({ latLongGeo }, () => {
      // Check in console for distance property inside the features. Each object will contain distance in meters.
      console.log('Geo Object', this.state.latLongGeo);
    });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
        <div id="map">
          <Map
            style={{ height: "100vh" }}
            center={position}
            zoom={this.state.zoom}
            ref={this.mapRef}
          >

          <TileLayer     
            url='https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day.grey/{z}/{x}/{y}/256/png?app_id=QrOYbXD0yrMx8UcKw28N&app_code=abfAjaeBfd5ipdxSQY529Q'
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">Here Maps</a> contributors, Imagery © <a href="https://www.mapbox.com/">Here Maps</a>'
          />
            {this.state.latLongGeo.features.map((feature) => {
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
                />
             </div>
          })} 
          </Map>
        </div>
      );
  }
}
