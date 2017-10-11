import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { isEmpty } from 'lodash';

export default class SearchMovie extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      posterBasePath: "https://image.tmdb.org/t/p/w154",
    }
    this.search = this.search.bind(this);
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

  search(e) {
    e.preventDefault();
    const self = this;
    self.setState({ results: [] });
    const apiBase = "https://api.themoviedb.org/3/search/movie?api_key=8321a3cfc56c16d3d5e7144336d8a6e2&language=en-US&query="
    const apiEnd = "&page=1&include_adult=false"

    axios({
      method: 'GET', 
      url: apiBase + this.refs.query.value.split(' ').join('%20') + apiEnd,
      data: {
      },
    }).then(function(response) {
      self.setState({ results: response.data.results });
    }).catch(function(error) {
      console.log("Movie search blew up!", error);
    });
  }

  render() {
    const movies = this.state.results;
    const { store } = this.context;
    const user = store.getState().user[0];

    return (
      <div className="container-fluid">
        <div className="container" style={{marginBottom: 60+'px'}}>
          <form ref='form' action="/movies" method="post">
            <div className="form-group">
              <label>Search Movies</label>
              <input type="text" ref="query" name="query" className="form-control" placeholder="Try a search like 'star wars'" required />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" onClick={this.search}>Search</button>
            </div>
            { !_.isEmpty(movies)
                ? movies.map((movie, index) =>
                  <div key={index} className="list-group">
                    <a href="#" className="list-group-item" key={index} style={{listStyle: 'none'}}>
                      <img ref="posterPath" className="img-responsive" name="posterPath" src={this.state.posterBasePath+movie.poster_path} alt={movie.title} />
                      <p ref="title">{movie.title}</p>
                      <p>Summary: <span ref="overview">{movie.overview}</span></p>
                      <p>Release Date: <span ref="releaseDate">{movie.release_date}</span></p>
                      { (user && user.isLoggedIn)
                          ? <button type="submit" className="btn btn-primary" onClick={this.addMovie}>Add Movie</button>
                          : <button type="submit" className="btn btn-primary disabled" data-toggle="tooltip" title="Please sign up or log in to add movies" data-placement="top" disabled="disabled">Add Movie</button>
                      }
                    </a>
                  </div>
                )
                : <p>No Results. Please try to search above.</p>
            }
          </form>
        </div>
      </div>
    );
  }
}

SearchMovie.contextTypes = {
  store: React.PropTypes.object
};
