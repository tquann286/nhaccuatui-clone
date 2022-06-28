import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { StoreProvider } from 'store'
import { ErrorBoundary } from 'components'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
