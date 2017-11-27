import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import axios from 'axios';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      posterBasePath: "https://image.tmdb.org/t/p/w154",
    }
    this.search = this.search.bind(this);
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
      self.context.store.dispatch({
        type: 'SEARCH_MOVIES',
        data: response.data.results,
      });
    }).catch(function(error) {
      console.log("Movie search blew up!", error);
    });
  }

  render() {
    const { store } = this.context;
    const user = store.getState().user[0];

    return (
      <div>
        <nav className="navbar navbar-default navbar-inverse binge-header">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"></button>
            <a className="navbar-brand binge-header">BingeWatch</a>
          </div>
          <div className="collapse navbar-collapse binge-header">
            <ul className="nav navbar-nav navbar-left">
              <li><Link to='/'>Home</Link></li>
            </ul>
            <form className="navbar-form navbar-left">
              <div className="input-group">
                <input type="text" ref="query" name="query"  className="form-control" placeholder="Search"/>
                <div className="input-group-btn">
                  <button type="submit" className="btn btn-default" onClick={this.search} >
                    <i className="glyphicon glyphicon-search"></i>
                  </button>
                </div>
              </div>
            </form>
            <ul className="nav navbar-nav navbar-right">
              { user
                  ? null
                  : <li><Link to='/users/sign_up'>Sign Up</Link></li>
              }
              { user
                  ? <li><Link to='/users/sign_out'>Log Out</Link></li>
                  : <li><Link to='/users/sign_in'>Log In</Link></li>
              }
              { user
                  ?  <li><Link to='#'>Welcome, {capitalize(user.username)}!</Link></li>
                  :  null
              }
              { user
                  ? <li><Link to={`/users/${user.id}/movies`}>Profile</Link></li>
                  : null
              }
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

Header.contextTypes = {
  store: React.PropTypes.object
};

