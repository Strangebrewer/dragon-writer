
function users(state = [], action) {
  switch (action.type) {
    case 'GET_CURRENT_USER_FULFILLED':
      return {
        ...state,
        ...action.payload
      }
    default: return state;
  }
}

export default users;