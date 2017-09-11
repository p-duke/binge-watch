import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import Errors from './Errors';
import { isEmpty } from 'lodash';
import { POPULAR_MOVIES_SEARCH } from './constants';

export default class PopularMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    }
  }

  componentWillMount() {
    const self = this;
    const { popularMovies } = self.context.store.getState();

    if (_.isEmpty(popularMovies)) {
      axios({
        method: 'GET',
        url: POPULAR_MOVIES_SEARCH,
      }).then(function(response) {
        self.context.store.dispatch({
          type: 'GET_MOVIES',
          data: response.data.results,
        });
      }).catch(function(error) {
        console.log("Movie fetch blew up!", error);
      });
    }
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

  render() {
    const movies = this.context.store.getState().popularMovies[0];

    return (
      <div className="container" style={{marginBottom: 50+'px'}}>
        { movies 
            ?
            <div className="container">
            <h2>Popular Movies</h2>
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                { movies.map((movie, index) =>
                  index === 0 
                  ? <li key={index} data-target="#myCarousel" data-slide-to={index.toString()} className="active" ></li>
                  : <li key={index} data-target="#myCarousel" data-slide-to={index.toString()} ></li>
                )}
              </ol>

              <div className="carousel-inner">
                { movies.map((movie,index) =>
                  index === 0
                  ? <div key={index} className="item active">
                      <img className="img-responsive center-block" src={movie.posterPath} alt={movie.title} />
                    </div>
                  :  <div key={index} className="item">
                      <img className="img-responsive center-block" src={movie.posterPath} alt={movie.title} />
                    </div>
                )}
              </div>

              <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="right carousel-control" href="#myCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"></span>
                <span className="sr-only">Next</span>
              </a>

            </div>
          </div>
          :
            <p>Loading...</p>
          }
        </div>
    )
  }
}

PopularMovies.contextTypes = {
  store: React.PropTypes.object
};

