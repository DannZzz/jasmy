import React, { CSSProperties, FC } from 'react'
import './BesanSpan.scss'

const BesanSpan: FC<{ children: JSX.Element | any; style?: CSSProperties }> = ({
  children,
  style,
}) => {
  return (
    <span style={style} className="besan-font">
      {children}
    </span>
  )
}

export default BesanSpan
