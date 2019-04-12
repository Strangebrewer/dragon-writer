export function getCurrentUser(headers) {
  return {
    type: 'GET_CURRENT_USER',
    headers
  }
}