import React, { useState, useEffect, useContext } from 'react'
import './MainLayout2.css'
import { Redirect, Route, Switch } from 'react-router-dom'

import profileDefault from '../../assets/images/pro.jpg'
import ArtistRequests from '../ArtistRequests/ArtistRequests'
import ArtistProfile from '../ArtistRequests/ArtistProfile/ArtistProfile'
import { removeAccessTokenCookie } from '../../utils/auth'
import { useHistory } from 'react-router-dom'
import Header from './Header'
import ConfirmModal from './ConfirmModal/ConfirmModal'
import ArtistPackages from '../ArtistPackages/ArtistPackages'
import ArtistBeautyProfile from '../ArtistBeautyProfile/ArtistBeautyProfile'
import ArtistListing from '../ArtistListing/ArtistListing'
import UserListing from '../UserListing/UserListing'
import Defaults from '../../utils/DEFAULTS'
import { AccessTokenContext } from '../../context/AccessTokenProvider'
import { LanguageContext } from '../../context/LanguageContextProvider'
import { getDropdownValuesAPI } from '../../api/api'
import ArtistGallery from '../ArtistGallery/ArtistGallery'
import AMArtistProfile from '../ArtistProfile/AMArtistProfile'
import Sidebar from './Sidebar'
import AppointmentsListing from '../Appointments/AppointmentsListing'
import AppointmentDetails from '../Appointments/AppointmentDetails/AppointmentDetails'
import CustomerProfile from '../CustomerProfile/CustomerProfile'
import AmbassadorListing from '../Ambassadors/AmbassadorListing/AmbassadorListing'
import AmbassadorPromoCodes from '../Ambassadors/PromoCodes/PromoCodes'
import AddAmbassador from '../Ambassadors/AddAmbassador/AddAmbassador'
import AddPromoCode from "../PromoCodes/addPromoCode/addPromoCode"
import ArtistCertificates from '../ArtistCertificates/ArtistCertificates'
import ArtistEarnings from '../ArtistEarnings/ArtistEarnings'
import PromoListing from '../PromoCodes/PromoListing/PromoListing'

export default function MainLayout2({ isSidebarHidden, toggleSidebarHidden }) {
  const history = useHistory()
  const { language } = useContext(LanguageContext)
  const { accessToken, setAccessToken } = useContext(AccessTokenContext)

  const [modalShow, setModalShow] = useState(false)
  const [dropdownValues, setDropdownValues] = useState(
    Defaults['DROPDOWN_OPTIONS'],
  )

  // useEffect(() => {
  //   console.log(dropdownValues, '----------')
  // }, [dropdownValues])

  useEffect(() => {
    getDropdownValuesAPI(accessToken, language).then((res) => {
      if (res.success !== false) {
        setDropdownValues({
          ...res.data.data.fields_values,
          booking_rejection_reason: res.data.data.booking_rejection_reason,
          rating_star_values: res.data.data.rating_star_values,
          services: res.data.data.services,
        })
      }
    })
  }, [])

  return (
    <div className="wrapper">
      {/* <!-- Sidebar  --> */}
      <Sidebar isSidebarHidden={isSidebarHidden} setModalShow={setModalShow}/>
      {/* <!-- Page Content  --> */}
      <div id="content">
        <Header
          toggleSidebarHidden={toggleSidebarHidden}
          profileDefault={profileDefault}
          removeAccessTokenCookie={removeAccessTokenCookie}
          setModalShow={setModalShow}
        />
        <Switch>
          <Route path="/artist-management/:artistId/profile/beauty-profile">
            <ArtistBeautyProfile />
          </Route>
          <Route path="/artist-management/:artistId/profile/packages">
            <ArtistPackages availableServices={dropdownValues.services} />
          </Route>
          <Route path="/artist-requests/:artistId/profile">
            <ArtistProfile />
          </Route>
          <Route path="/artist-requests">
            <ArtistRequests dropdownValues={dropdownValues} />
          </Route>
          <Route path="/artist-management/:artistId/profile/earnings">
            <ArtistEarnings availableServices={dropdownValues.services} />
          </Route>
          <Route path="/artist-management/:artistId/profile/certificates">
            <ArtistCertificates />
          </Route>
          <Route path="/artist-management/:artistId/profile/gallery">
            <ArtistGallery />
          </Route>
          <Route path="/artist-management/:artistId/profile">
            <AMArtistProfile />
          </Route>
          <Route path="/artist-management">
            <ArtistListing dropdownValues={dropdownValues} />
          </Route>
          <Route path="/user-management/:customerId/profile">
            <CustomerProfile />
          </Route>
          <Route path="/user-management">
            <UserListing dropdownValues={dropdownValues} />
          </Route>
          <Route path="/appointments/:bookingId/details">
            <AppointmentDetails
              starValues={dropdownValues.rating_star_values}
            />
          </Route>
          <Route path="/appointments">
            <AppointmentsListing
              packageOptions={dropdownValues.package}
              cancelOptions={dropdownValues.booking_rejection_reason}
            />
          </Route>
          <Route path="/ambassadors/add">
            <AddAmbassador />
          </Route>
          <Route path="/promocode/add">
            <AddPromoCode />
          </Route>
          <Route path="/ambassadors/:ambassadorID/promo-codes">
            <AmbassadorPromoCodes />
          </Route>
          <Route path="/ambassadors">
            <AmbassadorListing />
          </Route>
          {/* Promo Codes routes */}
          <Route path="/promo-codes">
            <PromoListing />
          </Route>
          <Route exact path="/">
              <Redirect to="user-management"/>
          </Route>
        </Switch>
      </div>
      <ConfirmModal show={modalShow} setModalShow={setModalShow} />
    </div>
  )
}
