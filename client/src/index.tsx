import { createRoot } from 'react-dom/client'
import App from './components/App/App'
import Providers from './components/Providers/Providers'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <Providers>
    <App />
  </Providers>
)
