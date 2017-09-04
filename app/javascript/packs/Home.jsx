import React from 'react';
import PopularMovies from './PopularMovies';

const Home = (props, { store }) => {
  const user = store.getState().user[0];

  return (
    <div className="container-fluid">
      <PopularMovies />
    </div>
  )
}

Home.contextTypes = {
  store: React.PropTypes.object
}

export default Home;
