
 /**
 * Filter object.
 *
 * @param {Object} objectFilter - Object cần fillter.
 * @param {String} nameFilter - trường value cần fillter.
 * @param {String} valueFilter - value fillter
 * @returns {Array Object} - [key, object value]}
 */
export const fillterObject = (objectFilter, nameFilter, valueFilter) => {
    const filteredObjects = Object.entries(objectFilter).filter(
        ([key, obj]) => obj[nameFilter] === valueFilter);
    return filteredObjects;
}