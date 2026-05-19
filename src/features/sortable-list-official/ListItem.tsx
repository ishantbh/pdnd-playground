import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { GripVerticalIcon } from 'lucide-react'
import invariant from 'tiny-invariant'

import { cn } from '@/lib/utils'
import type { DraggableState, Item } from './types'
import { draggingState, getItemData, idleState, isItemData } from './utils'
import { Button } from '@/components/ui/button'
import { DropIndicator } from './DropIndicator'

type ListItemProps = {
  item: Item
  index: number
}

export function ListItem({ item, index }: ListItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const dragHandleRef = useRef<HTMLButtonElement>(null)

  const [draggableState, setDraggableState] =
    useState<DraggableState>(idleState)
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null)

  useEffect(() => {
    const element = ref.current
    const dragHandle = dragHandleRef.current
    invariant(element)
    invariant(dragHandle)

    const data = getItemData({ item, index })

    function onChange({ self }: ElementDropTargetEventBasePayload) {
      const closestEdge = extractClosestEdge(self.data)

      setClosestEdge(closestEdge)
    }

    return combine(
      draggable({
        element,
        getInitialData: () => data,
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            render({ container }) {
              setDraggableState({ type: 'preview', container })
              return () => setDraggableState(draggingState)
            },
          })
        },
        onDragStart() {
          setDraggableState(draggingState)
        },
        onDrop() {
          setDraggableState(idleState)
        },
      }),

      dropTargetForElements({
        element,
        canDrop({ source }) {
          return isItemData(source.data)
        },
        getData({ input }) {
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['top', 'bottom'],
          })
        },
        getIsSticky: () => true,
        onDragEnter: onChange,
        onDrag: onChange,
        onDragLeave() {
          setClosestEdge(null)
        },
        onDrop() {
          setClosestEdge(null)
        },
      }),
    )
  }, [item, index])

  return (
    <>
      <div ref={ref} className='relative bg-background rounded-lg border'>
        <div
          className={cn(
            'p-4 flex items-center gap-2',
            draggableState.type === 'dragging' && 'opacity-40',
          )}
        >
          <Button
            variant='ghost'
            size='icon-xs'
            ref={dragHandleRef}
            className='cursor-grab active:cursor-grabbing text-muted-foreground'
          >
            <GripVerticalIcon className='size-4' />
          </Button>
          <div className='grow nowrap line-clamp-1 overflow-hidden'>
            {item.label}
          </div>
        </div>
        {closestEdge && <DropIndicator edge={closestEdge} gap='16px' />}
      </div>

      {draggableState.type === 'preview' &&
        createPortal(
          <div className='p-4 rounded bg-secondary max-w-90 nowrap overflow-hidden line-clamp-1'>
            {item.label}
          </div>,
          draggableState.container,
        )}
    </>
  )
}
