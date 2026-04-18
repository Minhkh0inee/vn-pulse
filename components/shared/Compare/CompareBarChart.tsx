'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface CompareBarChartProps {
  labelA: string
  labelB: string
  data: { metric: string; a: number; b: number }[]
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean
  payload?: { name: string; value: number; fill: string }[]
  label?: string
}) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-[var(--foreground)] mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.fill }}>
          {p.name}: <span className="font-medium">{p.value.toFixed(1)}</span>
        </p>
      ))}
    </div>
  )
}

export default function CompareBarChart({ labelA, labelB, data }: CompareBarChartProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
        Score Comparison
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="metric"
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--accent)', opacity: 0.4 }} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: 'var(--muted-foreground)', paddingTop: 12 }}
          />
          <Bar dataKey="a" name={labelA} fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Bar dataKey="b" name={labelB} fill="var(--chart-2, #10b981)" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
