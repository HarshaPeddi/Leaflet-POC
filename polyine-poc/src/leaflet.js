import React from "react";
import { Map, TileLayer, Polyline, Popup } from "react-leaflet";
import { latLongGeo } from './convertcsv';
import './index.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';

export default class Leaflet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 32.34756253,
      lng: 34.8613223,
      zoom: 14,
      latLongGeo: latLongGeo,
      graph: latLongGeo.features.slice(0, 40),
      consoleLog: this.consoleLog()
    };    
    this.mapRef = React.createRef();
    const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
  }

  consoleLog = () => {
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

  addPopup = (e, feature) => {
    this.setState({
      popup: { 
        selecetd: feature,
        position: e.latlng,
        key: e.latlng
      }
    })
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const {popup} = this.state
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
              <Polyline key={feature.properties.id} onClick={(e) => this.addPopup(e, feature)} lineCap="square" weight={5} positions={[
                [feature.properties.lat0, feature.properties.lng0], [feature.properties.lat1, feature.properties.lng1]
              ]}
                color={
                  feature.properties.events_count === 1 ? 'red' :
                    feature.properties.events_count === 2 ? 'light blue' :
                      feature.properties.events_count === 3 ? 'green' :
                        feature.properties.events_count === 4 ? 'maroon' :
                          feature.properties.events_count === 5 ? 'blue' : 'red'
                }
              />
              {popup &&
                <Popup
                  key={`popup-${popup.key}`}
                  position={popup.position}
                >
                  <div>
                    <p>Distance: {popup.selecetd.distance}</p>
                    <p>Type: {popup.selecetd.properties.event_type}</p>
                    <p>Events Count: {popup.selecetd.properties.events_count}</p>
                    <p>Period Start: {popup.selecetd.properties.period_start_time}</p>
                  </div>
                </Popup>
              }
            </div>
          })}
        </Map>
        <BarChart width={window.innerWidth} height={300} data={this.state.graph}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="properties.magnitude" fill="#8884d8">
            {
              this.state.graph.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={(index >= 10 && index <= 25) ? '#8884d8' : '#fff'}/>
              ))
            }
          </Bar>
        </BarChart>
      </div>
    );
  }
}
