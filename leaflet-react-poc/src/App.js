import React, { createRef,Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './App.css';
import { Map, TileLayer, Marker, Popup,Circle,CircleMarker, ZoomControl } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import Sidebar from "react-sidebar";
import logo from './logo.svg'
import {iconPerson} from './Icon'

import {geojsonFeature} from './data';
import { btGeoFeature } from './bluetoothGeo';
import { fmGeoFeature } from './fmGeo';
import { fmGeoFeature2 } from './fmActualData';
import {sxmGeoFeature} from './sxmGeo';
import {carryOldGeoFeature} from './caryOld';
import {carryNewGeoFeature} from './carryNew';
import {cNew} from './cNew';
import {cOLD} from './cOLD';
import HomeSideBar from './HomeSideBar';
const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  constructor(props){
    super(props);

    this.state={

      btcheckboxChecked: false,
      fmcheckboxchecked: false,
      sxmchecboxchecked:false,
      caryOldcheckboxChecked:false,
      carynewCheckBoxChecked:false,
      hasLocation: true,
      sidebarDocked: mql.matches,
      sidebarOpen: true,
      someArray: [],
      // addressPoints:this.geoJson2heat(geojsonFeature,1),
      btAddressPoints:this.geoJson2heat(btGeoFeature,1),
      fmAddressPoints:this.geoJson2heat(fmGeoFeature2,3),
       sxmAddressPoints:this.geoJson2heat(sxmGeoFeature,1),
       caryAddressPointsOld:this.geoJson2heat(cOLD,1),
       caryAddressPointsNew:this.geoJson2heat(cNew,1),
       zoomLevel: 13,
      latlng: {
        lat: 42.315278,
        lng: -83.2124667,
      },
      marker: {
        lat: 42.315278,
        lng: -83.2124667,
      },
      draggable:true,
      zoom: 13
    }

    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.getMapZoom = this.getMapZoom.bind(this);
    // console.log(this.state.addressPoints)
  }
  mapRef = React.createRef()

  geoJson2heat =(geojson, intensity) => {
    return geojson.features.map(function(feature) {
        return [parseFloat(feature.geometry.coordinates[1]), parseFloat(feature.geometry.coordinates[0]), intensity];
    });
    }

  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable })
  }
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }


  // toggleLimitedAddressPoints() {
  //   if (this.state.limitAddressPoints) {
  //     this.setState({ addressPoints: addressPoints.slice(500, 1000), limitAddressPoints: false });
  //   } else {
  //     this.setState({ addressPoints, limitAddressPoints: true });
  //   }
  // }

  updatePosition = () => {
    const marker = this.mapRef.current
    if (marker != null) {
      this.setState({
        marker: marker.leafletElement.getLatLng()
      })
    }
  }
  handleCheckBoxChange(event){
    
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if(name === "BTCheckBox"){
      this.setState({
        btcheckboxChecked:value
      })
    }
    if(name === "FMCheckBox"){
      this.setState({
        fmcheckboxchecked:value
      })
    }
    if(name === "SXMCheckBox"){
      this.setState({
        sxmchecboxchecked:value
      })

    }
    if(name === "caryOldCheckBox"){
      this.setState({
        caryOldcheckboxChecked:value
      })
    

    }
    if(name === "caryNewCheckBox"){
      this.setState({
        carynewCheckBoxChecked:value
      })
    }
  }

  getMapZoom() {
    return this.map && this.map.leafletElement.getZoom();
 }

 componentDidMount() {
  const leafletMap = this.leafletMap.leafletElement;
  leafletMap.on('zoomend', () => {
    
      window.console.log('Current zoom level -> ', leafletMap.getZoom());
      this.setState({
        zoomLevel:leafletMap.getZoom()
      })
  });
}
 
  
  render() {

    
    const position = [this.state.latlng.lat, this.state.latlng.lng]
    const markerPosition = [this.state.marker.lat, this.state.marker.lng]
    console.log(this.state.zoomLevel)
    if (this.state.zoomLevel <= 15 ) {
      var gradient = {
        1.0: '#200741',0.5: '#7F5BBD', 0.4:"#ffffff"
      }
      var gradient2 = {
         1.0: '#500D08',0.5: '#EA6567', 0.4:"#ffffff"
      };

      var gradient3 = {
         1.0: '#253E0A', 0.5: '#59D797',0.4:"#ffffff"
      }
      
    } else if(this.state.zoomLevel >= 15) {
      var gradient = {
        1.0: '#9668E6'
      }
      var gradient2 = {
        1.0: '#E23429'
      };
      var gradient3 = {
        1.0: '#06A353'
      }
    }
    //  else{
    //   var gradient = {
    //     1.0: '#9668E6', 0.5:"#ffffff"
    //   }
    //   var gradient2 = {
    //     1.0: '#E23429', 0.5:"#ffffff"
    //   };
    //   var gradient3 = {
    //     1.0: '#06A353', 0.5:"#ffffff"
    //   }
    // }
    return (
     
     
      <div>
         {/* <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar> */}
      
        <section>
          
            <div className="topbar-padding">
                    {/* <HomeSideBar></HomeSideBar> */}
                    <label>Audio Sources</label>
                    <br/>
                    <br/>
                    <label>
                      <input
                          name ="BTCheckBox"
                          type = "checkbox"
                          onChange={this.handleCheckBoxChange}
                      />
                      BLUETOOTH
                    </label>
                    <br/>
                    <label>
                      <input
                          name ="FMCheckBox"
                          type = "checkbox"
                          onChange={this.handleCheckBoxChange}
                      />
                      FM
                    </label>
                    <br/>
                    <label>
                      <input
                          name ="SXMCheckBox"
                          type = "checkbox"
                          onChange={this.handleCheckBoxChange}
                      />
                      SXM
                    </label>    
                    <br/>
                    <label>
                      <input
                          name ="caryOldCheckBox"
                          type = "checkbox"
                          onChange={this.handleCheckBoxChange}
                      />
                      CaryOLD
                    </label>
                    <br/>
                    <label>
                      <input
                          name ="caryNewCheckBox"
                          type = "checkbox"
                          onChange={this.handleCheckBoxChange}
                      />
                      CaryNew
                    </label>
                    <label>
                      <input
                          name ="sampleB"
                          type = "sampleB"
                          onChange={this.handleCheckBoxChange}
                      />
                      SampleBox
                    </label>
              </div>
            
          </section>
          <section className="main-container">
          <Map 
         ref={m => { this.leafletMap = m; }}
        center={position} 
        zoom={this.state.zoom}
        >
        
        <Circle center={markerPosition} color="#50E3C2" fillColor="transparent"   radius={16093.4} />
        {this.state.fmcheckboxchecked?<HeatmapLayer
                // fitBoundsOnLoad=true
                // fitBoundsOnUpdate
                points={this.state.fmAddressPoints}
                
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => parseFloat(m[2])}
                gradient={gradient2}
                radius={10}
                blur={18}
                max={3.0}
                minOpacity={1.5}
                maxZoom={20}
                />:null}
        {this.state.sxmchecboxchecked?<HeatmapLayer
                // fitBoundsOnLoad
                // fitBoundsOnUpdate
                points={this.state.sxmAddressPoints}
            
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => parseFloat(m[2])}
                gradient={gradient3}
                radius={10}
                blur={18}
                max={3.0}
                minOpacity={1.5}
                maxZoom={20}
                /> :null}
        {this.state.btcheckboxChecked?<HeatmapLayer
                // fitBoundsOnLoad
                // fitBoundsOnUpdate
                points={this.state.btAddressPoints}
                
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => parseFloat(m[2])}
                gradient={gradient}
                radius={10}
                blur={18
              
              }
                max={3.0}
                minOpacity={2.5}
                maxZoom={20}
                />:null}
              {this.state.caryOldcheckboxChecked?<HeatmapLayer
                // fitBoundsOnLoad
                // fitBoundsOnUpdate
                points={this.state.caryAddressPointsOld}
                
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => parseFloat(m[2])}
                gradient={gradient}
                radius={10}
                blur={18
              
              }
                max={3.0}
                minOpacity={2.5}
                maxZoom={20}
                />:null}
                {this.state.carynewCheckBoxChecked?<HeatmapLayer
                // fitBoundsOnLoad
                // fitBoundsOnUpdate
                points={this.state.caryAddressPointsNew}
                
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => parseFloat(m[2])}
                gradient={gradient}
                radius={10}
                blur={18
              
              }
                max={3.0}
                minOpacity={2.5}
                maxZoom={20}
                />:null}
                {/* TWwhpgiID1YYEZBHlIXn&app_code=9TjXcGejdSUWto2Z3tXGgg' */}
        
        <TileLayer
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">Here Maps</a> contributors, Imagery © <a href="https://www.mapbox.com/">Here Maps</a>'
              url='https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.night.grey/{z}/{x}/{y}/256/png?app_id=wUAuwyZJcVJAH5u0zc4r&app_code=Z_cH2KkAaf3eyCtE60Vkvw'
              
              
        />
        
        
        <Marker position={this.state.latlng}
        color={"#50E3C2"}
        draggable={this.state.draggable}
        onDragend={this.updatePosition}
        position={markerPosition}
        ref={this.mapRef}
        icon={iconPerson}
        
        >
          <Popup>You are here</Popup>
        </Marker>
        
       
        
      </Map>



            </section>



      </div>
      
      
      
    );
  }
}

export default App;
