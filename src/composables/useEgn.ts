import { computed, unref } from 'vue'
import type { Ref } from 'vue'
import { validateDate } from '@/utils/validateDate'

const weights = [2, 4, 8, 5, 10, 9, 7, 3, 6]

export type MaybeEgn = string | null | undefined

function isEgnValid(egn: MaybeEgn): boolean
{
    // Check if EGN input is 10 digits
    if (!egn || egn.length !== 10 || !/^\d+$/.test(egn))
    {
        return false
    }

    // Check if the EGN contains a valid birthday date
    if (!getEgnBirthday(egn))
    {
        return false
    }


    // Multiply the first 9 digits of the EGN with the corresponding weights
    let checkSum = 0
    for (let i = 0; i < weights.length; i++)
    {
        checkSum += Number(egn[i]) * weights[i]
    }

    // Divide the result by 11 and get the remainder
    let remainder = checkSum % 11

    // Use the remainder if it is less than 10, otherwise use 0
    if (remainder === 10)
    {
        remainder = 0
    }

    // Compare the remainder with the control digit of the EGN
    return remainder === Number(egn.substring(9, 10))
}

/**
 * Get the actual birthday date of the person
 */
function getEgnBirthday(egn: string): Date | null
{
    let year = Number(egn.substring(0, 2))
    let month = Number(egn.substring(2, 4))
    const day = Number(egn.substring(4, 6))

    if (month <= 12)
    {
        year += 1900
    }
    // For those born 31 Dec 1999 to 31 dec 2099, 40 is added to the month
    else if (month > 40)
    {
        year += 2000
        month -= 40
    }
    // For those born 1 Jan 1900, 20 is added to the month
    else if (month > 20 && month < 40)
    {
        year += 1800
        month -= 20
    }

    if (!validateDate(year, month - 1, day))
    {
        return null
    }
    
    return new Date(year, month - 1, day)
}

export function useEgn(identificationNumber: MaybeEgn | Ref<MaybeEgn>)
{
    const isValid = computed<boolean>(() => isEgnValid(unref(identificationNumber)))

    const birthday = computed<Date | null>(() => 
    {
        if (!isValid.value)
        {
            return null
        }
        
        return getEgnBirthday(unref(identificationNumber as string))
    })

    const isMale = computed<boolean>(() =>
    {
        if (!isValid.value)
        {
            return false
        }

        // If the 9th digit is even, the EGN belongs to a male
        const genderDigit = Number(unref(identificationNumber as string).substring(8, 9))
        return genderDigit % 2 === 0
    })

    const isFemale = computed<boolean>(() =>
    {
        if (!isValid.value)
        {
            return false
        }

        return !isMale.value
    })

    return {
        isValid,
        birthday,
        isMale,
        isFemale,
    }
}