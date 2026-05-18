import { ThemeToggle } from '@/components/theme/theme-toggle'

export function Header() {
  return (
    <header className='border-b'>
      <div className='w-full container mx-auto p-4'>
        <div className='flex items-center justify-between'>
          <span className='font-semibold'>PDnD Playground</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
