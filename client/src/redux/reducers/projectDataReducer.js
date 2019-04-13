
function users(state = [], action) {
  switch (action.type) {
    case 'NARF':
      console.log(action);
      return state;
    default: return state;
  }
}

export default users;