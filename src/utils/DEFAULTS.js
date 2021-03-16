import constants from './constants'

export default {
  DROPDOWN_OPTIONS: {
    country: [],
    app_version: [],
    build_version: [],
    os_version: [],
    device_name: [],
    language: [],
    package: [],
    booking_rejection_reason: [],
    services: {}
  },
  ARTIST_REQUEST_FILTERS: {
    user_id: '',
    full_name: '',
    email: '',
    phone: '',
    country: '',
    app_version: '',
    build_version: '',
    sign_up_date_start: '',
    sign_up_date_end: '',
    device_name: '',
    device_type: '',
    app_language: '',
  },

  ARTIST_LISTING_FILTERS: {
    user_id: '',
    full_name: '',
    email: '',
    phone: '',
    country: '',
    app_version: '',
    build_version: '',
    sign_up_date_start: '',
    sign_up_date_end: '',
    device_name: '',
    device_type: '',
    language: '',
    is_enabled: '',
    phone_verified: '',
    email_verified: '',
    app_language: '',
    
  },

  APPOINTMENTS_LISTING_FILTERS: {
    booking_id: '',
    artist_name: '',
    customer_name: '',
    scheduled_on: '',
  },

  AMBASSADORS_LISTING_FILTERS: {
    name: '',
    country_code: '',
    phone: '',
    email: '',
    ambassador_id: '',
    started_on: '',
    expiry_on: '',
  },

  AMBASSADOR_PROMO_CODE_FILTERS: {
    start_date: '',
    end_date: '',
  },

  //Booking details for booking modal
  BOOKING_DETAILS: {
    services: [],
  },

  //Apointment Details Page
  APPOINTMENT_DETAILS: {
    artist_details: {},
    customer_details: {},
    booking_details: {},
    services: [],
    feedback: [],
  },

  SORT_FIELD_ARTISTREQUESTS: 'user_id',
  SORT_ORDER_ARTISTREQUESTS: constants['SORT_ORDER_DESC'],

  SORT_FIELD_USERLISTING: 'user_id',
  SORT_ORDER_USERLISTING: constants['SORT_ORDER_DESC'],

  SORT_FIELD_ARTISTS: 'user_id',
  SORT_ORDER_ARTISTS: constants['SORT_ORDER_DESC'],

  SORT_FIELD_BOOKINGS: 'booking_id',
  //1 DESC, 0 ASC
  SORT_ORDER_BOOKINGS: constants['SORT_ORDER_DESC'],

  SORT_FIELD_AMBASSADORS: 'ambassador_id',
  SORT_ORDER_AMBASSADORS: constants['SORT_ORDER_DESC'],

  SORT_FIELD_PROMOS: 'promo_id',
  SORT_ORDER_PROMOS: constants['SORT_ORDER_DESC'],

  LISTING_ENTRIES_NUM: 5,
}
