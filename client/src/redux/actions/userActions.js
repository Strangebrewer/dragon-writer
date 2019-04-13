import axios from 'axios';

export function getCurrentUser(headers) {
  return {
    type: 'GET_CURRENT_USER',
    payload: new Promise((resolve, reject) => {
      axios.get('/user', { ...headers })
        .then(user => {
          resolve(user.data.user)
        })
        .catch(err => reject(err));
    })
  }
}