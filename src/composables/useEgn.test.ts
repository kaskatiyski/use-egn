import { describe, it, expect } from 'vitest'
import useEgn from '@/composables/useEgn'

describe('egn validation', () => 
{
    it('returns false if EGN input is null', () =>
    {
        const { isValid } = useEgn(null)

        expect(isValid.value).toBeFalsy()
    })
    it('returns false if EGN input is undefined', () =>
    {
        const { isValid } = useEgn(undefined)

        expect(isValid.value).toBeFalsy()
    })

    it('returns false for invalid EGN', () =>
    {
        const invalidEgns = ['1234567890', '5232212332', '004212']

        for (const invalidEgn of invalidEgns)
        {
            const { isValid } = useEgn(invalidEgn)

            expect(isValid.value).toBeFalsy()
        }
    })

    it('returns true for valid EGN', () => 
    {
        const validEgn = '1308056565'

        const { isValid } = useEgn(validEgn)

        expect(isValid.value).toBeTruthy()
    })
})

describe('birthday validation', () =>
{
    it('generates a correct birthday', () =>
    {
        const validEgns = [
            {
                egn: '1107223104',
                birthday: new Date(1911, 6, 22),
            },
            {
                egn: '9949032774',
                birthday: new Date(2099, 8, 3),
            },
        ]

        for (const { egn, birthday: expectedBirthday } of validEgns)
        {
            const { birthday: actualBirthday } = useEgn(egn)

            expect(actualBirthday.value).toEqual(expectedBirthday)
        }
    })

    it('returns null for an invalid EGN with an invalid birthday', () =>
    {
        const invalidEgn = '1234567890'

        const { birthday } = useEgn(invalidEgn)

        expect(birthday.value).toBeNull()
    })

    it('returns null for an invalid EGN with a valid birthday', () =>
    {
        const invalidEgn = '9604158090'

        const { birthday } = useEgn(invalidEgn)

        expect(birthday.value).toBeNull()
    })
    it('returns null if EGN input is falsy', () =>
    {
        const { birthday } = useEgn(undefined)

        expect(birthday.value).toBeNull()
    })

})

describe('gender', () =>
{
    it('is male', () =>
    {
        const validEgn = '3311280867'

        const { isMale, isFemale } = useEgn(validEgn)

        expect(isMale.value).toBeTruthy()
        expect(isFemale.value).toBeFalsy()
    })

    it('is female', () =>
    {
        const validEgn = '2402152757'

        const { isMale, isFemale } = useEgn(validEgn)

        expect(isMale.value).toBeFalsy()
        expect(isFemale.value).toBeTruthy()
    })

    it('is neither male or female if the EGN is invalid', () =>
    {
        const invalidEgn = '004205212'

        const { isMale, isFemale } = useEgn(invalidEgn)

        expect(isMale.value).toBeFalsy()
        expect(isFemale.value).toBeFalsy()
    })
})
