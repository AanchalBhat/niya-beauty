import axios from 'axios'
import config from '../config/config'
//import { getAccessToken } from '../utils/auth'

const { baseURL } = config

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    //access_token: getAccessToken(),
  },
}

const headers = {
  'Content-Type': 'application/json',
}

//Set access token in headers
function setAccessToken(accessToken) {
  headers['access_token'] = accessToken
}

localStorage.setItem('niya_language', 'en')
const appLanguage = localStorage.getItem('niya_language')

let axiosInstance = axios.create(defaultOptions)

//Interceptor to handle unsuccessful requests
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(err)
    return {
      success: false,
    }
  },
)

export function getArtistRequestsAPI(reqObject, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('/admin/artist-requests', reqObject, {
    headers,
  })
}

export function getArtistProfileAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('/admin/artist/profile', reqObj, {
    headers,
  })
}

//1 -> Approve   2-> Disapprove   4->Reject
export function changeArtistVerificationStatusAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.put('/admin/artist/verification', reqObj, {
    headers,
  })
}

//Get auth token from the server using email and password (1)
export function login(email, password, language = appLanguage) {
  return axiosInstance.post('/admin/login', {
    email,
    password,
    language,
  })
}

//Resend the auth token (2)
export function resendToken(auth_token, language = appLanguage) {
  return axiosInstance.post('/admin/auth-code/resend', {
    auth_token,
    language,
  })
}

//Verify the auth token (3)
export function verifyAuthToken(
  auth_token,
  otp_phone,
  otp_email,
  language = appLanguage,
) {
  return axiosInstance.post('/admin/auth-code/verify', {
    auth_token,
    otp_email,
    otp_phone,
    language,
  })
}

export function getDropdownValuesAPI(accessToken, language) {
  setAccessToken(accessToken)
  return axiosInstance.get(`admin/get-dropdown-fields-values?language=${language}`, {
    headers,
  })
}

export function updateArtistAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.put('admin/artist/update', reqObj, {
    headers,
  })
}

export function getArtistsAPI(reqObject, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('admin/artist-listing', reqObject, { headers })
}

export function getUsersAPI(reqObject, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('admin/customer-listing', reqObject, { headers })
}

// Enable/Disable user
export function changeUserStatusAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.put('admin/disable-enable-user', reqObj, { headers })
}

export function getBrandsAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('admin/getBrands', reqObj, { headers })
}

export function changeMediaStatusAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.put('admin/change-media-status', reqObj, { headers })
}

export function uploadArtistGalleryMediaAPI(
  reqObj,
  accessToken,
  onUploadProgress,
  cancelToken,
) {
  setAccessToken(accessToken)
  return axiosInstance.post('admin/media/upload', reqObj, {
    headers,
    onUploadProgress,
    cancelToken,
  })
}

export function getBookingsAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('admin/getBookings', reqObj, { headers })
}

export function changeBookingStatusAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.put('admin/change-booking-status', reqObj, { headers })
}

export function getBookingDetailsAPI(queryParams, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.get(
    `admin/getBookingDetails?booking_id=${queryParams.bookingId}&language=${queryParams.language}`,
    {
      headers,
    },
  )
}

//Customer = user
export function getCustomerProfileAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('/admin/customer/profile', reqObj, { headers })
}

export function updateCustomerProfileAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.put('/admin/customer/update', reqObj, { headers })
}

export function getAmbassadorsAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('/admin/ambassador-listing', reqObj, { headers })
}

// export function getAmbassadorPromoCodesAPI(reqObj, accessToken) {
//   setAccessToken(accessToken)
//   return axiosInstance.post('/admin/ambassador/promo-codes', reqObj, {
//     headers,
//   })
// }

export function getAmbassadorPromoIDsAPI(
  { language, ambassador_id },
  accessToken,
) {
  setAccessToken(accessToken)
  return axiosInstance.get(
    `admin/get-ambassador-promo-codes?language=${language}&ambassador_id=${ambassador_id}`,
    { headers },
  )
}

export function getPromoCodeDetailsAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('/admin/ambassador/promo-code-details', reqObj, {
    headers,
  })
}

export function addAmbassadorAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('/admin/ambassador/add', reqObj, { headers })
}

export function getAmbassadorPromoCodesAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('/admin/ambassador/promo-codes', reqObj, {
    headers,
  })
}

export function uploadArtistCertificateAPI(
  reqObj,
  accessToken,
  onUploadProgress,
  cancelToken,
) {
  setAccessToken(accessToken)
  return axiosInstance.post('/admin/artist-certificates/upload', reqObj, {
    headers,
    onUploadProgress,
    cancelToken,
  })
}

export function getArtistPackagesAPI(params, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.get('/admin/artist/packages-services', {
    headers,
    params
  })
}

export function updatePackageAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('/admin/artist/update/packages-services', reqObj, {
    headers,
  })
}

export function getArtistEarningsAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('/admin/artist/earnings', reqObj, {
    headers,
  })
}

export function getPromoCodesAPI(reqObj, accessToken) {
  setAccessToken(accessToken)
  return axiosInstance.post('/admin/promo-codes-listing', reqObj, {
    headers,
  })
}

export default axiosInstance()
