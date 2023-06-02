
/* Filter object theo value
 Object cần fillter, trường value cần fillter, value fillter
 Return [key, Object value]
 */

 /**
 * Mô tả chức năng của hàm tại đây.
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