import type { DraggableState, Item, ItemData } from './types'
import { itemKey } from './types'

export const initialItems: Item[] = [
  { id: 'task-1', label: 'Task 1' },
  { id: 'task-2', label: 'Task 2' },
  { id: 'task-3', label: 'Task 3' },
  { id: 'task-4', label: 'Task 4' },
  { id: 'task-5', label: 'Task 5' },
  { id: 'task-6', label: 'Task 6' },
  { id: 'task-7', label: 'Task 7' },
  { id: 'task-8', label: 'Task 8' },
]

export const idleState: DraggableState = { type: 'idle' }
export const draggingState: DraggableState = { type: 'dragging' }

export function isItemData(
  data: Record<string | symbol, unknown>,
): data is ItemData {
  return data[itemKey] === true
}

export function getItemData({
  item,
  index,
}: {
  item: Item
  index: number
}): ItemData {
  return {
    [itemKey]: true,
    item,
    index,
  }
}
