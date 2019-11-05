import { MAP_DATA } from "../type"

export const saveLatLongGeo = (latLongGeo) =>{
    var id = 'latLongGeo'
      return{
          id,
          type: MAP_DATA,
          latLongGeo
      }
  }