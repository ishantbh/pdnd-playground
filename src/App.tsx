import { RootLayout } from '@/components/layouts/root-layout'
import { SortableList } from '@/features/sortable-list-official/SortableList'

export default function App() {
  return (
    <RootLayout>
      {/* <SimpleDnd /> */}
      {/* <NativeDnd /> */}
      <SortableList />
    </RootLayout>
  )
}
