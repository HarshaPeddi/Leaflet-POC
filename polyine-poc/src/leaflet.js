import React from "react";
import { Map, TileLayer, Polyline,Point } from "react-leaflet";
//import { latLongGeo } from './latLongGeoJSON';
// import { latLongGeo } from './tempLatLong';
import { latLongGeo } from './convertcsv';



// Returning distance in feets 
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
  return ((c * EARTH_RADIUS).toFixed(2))*3280.84;
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

  getDistanceBetweenLatLngs = ()=>{

    console.log("hello")
    var hello = ""
    var positions=[
      [32.34756253, 34.8613223], [32.3476183, 34.8610698]
      ]

      // L.Polyline = L.Polyline.include({
  //     getDistance: function(system) {
  //         // distance in meters
  //         var mDistanse = 0,
  //             length = positions.length;
  //         for (var i = 0; i < length; i++) {
  //             mDistanse += this._latlngs[i].distanceTo(this._latlngs[i + 1]);
  //         }
  //         // optional
  //         if (system === 'imperial') {
  //             console.log( mDistanse / 1609.34)
  //         } else {
  //             console.log(mDistanse / 1000)
  //         }
  //     }
  // });



  }

  render() {
    const position = [this.state.lat, this.state.lng];

    {var hello = this.getDistanceBetweenLatLngs();
      var tempShort = 10000;
      var tempLong = 0;
    }

    return (
        <div id="map">
          <Map
            style={{ height: "100vh" }}
            center={position}
            zoom={this.state.zoom}
            // distance={position}
          >

          <TileLayer     
            url='https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day.grey/{z}/{x}/{y}/256/png?app_id=QrOYbXD0yrMx8UcKw28N&app_code=abfAjaeBfd5ipdxSQY529Q'
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">Here Maps</a> contributors, Imagery © <a href="https://www.mapbox.com/">Here Maps</a>'
          />


            
            {this.state.latLongGeo.features.map((feature) => {

            // console.log('************************')
              
              // Stored distance in same object.
              const { lat0, lng0, lat1, lng1 } = feature.properties;
              feature.distance = getDistance([lat0, lng0], [lat1, lng1]);




            // let dist:  distance([feature.properties.lat0, feature.properties.lng0] latlng1, [feature.properties.lat1, feature.properties.lng1] latlng2)
            // console.log(distance([feature.properties.lat0, feature.properties.lng0] , [feature.properties.lat1, feature.properties.lng1] ))
            // var markerFrom = L.circleMarker([28.6100,77.2300], { color: "#F00", radius: 10 });
            // var markerTo = L.circleMarker([28.6140,77.2360], { color: "#F00", radius: 10 });
            // var from = markerFrom.getLatLng
            // var to = markerTo.getLatLng
            // var dist = from.distanceTo(to)

        
            // console.log(dist)

            console.log('########################')
            // console.log('Lat0')
            // console.log(feature.properties.lat0)
            
            // console.log('Lng0')
            // console.log(feature.properties.lng0)      

            // console.log('Lat1')
            // console.log(feature.properties.lat1)   

            // console.log('Lng1')
            // console.log(feature.properties.lng1)      

            console.log('distance')
            console.log(feature.distance);

            // {feature.distance<=tempShort?tempShort = feature.distance:''}

            if(feature.distance<=tempShort)
            {
                  tempShort = feature.distance;
            }

            console.log('tempShort')
            console.log(tempShort);


            return <div onClick={this.state.consoleLog}>
                <Polyline key = {feature.properties.id} positions={[
                [feature.properties.lat0, feature.properties.lng0], [feature.properties.lat1, feature.properties.lng1]
                ]}


                // color = {
                // feature.properties.events_count === 1 ? 'red':
                // feature.properties.events_count === 2 ? 'light blue' :
                // feature.properties.events_count === 3 ? 'green': 
                // feature.properties.events_count === 4 ? 'maroon': 
                // feature.properties.events_count === 5 ? 'blue' :  'red' 
                // }

                color = {
                feature.distance <= 40 ? 'black':
                feature.distance <=50 || feature.distance >40 ? 'light blue' :
                feature.distance <=60 || feature.distance >50 ? 'green': 
                feature.distance <=70 || feature.distance >60 ? 'yellow': 
                feature.distance <=80 || feature.distance >70 ? 'blue' : 
                feature.distance <=90 || feature.distance >80 ? 'aqua':
                feature.distance <=100 || feature.distance >90 ? 'maroon':  'pink'
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
