import { COLOR_ARRAY, RANGE_ARRAY, STRING_RANGE_ARRAY } from "../type"

export default function chartReducer(state={},action){
        switch (action.type) {
            case COLOR_ARRAY:
                return {...state, [action.id]: action.colorArray};
            case RANGE_ARRAY:
                return {...state, [action.id]: action.rangeArray};
            case STRING_RANGE_ARRAY:
                return {...state, [action.id]: action.stringRangeArray};
            default:
                return state;
        }
};