import type { IsSlotType } from './types'

declare module 'vue' {
  interface ComponentCustomProperties {
    $isSlotType: IsSlotType
  }
}

declare module '*.styles.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

export {}
