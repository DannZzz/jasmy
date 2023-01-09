import { FC } from 'react'
import useTheme from '../../hooks/useTheme'
import './Themed.scss'

const Themed: FC<{ element: JSX.Element }> = (props) => {
  const theme = useTheme()
  const el = { ...props.element }
  const _props = { ...el.props }
  if (!_props.style) _props.style = {}
  for (let k in theme) {
    _props.style[k] = theme[k]
  }
  el.props = _props
  return el
}

export default Themed
