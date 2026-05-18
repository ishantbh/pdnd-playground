import { useEffect, useRef, useState } from 'react'
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import invariant from 'tiny-invariant'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type DragData = {
  type: string
  id: string
}

function Draggable() {
  const ref = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const el = ref.current
    invariant(el, 'Draggable: ref is null')

    return draggable({
      element: el,

      getInitialData: (): DragData => ({
        type: 'draggable',
        id: 'draggable-1',
      }),

      onDragStart: () => setIsDragging(true),

      onDrop: () => setIsDragging(false),
    })
  }, [])

  return (
    <div ref={ref}>
      <Button
        size='lg'
        className={cn(
          'px-12 py-8 text-base active:not-aria-[haspopup]:translate-0 cursor-grab active:cursor-grabbing transition-opacity',
          isDragging && 'opacity-50',
        )}
      >
        Draggable
      </Button>
    </div>
  )
}

function Dropzone() {
  const ref = useRef<HTMLDivElement>(null)
  const [isDraggedOver, setIsDraggedOver] = useState(false)
  const [droppedItem, setDroppedItem] = useState<DragData | null>(null)

  useEffect(() => {
    const el = ref.current
    invariant(el, 'Dropzone: ref is null')

    return dropTargetForElements({
      element: el,

      onDragEnter: () => setIsDraggedOver(true),

      onDragLeave: () => setIsDraggedOver(false),

      onDrop: ({ source }) => {
        setIsDraggedOver(false)

        const data = source.data as DragData

        setDroppedItem(data)
      },
    })
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'w-100 h-50 border-2 border-dashed border-primary rounded-lg flex items-center justify-center transition-colors',
        isDraggedOver ? 'bg-primary/10' : 'bg-secondary/20',
      )}
    >
      {droppedItem ? (
        <p className='text-sm font-medium'>Dropped: {droppedItem.id}</p>
      ) : (
        <p className='text-muted-foreground'>Drop here</p>
      )}
    </div>
  )
}

export function SimpleDnd() {
  return (
    <div className='h-full flex flex-col gap-8 items-center justify-center'>
      <Draggable />
      <Dropzone />
    </div>
  )
}
