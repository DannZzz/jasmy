import React from 'react'
import { FC } from 'react'
import { memo } from 'react'
import { Colors } from '../../constants/Theme'
import './LogoText.scss'

const LogoText: FC<{
  className?: string
  size?: string | number
  onClick?: () => void
}> = ({ size, onClick, className }) => {
  return (
    <span
      onClick={onClick}
      style={{
        ...(size
          ? { fontSize: typeof size === 'string' ? size : `${size}px` }
          : {}),
        backgroundImage: `linear-gradient(60deg, ${Colors.mainGradient[1]}, ${Colors.mainGradient[2]})`,
      }}
      className={`logo-text ${className || ''} ${onClick ? 'pointer' : ''}`}
    >
      Jasmy
    </span>
  )
}

export default memo(LogoText)
