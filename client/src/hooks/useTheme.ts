import { useAppSelector } from '../app/hooks'
import Theme from '../constants/Theme'

export default function useTheme() {
  const themeState = useAppSelector((state) => state.theme)

  return Theme[themeState.theme]
}
