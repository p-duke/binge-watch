import React from 'react';

export const localRestore = (props) => {
  const { store } = props;
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    store.dispatch({
      type: 'LOG_IN',
      id: user.id,
      username: user.username,
      email: user.email,
      isLoggedIn: false,
      redirect: true,
    });
  }
}
