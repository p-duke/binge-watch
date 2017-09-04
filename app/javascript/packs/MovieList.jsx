import React from 'react';
import PropTypes from 'prop-types';

export default class MovieList extends React.Component {
  constructor() {
    super();
  }

  render() {
    const movies = this.context.store.getState().movies[0];

    return (
      <div>
      </div>
    );
  }
}

MovieList.contextTypes = {
  store: React.PropTypes.object
};
