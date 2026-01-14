import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../src/styles/theme.css'
import './dev.css'
import { registerBuiltinApps } from './registerApps'

// Register demo apps before rendering
registerBuiltinApps()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
