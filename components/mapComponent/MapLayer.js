import React, { Component } from 'react';
import { Map, TileLayer, Polyline } from 'react-leaflet';
import { LATLNG } from "../../Helpers/Constants"
import { latLongGeo } from './convertcsv';
import { connect } from 'react-redux';

const mapsUrl = "https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.night.grey/{z}/{x}/{y}/256/png?app_id=QrOYbXD0yrMx8UcKw28N&app_code=abfAjaeBfd5ipdxSQY529Q";
export default class MapLayer extends Component {
    constructor(props) {
        super(props)
        this.selectedDate = this.props.inputType;
        this.state = {
            zoom: 15,
            latlng: LATLNG,
            latLongGeo: latLongGeo.features,
            selectedDate: this.selectedDate,
            selectedFeatures: [],
            onClickFlag : false,
            colorArray:['cyan', 'lime', 'yellow', 'orange', 'red', 'maroon'],
            rangeArray:[43, 85, 127, 170, 212, 255]
        };
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        const { latLongGeo } = this.state;
        for (let i = 0; i < latLongGeo.length; i++) {
            const feature = latLongGeo[i];
            const { lat0, lng0, lat1, lng1 } = feature.properties;
            const distance = this.mapRef.current.leafletElement.distance([lat0, lng0], [lat1, lng1]);
            latLongGeo[i].distance = distance * 3.28084;
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.selectedDate !== this.state.selectedDate && nextProps.selectedDate !== undefined){
            var selectedFeatures = []
            this.state.latLongGeo.map((feature) => {
                if(feature.properties.period_start_time === nextProps.selectedDate){
                    selectedFeatures.push(feature)
                }
            })
            this.setState({
                selectedDate : nextProps.selectedDate,
                selectedFeatures : selectedFeatures,
                onClickFlag : true     
            });
        }

        if(nextProps.latLongGeo !== this.state.latLongGeo && nextProps.latLongGeo !== undefined){
            this.setState({
                latLongGeo : nextProps.latLongGeo
            });
        }

        if(nextProps.colorArray !== this.state.colorArray && nextProps.colorArray !== undefined){
            this.setState({
                colorArray : nextProps.colorArray
            });        
        }

        if(nextProps.rangeArray !== this.state.rangeArray && nextProps.rangeArray !== undefined){
            this.setState({
                rangeArray : nextProps.rangeArray
            })
        }
    }

    render() {
        const position = [this.state.latlng.lat, this.state.latlng.lng]
        var tempShort = 10000;
        var tempLong = 0;
        let poly;

        if(this.state.onClickFlag){
            poly = (this.state.selectedFeatures.map((feature) => {

                if (feature.distance <= tempShort) {
                    tempShort = feature.distance;
                }
                if (feature.distance >= tempLong) {
                    tempLong = feature.distance;
                }
                return <div>
                    <Polyline key={feature.properties.id} positions={[
                        [feature.properties.lat0, feature.properties.lng0], [feature.properties.lat1, feature.properties.lng1]
                    ]}
                        color={
                            feature.properties.magnitude <= this.state.rangeArray[0] ? this.state.colorArray[0] :
                                feature.properties.magnitude <= this.state.rangeArray[1] ? this.state.colorArray[1] : 
                                    feature.properties.magnitude <= this.state.rangeArray[2] ? this.state.colorArray[2] :
                                        feature.properties.magnitude <= this.state.rangeArray[3] ? this.state.colorArray[3] :
                                            feature.properties.magnitude <= this.state.rangeArray[4] ? this.state.colorArray[4] : this.state.colorArray[5]
                        }
                    />
                </div>
            }));
        } else {
            poly = undefined;
        }
        return (
            <div>
                <Map
                    center={position}
                    zoom={this.state.zoom}
                    maxZoom={20}
                    style={{ height: "100vh" }}
                    ref={this.mapRef}
                >
                    <TileLayer
                        url={mapsUrl}
                        attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>Here Maps</a> contributors, Imagery © <a href='https://www.mapbox.com/'>Here Maps</a>"
                    />
                    { poly }
                </Map>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedDate: state.selectedDate,
        latLongGeo: state.latLongGeo,
        colorArray: state.anomlyChangeArray.colorArray,
        rangeArray : state.anomlyChangeArray.rangeArray,    
    };
};
MapLayer= connect(mapStateToProps,null)(MapLayer);