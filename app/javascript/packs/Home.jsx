import React from 'react';

const Home = (props, { store }) => {
  const user = store.getState().user[0];

  return (
    <div className="container">
      { ( user )
          ? <h1>Welcome back, {user.username}!</h1>
          : <h1>Welcome to Groovy Movie!</h1>
      }
    </div>
  )
}

Home.contextTypes = {
  store: React.PropTypes.object
}

export default Home;
