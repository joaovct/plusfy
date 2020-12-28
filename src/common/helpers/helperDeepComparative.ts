import _ from 'lodash'

type AnyObject = {
    [key: string]: any
}

interface DeepComparative{
    (object: AnyObject, base: AnyObject): AnyObject
}

const deepComparative: DeepComparative = (object = {}, base = {}) => {
    const changes = (object: AnyObject, base: AnyObject) => {
        return _.transform(object, (result: AnyObject, value, key) => {
            if (!_.isEqual(value, base[key])) {
                result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
            }
        });
    }
    return changes(object, base);
}

interface IsDifferent{
    (object: AnyObject, base: AnyObject): boolean
}

export const isDifferent: IsDifferent = (object, base) => {
    if(Object.keys(deepComparative(object, base)).length)
        return true
    return false
}

export default deepComparative