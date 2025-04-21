import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css' // если используется Tailwind или базовые стили

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
