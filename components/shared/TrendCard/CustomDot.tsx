import React from 'react'
import { TrendDataPoint } from './TrendChart'

interface CustomDotProps {
  cx?:     number
  cy?:     number
  payload?: TrendDataPoint
}

const CustomDot: React.FC<CustomDotProps> = ({cx, cy, payload}) => {
if (cx === undefined || cy === undefined) return null
  if (payload?.isCurrent) {
    return (
      <>
        <circle cx={cx} cy={cy} r={9} fill="var(--primary)" opacity={0.25} />
        <circle cx={cx} cy={cy} r={5} fill="var(--primary)" stroke="var(--card)" strokeWidth={2} />
      </>
    )
  }
  return <circle cx={cx} cy={cy} r={3} fill="var(--primary)" stroke="var(--card)" strokeWidth={1.5} />
}

export default CustomDot