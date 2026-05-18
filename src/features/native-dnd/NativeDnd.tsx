import { cn } from '@/lib/utils'
import { useState } from 'react'

export function NativeDnd() {
  const [dropped, setDropped] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <div className='h-full flex flex-col items-center justify-center gap-16 p-8'>
      {/* Draggable */}
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData(
            'text/plain',
            JSON.stringify({ id: '1', label: 'Box A' }),
          )

          e.dataTransfer.effectAllowed = 'move'
        }}
        onDragEnd={(e) => {
          console.log('Drag ended. Drop effect:', e.dataTransfer.dropEffect)
        }}
        className='w-40 h-20 bg-primary text-primary-foreground rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing select-none font-semibold text-lg'
      >
        Drag me
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
        }}
        onDragEnter={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={(e) => {
          setIsDragOver(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragOver(false)

          const raw = e.dataTransfer.getData('text/plain')
          const data = JSON.parse(raw)
          setDropped(data.label)
        }}
        className={cn(
          'w-100 h-50 rounded-lg border-2 border-dashed flex items-center justify-center transition-colors',
          isDragOver && 'border-primary bg-primary/5',
        )}
      >
        {dropped ? `Got: ${dropped}` : 'Drop here'}
      </div>
    </div>
  )
}
