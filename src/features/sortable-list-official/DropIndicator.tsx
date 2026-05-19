import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'

import { cn } from '@/lib/utils'

type DropIndicatorProps = {
  edge: Edge
  gap?: string // gap between list items
}

export function DropIndicator({ edge, gap = '0px' }: DropIndicatorProps) {
  const isTop = edge === 'top'

  return (
    <div
      style={{
        [isTop ? 'top' : 'bottom']: `calc(-6px - ${gap} / 2)`,
      }}
      className={cn(
        'absolute left-0 right-0 h-6 pointer-events-none bg-primary -z-10',
      )}
    >
      {/* <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 size-2 rounded-full bg-primary' /> */}
    </div>
  )
}
