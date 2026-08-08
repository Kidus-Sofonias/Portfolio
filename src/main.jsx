import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

function hideSplashLoader() {
  const loader = document.getElementById('splash-loader')
  if (loader) {
    loader.classList.add('splash-hidden')
    setTimeout(() => loader.remove(), 600)
  }
}

/* Hide the splash loader once the page has fully loaded */
window.addEventListener('load', hideSplashLoader)

/* Safety nets: already-loaded page, or a max 4s cap in case a resource hangs */
if (document.readyState === 'complete') hideSplashLoader()
setTimeout(hideSplashLoader, 4000)
