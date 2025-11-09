interface RandomValueParams {
  base: number
  factor?: number
}

export const randomValue = ({ base, factor = 50 }: RandomValueParams): number => {
  const random = Math.floor(Math.random() * factor)

  return random + base
}
