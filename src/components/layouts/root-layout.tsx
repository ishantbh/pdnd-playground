import { Header } from '@/components/header'

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full min-h-dvh grid grid-rows-[auto_1fr]'>
      <Header />

      <main className='w-full container mx-auto p-4'>{children}</main>
    </div>
  )
}
