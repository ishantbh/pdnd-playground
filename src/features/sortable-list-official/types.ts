export type Item = {
  id: string
  label: string
}

export const itemKey = Symbol('item')
export type ItemData = {
  [itemKey]: true
  item: Item
  index: number
}

export type DraggableState =
  | { type: 'idle' }
  | { type: 'preview'; container: HTMLElement }
  | { type: 'dragging' }
