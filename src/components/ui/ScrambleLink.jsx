import { useState } from 'react'
import { TextScramble } from './TextScramble'

/**
 * A link text that scrambles on hover
 * Use inside <Link>, <a>, or <button> elements
 */
export function ScrambleLink({ 
  children, 
  className = '',
  speed = 0.02,
  duration = 0.5,
  ...props 
}) {
  const [isTrigger, setIsTrigger] = useState(false)

  return (
    <TextScramble
      className={className}
      as="span"
      speed={speed}
      duration={duration}
      trigger={isTrigger}
      onHoverStart={() => setIsTrigger(true)}
      onScrambleComplete={() => setIsTrigger(false)}
      {...props}
    >
      {children}
    </TextScramble>
  )
}
