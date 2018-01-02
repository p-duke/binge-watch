import React from 'react';
import SearchMovie from './SearchMovie';

const Home = (props, { store }) => {
  const user = store.getState().user[0];

  return (
    <div className="container">
      <SearchMovie />
    </div>
  )
}

Home.contextTypes = {
  store: React.PropTypes.object
}

export default Home;
