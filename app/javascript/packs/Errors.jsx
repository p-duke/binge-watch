import React from 'react';
import { capitalize } from 'lodash';

const Errors = (props) => {
  return (
    <div className="container">
      <ul>
        { Object.keys(props.errors).map(function(key, index) {
          return <li key={index} >{_.capitalize(key.toString())}: {props.errors[key].toString()}</li>
        }, this)}
      </ul>
    </div>
  )
}

export default Errors;
