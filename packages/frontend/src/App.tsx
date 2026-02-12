import { MemoryChart } from './components/customs/memory-chart'

import './App.css'

const points = 10
const now = Date.now()

const mockedData = Array.from({ length: points }).map((_, i) => {
  const timeOffset = (points - i) * 1000
  const baseMemory = 40 // MB
  return {
    rss: baseMemory + Math.random() * 10,
    heapTotal: 60,
    heapUsed: baseMemory + Math.random() * 5 + i * 0.2,
    external: 5,
    timestamp: now - timeOffset
  }
})

// console.log('Mocked Data:', mockedData)

function App() {
  return (
    <div className="flex items-center justify-between h-screen gap-4 px-4">
      <MemoryChart data={mockedData}/>
      <aside className="w-1/4 bg-gray-200 rounded-lg p-2">
        Sidebar Content
      </aside>
    </div>
  )
}

export default App
