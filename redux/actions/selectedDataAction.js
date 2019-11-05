import { DISPLAY_DATE } from "../type"

export const saveDisplayDate = (displayDate) =>{
    var id = 'datesArray'
      return{
          id,
          type: DISPLAY_DATE,
          displayDate
      }
  }