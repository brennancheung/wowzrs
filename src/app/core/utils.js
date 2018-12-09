import { curry } from 'ramda'

export const zeroPad = curry((numDigits, n) => `000000${n}`.slice(-numDigits))
