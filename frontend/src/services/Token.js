class TokenService {
  storeAccessToken(refreshToken) {
    return localStorage.setItem('accessToken', refreshToken);
  }

  storeRefreshToken(refreshToken) {
    return localStorage.setItem('refreshToken', refreshToken);
  }

  // @desc    get accessToken from localStorage
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  // @desc    get refreshToken from localStorage
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  deleteAccessToken() {
    return localStorage.removeItem('accessToken');
  }

  deleteRefreshToken() {
    return localStorage.removeItem('refreshToken');
  }

  // @desc    store token to localStorage
  storeToken(accessToken, refreshToken) {
    this.storeAccessToken(accessToken);
    this.storeRefreshToken(refreshToken);
  }

  // @desc    delete token from localStorage
  deleteToken() {
    this.deleteAccessToken();
    this.deleteRefreshToken();
  }
}

export default new TokenService();
