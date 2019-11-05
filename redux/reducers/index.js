import {combineReducers} from 'redux';
import chartReducer from "./chartReducer";
import dateReducer from "./dateReducer";
import mapReducer from './mapReducer';
import rangeReducer from './rangeReducer';

export default combineReducers({
    chartData: chartReducer,
    selectedDate: dateReducer,
    latLongGeo: mapReducer,
    anomlyChangeArray: rangeReducer
});