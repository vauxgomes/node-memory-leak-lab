import { HardDriveDownload, Menu, Trash, Zap } from 'lucide-react'

import { MemoryChart } from './components/customs/memory-chart'
import { Button } from './components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Separator } from './components/ui/separator'

import './App.css'

const points = 10
const now = Date.now()

const mockedData = Array.from({ length: points }).map((_, i) => {
  const timeOffset = (points - i) * 50000
  const baseMemory = 40 // MB
  return {
    rss: baseMemory + Math.random() * 10,
    heapTotal: 60,
    heapUsed: baseMemory + Math.random() * 5 + i * 0.2,
    external: 5,
    timestamp: now - timeOffset
  }
})

function App() {
  return (
    <div className="m-auto max-w-400 min-h-screen *:p-6">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Memory Leak Lab</h1>
          <p className="text-muted-foreground">
            Visualize and analyze Node.js memory usage in real-time
          </p>
        </div>

        <ShowConnectionStatus isConnected={true} />
      </header>

      <div className="flex flex-col gap-4 md:flex-row">
        <main className="grow">
          <MemoryChart data={mockedData} />
        </main>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Actions </CardTitle>
          </CardHeader>

          <CardContent className="grow grid grid-cols-2 gap-2 md:grid-cols-1 md:content-start">
            <Button variant="outline" className="w-full">
              <Zap className="h-4 w-4" /> Global Leak
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 *:cursor-pointer *:w-full">
            <Button variant="destructive">
              <Trash className="h-4 w-4" /> Clear Data
            </Button>

            <Separator />

            <Button>
              <HardDriveDownload className="h-4 w-4" /> Download Snapshot
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function ShowConnectionStatus({ isConnected }: { isConnected: boolean }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      Live
    </div>
  )
}

export default App
