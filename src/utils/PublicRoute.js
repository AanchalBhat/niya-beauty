import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AccessTokenContext } from '../context/AccessTokenProvider'

import { isLogged } from './auth'

export default function PublicRoute({ component: Component, ...rest }) {
  const { accessToken, setAccessToken } = useContext(AccessTokenContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        !accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  )
}
