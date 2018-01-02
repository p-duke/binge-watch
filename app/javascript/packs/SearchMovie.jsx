import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { isEmpty } from 'lodash';
import PopularMovies from './PopularMovies';

export default class SearchMovie extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      posterBasePath: "https://image.tmdb.org/t/p/w154",
    }
    this.closeResults = this.closeResults.bind(this);
    this.addMovie = this.addMovie.bind(this);
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  closeResults() {
    const el = document.getElementById("myNav")

    el.addEventListener('transitionend', (e) => {
      this.context.store.dispatch({ type: 'CLEAR_RESULTS' });
    });

    el.style.height = "0%";
  }

  addMovie(e) {
    e.preventDefault();
    e.target.innerText = 'Movie Added';
    e.target.disabled = true;
    const self = this;
    const userID = self.context.store.getState().user[0].id;
    const movie = this.state.results.find(function findMovie(movie) {
      if (movie.title === e.target.parentElement.children[1].innerText) {
        return movie;
      }
    });
    const query = `
      mutation {
        createMovie (
          user_id: "${parseInt(userID)}",
          title: "${movie.title}",
          overview: "${movie.overview}",
          release_date: "${movie.release_date}",
          poster_path: "${this.state.posterBasePath+movie.poster_path}"
        ) {
            id
            title
            overview
            release_date
            poster_path
            user {
              id
            }
          }
    }`;

    axios({
      method: 'POST', 
      url: '/graphql',
      data: {
        query: query
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content,
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      self.context.store.dispatch({
        type: 'ADD_MOVIE',
        id: response.data.data.createMovie.id,
        title: response.data.data.createMovie.title,
        overview: response.data.data.createMovie.overview,
        posterPath: 'https://image.tmdb.org/t/p/w342/'.concat(response.data.data.createMovie.poster_path),
        releaseDate: response.data.data.createMovie.release_date,
        userID: response.data.data.createMovie.user.id,
      });
    }).catch(function(error) {
      self.setState({ errors: error.response.data })
    });
  }

  render() {
    const { store } = this.context;
    const movies = store.getState().movieSearch;
    const user = store.getState().user[0];

    return (
      <div className="container-fluid">
        <div className="container" style={{marginBottom: 60+'px'}}>
          { !isEmpty(movies)
            ? 
            <div id="myNav" className="overlay">
              <a className="closebtn" onClick={this.closeResults}>&times;</a>
              <div className="overlay-content">
                { movies.map((movie, index) => (
                  <a href="#"  key={index} style={{listStyle: 'none', display: 'inline-block'}}>
                    <img ref="posterPath" className="img-responsive" name="posterPath" src={movie.posterPath} alt={movie.title} />
                  </a>
                )) }
              </div>
            </div>
            : <PopularMovies />
          }
        </div>
      </div>
    );
  }
}

SearchMovie.contextTypes = {
  store: React.PropTypes.object
};

