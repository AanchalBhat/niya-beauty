import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import LanguageContextProvider from './context/LanguageContextProvider'
import AccessTokenProvider from './context/AccessTokenProvider'
const locale = navigator.language
if (locale.substring(0, 2) === 'en') {
  console.log('en')
}

ReactDOM.render(
  // <React.StrictMode>
    <Router>
      <AccessTokenProvider>
        <LanguageContextProvider>
          <App />
        </LanguageContextProvider>
      </AccessTokenProvider>
    </Router>
  // </React.StrictMode >
  ,
  document.getElementById('root'),
)
