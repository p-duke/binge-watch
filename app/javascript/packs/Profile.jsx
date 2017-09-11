import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { isEmpty } from 'lodash';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      posterBasePath: "https://image.tmdb.org/t/p/w154",
      movies: [],
    }
    this.removeMovie = this.removeMovie.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { store } = this.context;
    const user = store.getState().user[0];

    axios({
      method: 'GET', 
      url: '/users/'+user.id+'/movies',
      data: {
      },
    }).then(function(response) {
      self.setState({ movies: response.data.movies });
      self.context.store.dispatch({
        type: 'USER_MOVIES',
        data: response.data.movies,
      });
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

  removeMovie(e) {
    e.preventDefault();
    const self = this;
    const userID = self.context.store.getState().user[0].id;
    const parentDiv = e.target.parentElement.parentElement.parentElement;

    e.target.innerText = 'Movie Removed';
    e.target.disabled = true;
    setTimeout(function() { parentDiv.remove() }.bind(this), 3000);

    const movie = this.state.movies.find(function findMovie(movie) {
      if (movie.title === e.target.parentElement.children[0].innerText) {
        return movie;
      }
    });

    axios({
      method: 'DELETE',
      url: '/users/'+userID+'/movies/'+movie.id,
      data: {
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        poster_path: this.state.posterBasePath+movie.poster_path,
        user_id: userID,
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
    const movies = this.state.movies;
    const user = this.context.store.getState().user[0];

    return (
      <div className="container target">
        <div className="row">
          <div className="col-sm-10">
            <h1 className="">Hi, {user.username}!</h1>
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
              <li className="list-group-item text-right"><span className="pull-left"><strong className="">Joined</strong></span> 2.13.2014</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className="">Last seen</strong></span> Yesterday</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className="">Real name</strong></span> Joseph Doe</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className="">Role: </strong></span> Pet Sitter</li>
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
              <div className="panel-heading">{user.username}'s Bio</div>
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
