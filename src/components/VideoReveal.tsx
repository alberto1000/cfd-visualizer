import { useEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'

interface VideoRevealProps {
  src: string
  className?: string
  ariaLabel?: string
  aspectRatio?: string
}

export function VideoReveal({ src, className = '', ariaLabel, aspectRatio = '16/9' }: VideoRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, isInView } = useInView(0.2)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isInView])

  return (
    <div ref={ref} className={`overflow-hidden rounded-xl ${className}`}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={ariaLabel}
        className="w-full h-full object-cover"
        style={{ aspectRatio }}
      />
    </div>
  )
}
