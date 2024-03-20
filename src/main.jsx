import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'



let elem = document.getElementById('root')
let Dom = ReactDOM.createRoot(elem)
Dom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)