import React from 'react';


function CounterButton(props) {
    return (        
         <button type="button" className="btn btn-primary">
         {props.buttonText} <span className="badge badge-light" id={props.id}>{props.count}</span>
          </button>
    )

}

export default CounterButton;