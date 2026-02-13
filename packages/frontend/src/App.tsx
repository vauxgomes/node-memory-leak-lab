import type { IMemoryStats } from '@shared/domain/IMemoryStats'
import { Trash, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { MemoryChart } from './components/customs/memory-chart'
import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from './components/ui/card'
import { Toaster } from './components/ui/sonner'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const API_DATA_POINTS = 50

function App() {
  const [stats, setStats] = useState<IMemoryStats[]>([])

  const onFetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`)
      const data = await response.json()

      setStats((prev) => [...prev.slice(-API_DATA_POINTS + 1), data]) // Appending data
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to fetch memory stats')
    }
  }

  const onGlobalCashLeak = async () => {
    try {
      await fetch(`${API_URL}/leak/global-cache`, { method: 'POST' })
      // toast.success('Global leak triggered')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to trigger global leak')
    }
  }

  const onGlobalCacheClear = async () => {
    try {
      await fetch(`${API_URL}/leak/clear`, { method: 'POST' })
      toast.success('Global cache cleared')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to trigger global leak')
    }
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

        <ShowConnectionStatus isConnected={true} />
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
              className="cursor-pointer w-full"
              onClick={onGlobalCashLeak}
            >
              <Zap className="h-4 w-4" /> Global Leak
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 *:cursor-pointer *:w-full">
            <Button variant="secondary" onClick={onGlobalCacheClear}>
              <Trash className="h-4 w-4" /> Clear Data
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Toaster />
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
