import React from 'react'
import './MainLayout.css'
import { NavLink, Route } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import logoutIcon from '../../assets/images/logout.svg'
import profileDefault from '../../assets/images/pro.jpg'
import ArtistRequests from '../ArtistRequests/ArtistRequests'
import Switch from 'react-bootstrap/esm/Switch'
import ArtistProfile from '../ArtistRequests/ArtistProfile/ArtistProfile'
import { removeAccessTokenCookie } from '../../utils/auth'
import { useHistory } from 'react-router-dom'
export default function MainLayout(props) {
  const history = useHistory()
  history.push('/artist-requests')
  return (
    <div className="wrapper">
      {/* <!-- Sidebar  --> */}
      <nav id="sidebar">
        <div className="sidebar-header">
          <img src={logo} />
        </div>

        <ul className="list-unstyled components">
          <li className="active">
            <span></span>
            <NavLink className="link" to="/user-management">
              User Management
            </NavLink>
          </li>
          <li>
            <a href="#">
              <span></span>
              Artist Management
            </a>
          </li>
          <li className="active">
            <span></span>
            <NavLink className="link" to="/artist-requests">
              ArtistRequests
            </NavLink>
          </li>
          <li>
            <a href="#">
              <span></span>
              Notifications/Email Managements
            </a>
          </li>
          <li>
            <a href="#">
              <span></span>
              Appointment/Booking Managements
            </a>
          </li>
          <li>
            <a href="#">
              <span></span>
              Reports
            </a>
          </li>
          <li>
            <a href="#">
              <span></span>
              Sales Management Dashboard
            </a>
          </li>
          <li>
            <a href="#">
              <span></span>
              Members and Role
            </a>
          </li>
          <li>
            <a href="#">
              <span></span>
              Gift Cards
            </a>
          </li>
          <li>
            <a href="#">
              <span></span>
              Feedback Management
            </a>
          </li>
        </ul>

        <button type="button" className="btn btn-default logout">
          <img src={logoutIcon} />
        </button>
      </nav>

      {/* <!-- Page Content  --> */}
      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light main-navbar">
          <div className="container-fluid">
            <button type="button" id="sidebarCollapse" className="btn btn-info">
              <i className="fas fa-align-left"></i>
            </button>
            <form>
              <div className="form-group search-here position-relative mb-0 ml-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Here"
                />
                <i className="fas fa-search"></i>
              </div>
            </form>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav ml-auto">
                {/* <!-- <li className="nav-item active">
                                <a className="nav-link" href="#">Page</a>
                            </li> --> */}

                <li className="nav-item topnav-dropdown">
                  <div className="dropdown">
                    <button
                      className="btn btn-primary dropdown-toggle flex-content"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <p className="mb-0">Angelina Moore</p>
                      <img src={profileDefault} /> &nbsp;
                      <i className="fas fa-angle-down"></i>
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          removeAccessTokenCookie()
                          history.push('/login')
                        }}
                      >
                        <i className="fas fa-sign-out-alt"></i> Logout
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/artist-requests">
            <ArtistRequests />
          </Route>
          <Route path="/requests/profile/:artistId">
            <ArtistProfile />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
