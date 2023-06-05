
/**
* Filter object by field value.
*
* @param {Object} objectFilter - Object need filter.
* @param {String} fieldFilter - Field need filter.
* @param {String} valueFilter - Value need filter.
* @returns {Array} Array - [ {}, {}, ...].
*/
export const filterObject = (objectFilter, fieldFilter, valueFilter) => {
    const filterObject = Object.entries(objectFilter)
    .map(([key, val]) => ({key, ...val}))
    .filter(item => item[fieldFilter] === valueFilter)
    
    return filterObject;
}


/**
* Conver object object to array object.
*
* @param {Object} objectFilter - Object need convert.
* @returns {Array} Array - [ {}, {}, ...].
*/
export const convertObjectToArray = (object) => {
    const array = Object.entries(object)
    .map(([key, val]) => ({key, ...val}))
    
    return array;
}