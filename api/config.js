module.exports = {
  unless: [
    '/auth/login',
    '/auth/refresh',  
  ],
  accessTokenKey: process.env.ACCESS_TOKEN_KEY || 'swsh23hjddnns',
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY || 'dhw782wujnd99ahmmakhanjkajikhiwn2n',
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE || 1800,
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || 60 * 60 * 24 * 30,
}
