import HTTP from './http-common'
import UserResource from './user.service'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let AuthService = {
  login(body) {
    return HTTP.post('auth/login', body)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        return UserResource.get()
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        throw err
      })
  },

  signup(body) {
    return UserResource.create(body)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        return UserResource.get()
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        throw err
      })
  },

  forget() {

  },

  reset() {

  },

  getCurrentUser() {
    return UserResource.get().then(response => {
      return response.data
    })
      .catch(err => {
        throw err
      })
  },

  changePassword(body) {
    return UserResource.changePassword(body)
      .then(response => {
        return response.data
      })
      .catch(err => {
        throw err
      })
  }
}

export default AuthService