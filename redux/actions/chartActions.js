import { DATES_ARRAY, DATA_ARRAY, BACKGROUND_COLOR, BORDER_COLOR } from "../type"

  export const saveDates = (datesArray) =>{
    var id = 'datesArray'
      return{
          id,
          type: DATES_ARRAY,
          datesArray
      }
  }

  export const saveBarchartDATA = (dataArray) =>{
    var id = 'dataArray'
      return{
          id,
          type: DATA_ARRAY,
          dataArray
      }
  }

  export const saveBackgroundColorForBarchart = (backgroundColorDataArray) =>{
    var id = 'backgroundColorDataArray'
      return{
          id,
          type: BACKGROUND_COLOR,
          backgroundColorDataArray
      }
  }


  export const saveBorderColorForBarchart = (borderColorDataArray) =>{
    var id = 'borderColorDataArray'
      return{
          id,
          type: BORDER_COLOR,
          borderColorDataArray
      }
  }