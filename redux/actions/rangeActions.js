import { COLOR_ARRAY, RANGE_ARRAY,STRING_RANGE_ARRAY } from "../type"

  export const saveColors = (colorArray) =>{
    var id = 'colorArray'
      return{
          id,
          type: COLOR_ARRAY,
          colorArray
      }
  }

  export const saveRange = (rangeArray) =>{
    var id = 'rangeArray'
      return{
          id,
          type: RANGE_ARRAY,
          rangeArray
      }
  }

  export const saveStringRange = (stringRangeArray) =>{
    var id = 'stringRangeArray'
      return{
          id,
          type: STRING_RANGE_ARRAY,
          stringRangeArray
      }
  }