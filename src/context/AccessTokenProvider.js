import { useState, createContext, useEffect } from 'react'
import {getAccessToken} from '../utils/auth'

export const AccessTokenContext = createContext()

export default function AccessTokenProvider(props) {

  const [accessToken, setAccessToken] = useState(getAccessToken())
  console.log(accessToken)
  // useEffect(() => {
  //   console.log(accessToken,'-----Access Token Set-----')
  // },[accessToken])
    
  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {props.children}
    </AccessTokenContext.Provider>
  )
}
