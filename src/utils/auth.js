import Cookies from 'universal-cookie'
const cookies = new Cookies()

export function isLogged() {
    const access_token = cookies.get('niya_access_token')
    if (access_token)
        return true
    else
        return false
}

export function setAccessTokenCookie(accessToken) {
    cookies.set('niya_access_token', accessToken)
}

export function removeAccessTokenCookie() {
    cookies.remove('niya_access_token')
}

export function getAccessToken() {
    return cookies.get('niya_access_token')
}