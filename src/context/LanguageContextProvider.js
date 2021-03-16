import React, { useState, createContext } from 'react'
import { IntlProvider } from 'react-intl'
import English from '../lang/en.json'
import Spanish from '../lang/es.json'

export const LanguageContext = createContext()
const local = 'en'
let lang
if (local === 'en') {
  lang = English
} else lang = Spanish

export default function LanguageContextProvider(props) {
  const [language, setLocale] = useState(local)
  const [messages, setMessages] = useState(lang)

  function setLanguage(e) {
    const newLocale = e.target.value
    setLocale(newLocale)
    if (newLocale === 'en') {
      setMessages(English)
    } else if (newLocale === 'es') {
      setMessages(Spanish)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <IntlProvider messages={messages} locale={language}>
        {props.children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}
