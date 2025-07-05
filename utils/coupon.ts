// Mapping of letter pairs to digits
const PAIR_TO_DIGIT: { [key: string]: number } = {
  AZ: 1,
  BY: 2,
  CX: 3,
  DW: 4,
  EV: 5,
  FU: 6,
  GT: 7,
  HS: 8,
  IR: 9,
  OP: 0,
}

export function validateCouponCode(code: string): { isValid: boolean; discount: number } {
  // If code is empty, it's invalid
  if (!code) {
    return { isValid: false, discount: 0 }
  }

  // Handle specific coupon codes
  if (code.toUpperCase() === "WELCOME10") {
    return { isValid: true, discount: 10 }
  }

  if (code.toUpperCase() === "SAVE20") {
    return { isValid: true, discount: 20 }
  }

  // Extract the last four characters from the code
  const upperCode = code.toUpperCase()
  if (upperCode.length < 4) {
    return { isValid: false, discount: 0 }
  }

  const lastFour = upperCode.slice(-4)

  // Split into two pairs
  const firstPair = lastFour.slice(0, 2)
  const secondPair = lastFour.slice(2)

  // Check if both pairs are valid
  if (PAIR_TO_DIGIT[firstPair] !== undefined && PAIR_TO_DIGIT[secondPair] !== undefined) {
    // Calculate discount percentage
    const tensPlace = PAIR_TO_DIGIT[firstPair]
    const onesPlace = PAIR_TO_DIGIT[secondPair]
    const discount = tensPlace * 10 + onesPlace

    return { isValid: true, discount }
  }

  return { isValid: false, discount: 0 }
}
