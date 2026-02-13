import type { IMemoryStats } from '@shared/domain/IMemoryStats'
import { Box, Info, MousePointerClick, Trash, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { MemoryChart } from './components/customs/MemoryChart'
import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from './components/ui/card'
import { Toaster } from './components/ui/sonner'
import { Badge } from './components/ui/badge'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const API_DATA_POINTS = 50

function App() {
  const [stats, setStats] = useState<IMemoryStats[]>([])
  const [clickCounts, setClickCounts] = useState({
    global: 0,
    events: 0,
    closures: 0
  })

  const onFetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`)
      const data = await response.json()

      setStats((prev) => [...prev.slice(-API_DATA_POINTS + 1), data]) // Appending data
    } catch (error) {
      console.error('Failed to fetch memory stats', error)
    }
  }

  const onGlobalCashLeak = async () => {
    try {
      await fetch(`${API_URL}/leak/global-cache`, { method: 'POST' })
      incrementCount('global') // Increment global count on every fetch

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to trigger global leak')
    }
  }

  const onGlobalCacheClear = async () => {
    try {
      await fetch(`${API_URL}/leak/clear`, { method: 'POST' })
      setClickCounts({ global: 0, events: 0, closures: 0 }) // Reset counts
      toast.success('Global cache cleared')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to trigger global leak')
    }
  }

  const onEventListenersLeak = async () => {
    try {
      await fetch(`${API_URL}/leak/events`, { method: 'POST' })
      incrementCount('events') // Increment events count on every fetch

      // Friendly warning
      // toast.warning('Event Listeners leak triggered', {
      //   description: 'Adding 10,000 dangling click listeners to process.'
      // })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to trigger event leak')
    }
  }

  const onClosuresLeak = async () => {
    try {
      await fetch(`${API_URL}/leak/closures`, { method: 'POST' })
      incrementCount('closures') // Increment closures count on every fetch

      // Friendly warning
      // toast.warning('Closures leak triggered', {
      //   description: 'Allocating large strings inside retained closures.'
      // })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to trigger closures leak')
    }
  }

  // Helper
  const incrementCount = (type: keyof typeof clickCounts) => {
    setClickCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }))
  }

  // Auto refresh stats every second
  useEffect(() => {
    const interval = setInterval(onFetchStats, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="m-auto max-w-400 min-h-screen *:p-6">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Memory Leak Lab</h1>
          <p className="text-muted-foreground">
            Visualize and analyze Node.js memory usage in real-time
          </p>
        </div>

        <ShowConnectionStatus />
      </header>

      <div className="flex flex-col gap-4 md:flex-row">
        <main className="grow">
          <MemoryChart data={stats} />
        </main>

        <Card className="flex flex-col min-w-70">
          <CardHeader>
            <CardTitle>Actions </CardTitle>
          </CardHeader>

          <CardContent className="grow grid grid-cols-2 gap-2 md:grid-cols-1 md:content-start">
            <Button
              variant="outline"
              className="cursor-pointer justify-between gap-4 w-full"
              onClick={onGlobalCashLeak}
            >
              <div className="flex gap-2 items-center">
                <Zap className="h-4 w-4" />
                Global Leak
              </div>

              <Badge variant="default">{clickCounts.global}</Badge>
            </Button>

            <Button
              variant="outline"
              className="cursor-pointer justify-between gap-4 w-full"
              onClick={onEventListenersLeak}
            >
              <div className="flex gap-2 items-center">
                <MousePointerClick className="h-4 w-4" />
                Event Listeners Leak
              </div>

              <Badge variant="default">{clickCounts.events}</Badge>
            </Button>

            <Button
              variant="outline"
              className="cursor-pointer justify-between gap-4 w-full"
              onClick={onClosuresLeak}
            >
              <div className="flex gap-2 items-center">
                <Box className="h-4 w-4" />
                Closures Leak
              </div>

              <Badge variant="default">{clickCounts.closures}</Badge>
            </Button>
          </CardContent>

          <CardFooter className="mt-auto border-t flex flex-col gap-3">
            <Button
              variant="secondary"
              className="justify-between gap-4 cursor-pointer w-full"
              onClick={onGlobalCacheClear}
            >
              Clear Data
              <Trash className="h-4 w-4" />
            </Button>

            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Info size={12} /> Clearing helps the GC reclaim memory.
            </p>
          </CardFooter>
        </Card>
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  )
}

// Totally fake connection status component, just for fun
function ShowConnectionStatus() {
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
