import { Reducer } from "react";
import {ICurrentState_action, CURRENT_STATE} from '../store/currentState/types'
import _ from 'lodash'

const currentState: Reducer<{}, ICurrentState_action> = (state = {}, action) => {
    if(action.type === CURRENT_STATE && Object.keys(action.payload).length && Object.keys(difference(action.payload, state)).length){
        return {...action.payload}
    }
    return {...state}
}

export default currentState

function difference(object: {}, base: {}) {
    function changes(object: {}, base: {}): {} {
        return _.transform(object, function(result, value, key) {
            //@ts-ignore
            if (!_.isEqual(value, base[key])) {
                //@ts-ignore
                result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
            }
        });
    }
    return changes(object, base);
}