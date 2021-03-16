import { Route, Link, Redirect } from 'react-router-dom'
import { isLogged } from './auth'
import {useContext} from 'react'
import { AccessTokenContext } from '../context/AccessTokenProvider'

export default function ProtectedRoute({
  component: Component,
  isSidebarHidden,
  toggleSidebarHidden,
  ...rest
}) {
  const { accessToken, setAccessToken } = useContext(AccessTokenContext)
  
 
  return (
    <Route
      {...rest}
      render={(props) => {
        return accessToken ? (
          <Component
            {...props}
            isSidebarHidden={isSidebarHidden}
            toggleSidebarHidden={toggleSidebarHidden}
          />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }}
    />
  )
}
