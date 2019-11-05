import { latLongGeo } from "../components/mapComponent/convertcsv";
import {store} from "../index";
import { saveLatLongGeo } from "../redux/actions/mapActions";
import { saveRange ,saveStringRange} from "../redux/actions/rangeActions";

export const getDates = (startDate, endDate) => {
    var now = startDate, dates = [];
  
    while (now.isSameOrBefore(endDate, 'date')) {
      dates.push(now.format('MMMM DD, YYYY'));
      now.add(1, 'days');
    }

    return dates;
  }

  export const findMinAndMax = (items, property, type) => {
    let min = 0, max = 0;

    for (let i = 0; i < items.length; i++) {
      if (type !== items[i].properties.event_type) {
        continue;
      }
      const value = items[i].properties[property];
      if (value < min) {
        min = value;
      }
      if (value > max) {
        max = value;
      }
    }
    return [min, max];
  }

  export const extractSelectedFeatures = (datesArray,type) =>{
      var extractedFeaturesArray = []
    
      latLongGeo.features.map((feature,index)=>{
          if(datesArray.includes(feature.properties.period_start_time) && feature.properties.event_type === type){
              extractedFeaturesArray.push(feature)
          }
      });
      store.dispatch(saveLatLongGeo(extractedFeaturesArray))
      updateRangeOnSelectionOfAnomoly(extractedFeaturesArray,type)


      return extractedFeaturesArray;
  }

  export const updateColorArrayOnSelectionOfAnomoly = (type) =>{
    var colorArray =[]
    
    if (type === 'POTHOLE'){
        colorArray = ['greenyellow', 'aqua', 'dodgerblue', 'darkblue', 'darkviolet', 'fuchsia']
    } else {
        colorArray = ['cyan', 'lime', 'yellow', 'orange', 'red', 'maroon']
    }

    return colorArray
  }

  export const updateRangeOnSelectionOfAnomoly = (features,type) =>{
      var stringRange = []
      var intRange =[]
      var [min, max] = findMinAndMax(features,'magnitude',type)
      var delimeter = Math.ceil((max - min) /6)

      for(var i = 0; i<=5; i++){
        min = min + delimeter
        if (i===5){
            intRange.push(max)
            stringRange.push((min-delimeter).toString() +'-'+max.toString())
        }else{
            intRange.push(min)
            stringRange.push((min-delimeter).toString()+'-'+min.toString())
        }
      }
      store.dispatch(saveRange(intRange))
      store.dispatch(saveStringRange(stringRange))
  }