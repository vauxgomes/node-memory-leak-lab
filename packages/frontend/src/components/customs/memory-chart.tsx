import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { RefreshCcw } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import { Button } from '../ui/button'

import type { ChartConfig } from '@/components/ui/chart'
import type { IMemoryStats } from '@shared/index'

const chartConfig = {
  heapUsed: {
    label: 'Heap Used',
    color: 'var(--chart-1)'
  },
  rss: {
    label: 'RSS (Resident Set)',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig

interface MemoryChartProps {
  data: IMemoryStats[]
}

export function MemoryChart({ data }: MemoryChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Memory Usage</CardTitle>
        <CardDescription>Memory usage over time</CardDescription>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* HeapUsed */}
            <Line
              dataKey="heapUsed"
              type="linear"
              stroke="var(--color-heapUsed)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />

            {/* RSS */}
            <Line
              dataKey="rss"
              type="linear"
              stroke="var(--color-rss)"
              strokeDasharray="4 4"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Current Heap: {data[data.length - 1]?.heapUsed.toFixed(2)} MB
        </div>
        <div className="leading-none text-muted-foreground">
          Showing real-time V8 engine statistics.
        </div>
      </CardFooter>
    </Card>
  )
}
