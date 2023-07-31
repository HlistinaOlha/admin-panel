class TokenService {

  TOKEN_NAME = 'token'

  getToken() {
    return sessionStorage.getItem(this.TOKEN_NAME)
  }

  setToken = (token) => {
    sessionStorage.setItem(this.TOKEN_NAME, token)
  }

  removeToken = () => {
    sessionStorage.removeItem(this.TOKEN_NAME)
  }

  isAuthenticated = () => {
    return !!this.getToken()
  }
}

export default TokenService
