import './App.css'
import { Switch } from 'react-router-dom'
import './components/UserManagement/UserManagement'
import Login from './components/Login/Login'
import MainLayout from './components/MainLayout/MainLayout2'
import PublicRoute from './utils/PublicRoute'
import React, { useState, useContext, useEffect } from 'react'
import ProtectedRoute from './utils/ProtectedRoute'
import { AccessTokenContext } from './context/AccessTokenProvider'
import { isLogged, getAccessToken } from './utils/auth'
import AmbassadorListingProvider from './context/AmbassadorListingProvider'
import PromoListingProvider from './context/PromoListingProvider'
import ArtistListingProvider from './context/ArtistListingProvider'
import UserListingProvider from './context/UserListingProvider'
import ArtistRequestsProvider from './context/ArtistRequestsProvider'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { accessToken, setAccessToken } = useContext(AccessTokenContext)
  // useEffect(() => {
  //   if (access) {
  //     const token = getAccessToken()
  //     setAccessToken(token)
  //   }
  // })

  const [isSidebarHidden, toggleSidebarHidden] = useState(true)
  return (
    <div className="App">
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <AmbassadorListingProvider>
          <PromoListingProvider>
            <ArtistListingProvider>
              <UserListingProvider>
                <ArtistRequestsProvider>
                  <ProtectedRoute
                    path="/"
                    component={MainLayout}
                    isSidebarHidden={isSidebarHidden}
                    toggleSidebarHidden={toggleSidebarHidden}
                  />
                </ArtistRequestsProvider>
              </UserListingProvider>
            </ArtistListingProvider>
          </PromoListingProvider>
        </AmbassadorListingProvider>
      </Switch>
    </div>
  )
}

export default App
