
/**
* Filter object by field value.
*
* @param {Object} objectFilter - Object need filter.
* @param {String} fieldFilter - Field need filter.
* @param {String} valueFilter - Value need filter.
* @returns {Array} Array - [ {}, {}, ...].
*/
export const filterObject = (objectFilter, fieldFilter, valueFilter) => {
    const mapObjects = Object.entries(objectFilter)
    .map(([key, val]) => ({key, ...val}))
    // .filter(item => item[fieldFilter] === valueFilter)
    
    return mapObjects;
}