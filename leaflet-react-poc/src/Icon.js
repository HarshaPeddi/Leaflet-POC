import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('./images/PinonMap.svg'),
    iconRetinaUrl: require('./images/PinonMap.svg'),

    iconSize: [41, 51], // size of the icon
    iconAnchor: [20, 31], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -51]
  
    // iconSize: new L.Point(60, 75),
    // className: 'leaflet-div-icon'
});

export { iconPerson };