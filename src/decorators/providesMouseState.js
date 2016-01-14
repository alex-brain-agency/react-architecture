import React from 'react';
import ReactDOM from 'react-dom';
import propMatch from 'react-propmatch';

var {propTypes, makeFactory} = propMatch({mouseState: null});
var GET_DOM_NODE_KEY = '_providesMouseState_GET_DOM_NODE_KEY';

providesMouseState.propTypes = propTypes;
export default function providesMouseState(Component){
  var makeProps = makeFactory(Component);

  Object.defineProperty(Component.prototype, GET_DOM_NODE_KEY, {
    configurable: true, writable: true, enumerable: true,
    value: function(){
      return ReactDOM.findDOMNode(this);
    }
  })

  class MouseStateProvider extends React.Component {
    constructor(props){
      super();
      this.state = {
        mouseState: {hover: false, press: false},
      };
    }
    attachListeners(ref){
      if (!ref || this.cleanUp) {
        return;
      }

      var node = ref[GET_DOM_NODE_KEY]();
      var handlers = {
        mousemove: () => { this.update('hover', true); },
        mouseenter: () => { this.update('hover', true); },
        mouseleave: () => { this.update('hover', false); },
        mousedown: () => { this.update('press', true); },
        mouseup: () => { this.update('press', false); },
      }
      Object.keys(handlers).forEach((eventName) => {
        node.addEventListener(eventName, handlers[eventName], false);
      });

      this.cleanUp = () => {
        Object.keys(handlers).forEach((eventName) => {
          node.removeEventListener(eventName, handlers[eventName], false);
        });
      }
    }
    componentWillUnmount(){
      this.cleanUp && this.cleanUp();
    }

    update(key, value){
      if (this.state.mouseState[key] === value) {
        return;
      }
      this.setState((state) => {
        return {
          mouseState: Object.assign({}, state.mouseState, {
            [key]: value
          })
        };
      });
    }

    render(){
      return <Component
        ref={(x) => this.attachListeners(x)}
        {...this.props}
        {...makeProps({mouseState: this.state.mouseState})}
      />
    }
  };

  Object.keys(Component).forEach((key) => {
    if (key !== 'propTypes') {
      MouseStateProvider[key] = Component[key];
    }
  });
  return MouseStateProvider;
}
