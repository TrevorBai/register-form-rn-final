import * as actionTypes from './actionTypes'
import axios from 'axios'

export const registerUser = (formData) => {
  return async dispatch => {
    dispatch(registerUserStart())
    try {
      const response = await axios.post('https://register-form-rn-server.herokuapp.com/users/', formData)
      dispatch(registerUserSuccess(response.data._id, response.data))
    } catch (e) {
      dispatch(registerUserFail(e))
    }
  }
}

export const registerUserStart = () => {
  return {
    type: actionTypes.REGISTER_USER_START
  }
}

export const registerUserSuccess = (id, formData) => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS,
    id,
    formData
  }
}

export const registerUserFail = (error) => {
  return {
    type: actionTypes.REGISTER_USER_FAIL,
    error
  }
}

export const registerUserInit = () => {
  return {
    type: actionTypes.REGISTER_USER_INIT
  }
}