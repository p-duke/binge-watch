export const createSignup = user => {
  return {
    type: 'SIGN_UP',
    id: user.id,
    username: user.username,
    email: user.email,
    isLoggedIn: false,
  }
}
