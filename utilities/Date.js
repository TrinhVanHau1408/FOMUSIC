
/**
 * Check two date have the same week.
 *
 * @param {Timestamp} date1 - Date first.
 * @param {Timestamp} daye2 - Date second.
 * @returns {Boolean}.
 */

export const isSameWeek = (date1, date2) => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    // So sánh năm và số tuần trong năm
    const firstYear = firstDate.getFullYear();
    const secondYear = secondDate.getFullYear();
    const firstWeek = getWeekNumber(firstDate);
    const secondWeek = getWeekNumber(secondDate);

    return firstYear === secondYear && firstWeek === secondWeek;
};

/**
 * Find start of week for date.
 *
 * @param {Date} date - Date.
 * @returns {Timestamp} - Timestamp.
 */

export const findStartOfWeek = (date) => {

    const startOfWeek = new Date(date);

    console.log("startOfWeek ", startOfWeek)
    // Reset hour, min, sec, ms is 0
    startOfWeek.setHours(0, 0, 0, 0)

    startOfWeek.setDate(date.getDate() - date.getDay());
   
    return startOfWeek.getTime();
}