
function users(state = [], action) {
  switch (action.type) {
    case 'GET_CURRENT_USER':
      console.log(action);
      return state;
    default: return state;
  }
}

export default users;