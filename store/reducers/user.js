import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  users: [],
  newUser: {},
  loading: false,
  registered: false
}

const registerUserStart = (state) => {
  return updateObject(state, { loading: true })
}

const registerUserSuccess = (state, action) => {
  const newUser = { ...action.formData }
  return updateObject(state, {
    users: state.users.concat(newUser),
    newUser,
    loading: false,
    registered: true
  })
}

const registerUserFail = (state) => {
  return updateObject(state, {
    loading: false
  })
}

const registerUserInit = (state) => {
  return updateObject(state, { 
    registered: false 
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_START: return registerUserStart(state)
    case actionTypes.REGISTER_USER_SUCCESS: return registerUserSuccess(state, action)
    case actionTypes.REGISTER_USER_FAIL: return registerUserFail(state)
    case actionTypes.REGISTER_USER_INIT: return registerUserInit(state)
    default: return state
  }
}

export default reducer