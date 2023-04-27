function getIsLeapYear(year: number): boolean
{
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
function getDaysInMonth(year: number, month: number): number 
{
    return [31, (getIsLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
}

/**
 * Validate year, month and day combination.
 *
 * @param year Year (1800 - 2099).
 * @param month Month (0 - 11).
 * @param day Day.
 * */
export function validateDate(year: number, month: number, day: number) 
{
    if (year < 1800 || year > 2099)
    {
        return false
    }

    if (month < 0 || month > 11)
    {
        return false
    }

    if (day < 1 || day > getDaysInMonth(year, month))
    {
        return false
    }

    return true
}