import type { Slot, VNodeTypes } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>

export type IsSlotType = (slot?: Slot, type?: VNodeTypes) => boolean

export type ToKebabCase<Target> = Target extends string
  ? Target extends `${infer First}${infer Rest}`
    ? First extends Uppercase<First>
      ? `-${Lowercase<First>}${ToKebabCase<Rest>}`
      : `${First}${ToKebabCase<Rest>}`
    : Target
  : Target

export type ToKebabCaseObject<Target extends AnyObject> = {
  [Key in keyof Target as ToKebabCase<Key>]: Target[Key]
}
