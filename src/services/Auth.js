import * as jwt from 'jsonwebtoken'

export function isAdmin() {

  const checkJwt = (token) => {
    var strToken = jwt.decode(token)
    return strToken.admin === '1' ? true : deleteToken() && false
  }

  return (
    getToken() !== null ? checkJwt(getToken())
      : false
  )
}

export function setToken(token) {
  localStorage.setItem('@myapp/token', token)
}

export function getToken() {
  return localStorage.getItem('@myapp/token')
}

export function deleteToken() {
  return localStorage.removeItem('@myapp/token')
}