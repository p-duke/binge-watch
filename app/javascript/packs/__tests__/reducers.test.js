import { user, movies, popularMovies } from '../reducers';

const signUp = {
  type: 'SIGN_UP',
  id: 1,
  username: 'Tony Soprano',
  email: 'tony@gmail.com',
  isLoggedIn: false,
  redirect: false,
};

const logIn = {
  type: 'LOG_IN',
  id: 1,
  username: 'Tony Soprano',
  email: 'tony@gmail.com',
  isLoggedIn: false,
  redirect: false,
};

const logOut = {
  type: 'LOG_OUT',
  id: 1,
  username: 'Tony Soprano',
  email: 'tony@gmail.com',
  isLoggedIn: false,
  redirect: false,
};

const listOfMovies = { 
  type: 'GET_MOVIES',
  data: [{
    id: 1,
    title: 'The girl with no name',
    overview: 'Aria Stark is a badass!',
    poster_path: 'here/comes/aria',
    release_date: 'who knows!',
  },
  {
    id: 2,
    title: 'White boy can\'t dance',
    overview: 'The sequal to white man can\'t jump!',
    poster_path: 'the/best/crispy/tacos',
    release_date: '2017-01-01',
  }]
};

const userMovie = {
  type: 'ADD_MOVIE',
  id: 2,
  title: 'White boy can\'t dance',
  overview: 'The sequal to white man can\'t jump!',
  poster_path: 'the/best/crispy/tacos',
  release_date: '2017-01-01',
  userID: 1,
};

describe('user reducer', () => {
  it('should return the empty state as default', () => {
    expect(user(undefined, {})).toEqual([]);
  })

  it('should handle SIGN_UP', () => {
    expect(
      user([], signUp)
    ).toEqual([
      {
        id: 1,
        username: 'Tony Soprano',
        email: 'tony@gmail.com',
        isLoggedIn: true,
        redirect: true,
      }
    ])
  })

  it('should handle LOG_IN', () => {
    expect(
      user([], logIn)
    ).toEqual([
      {
        id: 1,
        username: 'Tony Soprano',
        email: 'tony@gmail.com',
        isLoggedIn: true,
        redirect: true,
      }
    ])
  })

  it('should handle LOG_OUT', () => {
    expect(
      user([], logOut)
    ).toEqual([
      {
        id: '',
        username: '',
        email: '',
        isLoggedIn: false,
        redirect: true,
      }
    ])
  })
});

describe('popularMovies reducer', () => {
  it('should handle GET_MOVIES', () => {
    expect(popularMovies([], listOfMovies)[0]).toHaveLength(2);
  });
});

describe('movies reducer', () => {
  it('should handle ADD_MOVIE', () => {
    expect(movies([{id: 1, title: 'hello', overview: 'world'}], userMovie)).toHaveLength(2);
  });

  it('should handle USER_MOVIES', () => {
    listOfMovies.type = 'USER_MOVIES';
    expect(movies([], listOfMovies)[0]).toHaveLength(2);
  });
});
