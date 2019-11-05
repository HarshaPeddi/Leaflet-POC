import { DISPLAY_DATE } from "../type"

export default function dateReducer(state=[],action){
        switch (action.type) {
            case DISPLAY_DATE:
                return action.displayDate;
            default:
                return state;
        }
};