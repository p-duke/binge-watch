import React from 'react';
import { capitalize } from 'lodash';

const Errors = (props) => {
  return (
    <div>
      { Object.keys(props.errors).map(function(key, index) {
        return <div className="alert alert-danger"><p key={index} >{_.capitalize(key.toString())} {props.errors[key].toString()}</p></div>
      }, this)}
    </div>
  )
}

export default Errors;
