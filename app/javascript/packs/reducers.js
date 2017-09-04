import { combineReducers } from 'redux'

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

const movies = (state = [], action) => {
  switch (action.type) {
    case 'GET_MOVIES':
      return [
        ...state,
        action.data.map(function(movie) {
         return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: 'https://image.tmdb.org/t/p/w342/'.concat(movie.poster_path),
            releaseDate: movie.release_date,
          }
        })
      ];
    default:
      return state;
  }
};

const movieApp = combineReducers({
  user,
  movies,
});

export default movieApp;
