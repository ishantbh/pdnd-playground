import { RootLayout } from '@/components/layouts/root-layout'
import { NativeDnd } from '@/features/native-dnd/NativeDnd'

export default function App() {
  return (
    <RootLayout>
      {/* <SimpleDnd /> */}
      <NativeDnd />
    </RootLayout>
  )
}
