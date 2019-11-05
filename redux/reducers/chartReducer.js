import { DATES_ARRAY, DATA_ARRAY, BACKGROUND_COLOR, BORDER_COLOR } from "../type"

export default function chartReducer(state={},action){
        switch (action.type) {
            case DATES_ARRAY:
                return {...state, [action.id]: action.datesArray};
            case DATA_ARRAY:
                return {...state, [action.id]: action.dataArray};
            case BACKGROUND_COLOR:
                return {...state, [action.id]: action.backgroundColorDataArray};
            case BORDER_COLOR:
                return {...state, [action.id]: action.borderColorDataArray};
            default:
                return state;
        }
};