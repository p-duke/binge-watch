import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import Errors from './Errors';
import { isEmpty } from 'lodash';
import { POPULAR_MOVIES_SEARCH } from './constants';
import Slider from 'react-slick';

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
            <h4>Popular Movies</h4>
            <Slider arrows={false} dots={true} infinite={true} slidesToShow={5} slidesToScroll={1} draggable={true}>
              { movies.map((movie,index) =>
                <div key={index} >
                  <img src={movie.posterPath} alt={movie.title} />
                </div>
              )}
            </Slider>
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

