'use client'

import React, { useId } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { motion } from 'motion/react'
import ChartSkeleton from './ChartSkeleton'
import CustomTooltip from './CustomTooltip'
import CustomDot from './CustomDot'

export interface TrendDataPoint {
  month: string   // e.g. "Jan 2026"
  score: number   // 0–100
  isCurrent?: boolean
}

export interface TrendChartProps {
  data:       TrendDataPoint[]
  isLoading?: boolean
}

const TrendChart: React.FC<TrendChartProps> = ({ data, isLoading = false }) => {
  const gradientId = useId()

  if (isLoading) return <ChartSkeleton />

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6"
    >
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
        6-Month Trend
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--primary)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}    />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--border)"
          />

          <XAxis
            dataKey="month"
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: string) => v.split(' ')[0]}
          />

          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1 }} />

          <Area
            type="monotone"
            dataKey="score"
            stroke="var(--primary)"
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={<CustomDot />}
            activeDot={{ r: 5, fill: 'var(--primary)', stroke: 'var(--card)', strokeWidth: 2 }}
            isAnimationActive
            animationDuration={700}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default TrendChart
