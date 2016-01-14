import propMatch from 'react-propmatch';
const prop = propMatch('pseudo');

export const propType = prop.propType;

export default function withPseudoStates(options, Component){
  if (!Component) return withPseudoStates.bind(null, options || {});

  const makeProps = prop.makeFactory(Component);

  return class PseudoStateComponent extends React.Component {
    constructor(){
      super();
      this.state = {
        hover: false, active: false, focus: false,
      };
    }

    onHover(){ this.setState({hover: true}); }
    onStopHover(){ this.setState({hover: false}); }

    componentDidMount(){
      this.node = React.findDOMNode(this.refs.it);
      this.listeners = {
        mouseover: (e) => { this.onHover() },
        mouseout: (e) => { this.onStopHover() },
      };
      Object.keys(this.listeners).forEach((eventName) => {
        this.node.addEventListener(eventName, this.listeners[eventName]);
      });
    }

    componentWillUnmount(){
      Object.keys(this.listeners).forEach((eventName) => {
        this.node.addEventListener(eventName, this.listeners[eventName]);
      });
    }

    render(){
      return (
        <Component
          ref="it"
          {...this.props}
          {...makeProps({
            hover: this.state.hover,
            active: this.state.active,
            focus: this.state.focus,
          })}
        />
      );
    }
  }
};
