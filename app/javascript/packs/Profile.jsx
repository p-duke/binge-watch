import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { capitalize } from 'lodash';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      posterBasePath: "https://image.tmdb.org/t/p/w154",
    }
    this.removeMovie = this.removeMovie.bind(this);
    this.checkWatched = this.checkWatched.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { store } = this.context;
    const user = store.getState().user[0];
    const query = `
      query {
        userMovies(userID: "${user.id}") {
          id,
          title,
          overview,
          poster_path,
          release_date,
          watched,
        }
    }`;

    axios({
      method: 'GET', 
      url: '/graphql',
      params: {
        query: query
      }
    }).then(function(response) {
      return self.context.store.dispatch({
        type: 'USER_MOVIES',
        data: response.data.data.userMovies,
      });
    }).then(function(response) {
      self.setState({ movies: response.data });
    }).catch(function(error) {
      console.log("Movie search blew up!", error);
    });
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

  checkWatched(e) {
    e.preventDefault();
    const self = this;
    const isWatched = e.target.checked;
    const userID = self.context.store.getState().user[0].id;
    const changedMovie = e.target.parentElement.parentElement.parentElement.children[0].innerText;
    const movie = this.state.movies.find(function findMovie(movie) {
      if (movie.title === changedMovie) {
        return movie;
      }
    });

    const query = `
      mutation {
        updateMovie(id: "${parseInt(movie.id)}", userID: "${parseInt(userID)}", watched: ${isWatched}) {
          id
          title
          overview
          poster_path
          release_date
          watched
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
        type: 'UPDATE_MOVIE',
        data: response.data.data.updateMovie,
      });
    }).catch(function(error) {
      console.log(error);
    });
  }

  removeMovie(e) {
    e.preventDefault();
    const self = this;
    const userID = self.context.store.getState().user[0].id;
    const parentDiv = e.target.parentElement.parentElement.parentElement;

    e.target.innerText = 'Movie Removed';
    e.target.disabled = true;
    setTimeout(function() { parentDiv.remove() }.bind(this), 1000);

    const movie = this.state.movies.find(function findMovie(movie) {
      if (movie.title === e.target.parentElement.children[0].innerText) {
        return movie;
      }
    });

    const query = `
      mutation {
        deleteMovie(id: "${parseInt(movie.id)}", userID: "${parseInt(userID)}") {
          id
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
    }).catch(function(error) {
      self.setState({ errors: error.response.data })
    });
  }

  render() {
    const movies = this.context.store.getState().movies;
    const user = this.context.store.getState().user[0];

    return (
      <div className="container target">
        <div className="row">
          <div className="col-sm-10">
            <h1 className="">Hi, {capitalize(user.username)}!</h1>
            <br/>
          </div>
          <div className="col-sm-2">
            <a href="/users" className="pull-right">
              <img title="profile image" className="img-circle img-responsive" src="http://www.rlsandbox.com/img/profile.jpg"/>
            </a>
          </div>
        </div>
        <hr className=""/>
        <br/>
        <div className="row">
          <div className="col-sm-3">
            <ul className="list-group">
              <li className="list-group-item text-muted" ><i className="glyphicon glyphicon-user"></i>   Profile</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className="">Joined</strong></span>10.13.2017</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className="">Favorite Movie</strong></span>The Big Labowski</li>
            </ul>
            <ul className="list-group">
              <li className="list-group-item text-muted"><i className="glyphicon glyphicon-film"></i>   Activity</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className="">Shares</strong></span> 125</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className="">Likes</strong></span> 13</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className="">Posts</strong></span> 37</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className="">Followers</strong></span> 78</li>
            </ul>
          </div>
          <div className="col-sm-9">
            <div className="panel panel-default">
              <div className="panel-heading">{capitalize(user.username)}'s Bio</div>
              <div className="panel-body"> A long description about me.</div>
            </div>
            <div className="panel panel-default target">
              <div className="panel-heading">My Movies</div>
              <div className="panel-body">
                <div className="row">
                    { !_.isEmpty(movies)
                        ? movies.map((movie, index) =>
                          <div key={index} className="col-md-4 text-truncate">
                            <div className="thumbnail">
                              <img className="img-responsive" name="posterPath" src={movie.poster_path} alt={movie.title} />
                              <div className="caption">
                                <h3 style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{movie.title}</h3>
                                <p style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{movie.overview}</p>
                                <p>Release Date: <span>{movie.release_date}</span></p>
                                <div className='checkbox'>
                                  <label>
                                    <input type='checkbox' checked={movie.watched} onClick={this.checkWatched}/> Mark as watched
                                  </label>
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.removeMovie}>Remove Movie</button>
                              </div>
                            </div>
                          </div>
                        )
                        :
                        <div className="container">
                          <p>You currently don't have any movies in your list. You can add movies on the 'Movie Search' page.</p>
                        </div>
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.contextTypes = {
  store: React.PropTypes.object
};
