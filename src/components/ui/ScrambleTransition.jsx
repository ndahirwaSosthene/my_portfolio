'use client'
import { useEffect, useState, useRef } from 'react'

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/**
 * ScrambleTransition - Animates text changes with a scramble effect
 * When the `text` prop changes, it scrambles to the new text
 */
export function ScrambleTransition({
  text,
  duration = 0.6,
  speed = 0.03,
  characterSet = defaultChars,
  className,
  as: Component = 'span',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const targetTextRef = useRef(text)
  const intervalRef = useRef(null)

  useEffect(() => {
    // If text hasn't changed, do nothing
    if (text === targetTextRef.current && !isAnimating) {
      return
    }

    targetTextRef.current = text

    // Clear any existing animation
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    setIsAnimating(true)

    const targetText = text
    const steps = Math.max(duration / speed, 1)
    let step = 0

    intervalRef.current = setInterval(() => {
      let scrambled = ''
      const progress = step / steps

      // Get the longer of current display or target for smooth transition
      const maxLength = Math.max(displayText.length, targetText.length)

      for (let i = 0; i < maxLength; i++) {
        if (targetText[i] === ' ' || displayText[i] === ' ') {
          scrambled += ' '
          continue
        }

        // Reveal characters from left to right based on progress
        if (progress * targetText.length > i) {
          scrambled += targetText[i] || ''
        } else if (i < targetText.length) {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)]
        }
      }

      setDisplayText(scrambled)
      step++

      if (step > steps) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setDisplayText(targetText)
        setIsAnimating(false)
      }
    }, speed * 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text])

  return (
    <Component className={className} {...props}>
      {displayText}
    </Component>
  )
}
