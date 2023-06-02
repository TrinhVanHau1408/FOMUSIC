
 /**
 * Filter object by field value.
 *
 * @param {Object} objectFilter - Object need filter.
 * @param {String} fieldFilter - Field need filter.
 * @param {String} valueFilter - Value need filter.
 * @returns {Array} Array - [key, {}]}.
 */
export const filterObject = (objectFilter, fieldFilter, valueFilter) => {
    const filteredObjects = Object.entries(objectFilter).filter(
        ([key, obj]) => obj[fieldFilter] === valueFilter);
    return filteredObjects;
}