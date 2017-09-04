import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class SearchMovie extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    }
    this.search = this.search.bind(this);
    
  }

  search(e) {
    e.preventDefault();
    const self = this;
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
    const posterBasePath = "https://image.tmdb.org/t/p/w154"
    return (
      <div className="container-fluid">
        <div className="container" style={{marginBottom: 60+'px'}}>
          <form ref='form' action="/users" method="post">
            <div className="form-group">
              <label>Search Movies</label>
              <input type="text" ref="query" name="query" className="form-control" placeholder="Try a search like 'star wars'" required />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.search}>Search</button>
          </form>
        </div>
        { movies
          ? movies.map((movie, index) =>
            <div key={index} className="container">
              <div className="list-group">
                <a href="#" className="list-group-item" key={index} style={{listStyle: 'none'}}>
                  <img className="img-responsive" src={posterBasePath+movie.poster_path} alt={movie.title} />
                  <p>{movie.title}</p>
                  <p>Summary: {movie.overview}</p>
                  <p>Release Date: {movie.release_date}</p>
                </a>
              </div>
            </div>
          )
          : <p>No Results. Please try to search above.</p>
        }
      </div>
    );
  }
}

SearchMovie.contextTypes = {
  store: React.PropTypes.object
};
