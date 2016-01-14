import React from 'react';
import {inspect} from 'util';

export default function stateHolder(Component, opts){
  if (!'initial' in opts) throw new TypeError('stateHolder requires an initial value');
  if (!'render' in opts) throw new TypeError('stateHolder requires a render function');

  return class StateHolder extends React.Component {
    constructor(){
      super();
      this.state = {x: opts.initial};
    }
    render(){
      return (
        <div>
          <div>{opts.render(Component, this.state.x, (newState) => this.setState({x: newState}), this.props)}</div>
          <h4>State:</h4>
          <textarea
            value={JSON.stringify(this.state.x)}
            onChange={(e) => {
              var value = e.target.value;
              try {
                this.setState({x: JSON.parse(value)});
              }
              catch(e){}
            }}
          />
        </div>
      )
    }
  };
}
