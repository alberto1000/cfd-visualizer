import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'

interface AnimatedCounterProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  target,
  duration = 1500,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0)
  const { ref, isInView } = useInView(0.5)
  const animated = useRef(false)

  useEffect(() => {
    if (!isInView || animated.current) return
    animated.current = true

    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(eased * target)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target, duration])

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
