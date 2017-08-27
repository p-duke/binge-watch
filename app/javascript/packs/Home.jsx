import React from 'react';

const Home = (props) => {
  return (
    <div className="container">
      { (props.state.isLoggedIn )
          ? <h1>Welcome back, {props.state.username}!</h1>
          : <h1>Welcome to Groovy Movie!</h1>
      }
    </div>
  )
}

export default Home;
