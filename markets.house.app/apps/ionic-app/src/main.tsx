import * as ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { setupIonicReact } from '@ionic/react'
import App from './app/app'

import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

setupIonicReact()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
