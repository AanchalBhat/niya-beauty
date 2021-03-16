import React from 'react'
import { FormattedMessage } from 'react-intl'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import logoutIcon from '../../assets/images/logout.svg'

export default function Sidebar({ isSidebarHidden, setModalShow }) {
  return (
    <nav id="sidebar" className={isSidebarHidden ? 'active' : ''}>
      <div className="sidebar-header">
        <img src={logo} />
      </div>

      <ul className="list-unstyled components">
        <li className="">
          <NavLink to="/user-management" className="">
            <span>
              <i className="fas fa-user"></i>
            </span>
            <p>
              <FormattedMessage
                id="userManagement"
                defaultMessage="User Management"
              />
            </p>
          </NavLink>
        </li>
        <li>
          {/* <a href="#"> */}
          <NavLink to="/artist-management" className="">
            <span>
              <i className="fas fa-user-tie"></i>
            </span>
            <p>
              <FormattedMessage
                id="artistManagement"
                defaultMessage="Artist Management"
              />
            </p>
            {/* </a> */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/artist-requests" className="flex-content">
            <span>
              <i className="fas fa-user-plus"></i>
            </span>
            <p>
              <FormattedMessage
                id="artistRequests"
                defaultMessage="Artist Requests"
              />
            </p>
            {/* <p className="count-round">12</p> */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/notifications" className="flex-content">
            <span>
              <i className="fas fa-bell"></i>
            </span>
            <p>
              <FormattedMessage
                id="notificationEmailManagement"
                defaultMessage="Notifications/Email Management"
              />
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/appointments">
            <span>
              <i className="fas fa-calendar-check"></i>
            </span>
            <p>
              <FormattedMessage
                id="appointmentBookingManagement"
                defaultMessage="Appointment/Booking Managements"
              />
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports">
            <span>
              <i className="fas fa-flag"></i>
            </span>
            <p>
              <FormattedMessage id="reports" defaultMessage="Reports" />
            </p>
          </NavLink>
        </li>
        <li>
          <a href="#">
            <span>
              <i className="fas fa-chart-line"></i>
            </span>
            <p>
              <FormattedMessage
                id="salesManagementDashboard"
                defaultMessage="Sales Management Dashboard"
              />
            </p>
          </a>
        </li>
        <li>
          <a href="#">
            <span>
              <i className="fas fa-users-cog"></i>
            </span>
            <p>
              <FormattedMessage
                id="membersAndRole"
                defaultMessage="Members and Role"
              />
            </p>
          </a>
        </li>
        <li>
          <a href="#">
            <span>
              <i className="fas fa-gifts"></i>
            </span>
            <p>
              <FormattedMessage id="giftCards" defaultMessage="Gift Cards" />
            </p>
          </a>
        </li>
        <li>
          <a href="#">
            <span>
              <i className="fas fa-file-alt"></i>
            </span>
            <p>
              <FormattedMessage
                id="feedbackManagement"
                defaultMessage="Feedback Management"
              />
            </p>
          </a>
        </li>
        <li>
          <NavLink to="/promo-codes">
            <span>
              <i className="fas fa-money-check-alt"></i>
            </span>
            <p>
              <FormattedMessage id="promoCodes" defaultMessage="Promo Codes" />
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/ambassadors">
            <span>
              <i className="fas fa-user-tie"></i>
            </span>
            <p>
              <FormattedMessage
                id="niyaAmbassadors"
                defaultMessage="Niya Ambassadors"
              />
            </p>
          </NavLink>
        </li>
      </ul>

      <button
        type="button"
        className="btn btn-default logout"
        onClick={() => {
          setModalShow(true)
        }}
      >
        <img src={logoutIcon} />
      </button>
    </nav>
  )
}
