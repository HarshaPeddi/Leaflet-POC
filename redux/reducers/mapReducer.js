import { MAP_DATA } from "../type"

export default function mapReducer(state=[],action){
    switch (action.type) {
        case MAP_DATA:
            return action.latLongGeo;
        default:
            return state;
    }
}