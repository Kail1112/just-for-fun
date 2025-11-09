import { useCssModule } from 'vue'

import type { Primitive } from './Details.types.ts'

export const useDetailsPresenter = () => {
  const classes = useCssModule()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isPrimitive = (value: any): value is Primitive => {
    return typeof value === 'string' || typeof value === 'number'
  }

  return { classes, isPrimitive }
}
