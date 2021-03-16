import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Header({
  profileDefault,
  removeAccessTokenCookie,
  toggleSidebarHidden,
  setModalShow,
}) {
  const history = useHistory()
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light main-navbar">
      <div className="container-fluid">
        <button
          type="button"
          id="sidebarCollapse"
          className="btn btn-info"
          onClick={() => {
            toggleSidebarHidden((prevState) => !prevState)
          }}
        >
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                  <span
                    className="dropdown-item logout-button"
                    onClick={() => {
                      setModalShow(true)
                    }}
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
