import { combineReducers } from 'redux'

// could also have actions like LOG_IN and LOG_OUT
const user = (state = [], action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return [
        ...state,
        {
          id: action.id,
          username: action.username,
          email: action.email,
          isLoggedIn: true,
          redirect: true,
        }
      ]
    case 'LOG_IN':
      return [
        ...state,
        {
          id: action.id,
          username: action.username,
          email: action.email,
          isLoggedIn: true,
          redirect: true,
        }
      ]
    case 'LOG_OUT':
      return [
        ...state,
        {
          id: '',
          username: '',
          email: '',
          isLoggedIn: false,
          redirect: true,
        }
      ];
    default:
      return state;
  }
};

const movieApp = combineReducers({
  user,
});

export default movieApp;
