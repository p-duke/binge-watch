import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export const user = (state = [], action) => {
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

export const popularMovies = (state = [], action) => {
  switch (action.type) {
    case 'GET_MOVIES':
      return [
        ...state,
        action.data.map(function(movie) {
          return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: 'https://image.tmdb.org/t/p/w154/'.concat(movie.poster_path),
            releaseDate: movie.release_date,
          }
        })
      ];
    default:
      return state;
  }
};

export const movies = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          overview: action.overview,
          posterPath: 'https://image.tmdb.org/t/p/w342/'.concat(action.poster_path),
          releaseDate: action.release_date,
          watched: false,
          userID: action.userID,
        }
      ]
    case 'USER_MOVIES':
      return action.data.map(function(movie) {
        return {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          watched: movie.watched,
        }
      })
    case 'UPDATE_MOVIE':
      return state.map(movie =>
        (movie.id === action.data.id)
        ? Object.assign({}, action.data)
        : movie
      )
    default:
      return state;
  }
};


export const movieSearch = (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES':
      return action.data.map(function(movie) {
          return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: 'https://image.tmdb.org/t/p/w154/'.concat(movie.poster_path),
            releaseDate: movie.release_date,
          }
        });
    case 'CLEAR_RESULTS':
      return [];
    default:
      return state;
  }
};
const movieApp = combineReducers({
  user,
  popularMovies,
  movies,
  movieSearch,
  form: formReducer,
});

export default movieApp;
