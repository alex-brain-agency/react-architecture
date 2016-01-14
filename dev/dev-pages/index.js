// import main component for side effects (css)
import '../../src/app';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';
import util from 'util';
import Box from '../../src/atoms/Box/Box';
import {createHistory} from 'history';
import demos from './demos';
import {ThemeProvider} from '@decorators/ThemeProvider';
import TopBarWrapper from '@molecules/TopBarWrapper/TopBarWrapper';

// modified by makeRouteForComponent
var links = [];

var componentRoutes = Object.keys(demos).map((key) => makeRouteForComponent(key, ...demos[key]));

function run(){
  var routes = (
    <Route name="_index" path="/" component={DemoPage}>
      {componentRoutes}
    </Route>
  );

  var root = document.getElementById('app-root');
  ReactDOM.render(<Router history={createHistory()}>{routes}</Router>, root);
}

@ThemeProvider
class DemoPage extends React.Component {
  constructor(){
    super();
    this.state = {linksOpen: false};
  }
  componentWillMount(){
    this.props.setTheme({color: 'purple'});
  }
  render(){
    return (
      <Box style={{color: 'white'}}>
        <Box>
          {this.renderItems()}
          <Box flex="3">
            {this.props.children}
          </Box>
        </Box>
      </Box>
    );
  }
  renderItems(){
    if (this.state.linksOpen){
      var linkList = (
        <Box flex="1" wrap direction="row" style={{
          fontSize: '1.5em',
          position: 'absolute',
          right: '1em',
          top: '2em',
          background: 'sandybrown',
          padding: '1em',
          width: '40em',
          borderRadius: '10px',
          boxShadow: '0 0 20px #c7c7c7'
        }}>
          {links.map((link) => (
            <Box padding="0.5em" key={link.path}>
              <a href={link.path}>{link.text}</a>
            </Box>
          ))}
        </Box>
      );
    }

    return (
      <div>
          <TopBarWrapper />
          <Box style={{ margin: 'auto', top: '0.5em', zIndex: 100, position: 'absolute', right: '20px', top: '15px'}}>
              <div className="btn-demo-pages" onClick={() => this.setState({linksOpen: !this.state.linksOpen})}>
                  Components
              </div>
              {linkList}
          </Box>
      </div>
    );
  }
}

function makeRouteForComponent(name, Component, ...examples){
  // for babel's es6 module output when named+default exports
  if (typeof Component === 'object') Component = Component.default;

  const ROUTE_PATH = `/demo/${name}`;
  links.push({text: name, path: ROUTE_PATH})

  var DemoRouteHandler = () => (
    <Box className="slow-show component-demo-pages">
      <h1>{name}</h1>
      <Box>
        {examples.map((props, i) => (
          <Box key={i}
            margin="1em" flex={1}
            style={{
              borderWidth: '1px',
              justifyContent: 'space-between',
              background: 'white',
              alignItems: 'flex-start',
              borderRadius: '10px',
              boxShadow: '0 0 10px'
            }} >
            <Box margin="1em" flex={1} style={{
              background: 'hsla(0,0%,98%,0.1)',
              boxShadow: '0 0 3px rgba(0,0,0,0.3)',
            }}>
              <Component {...props} />
            </Box>
            <Box margin="1em" flex={1}>
              <h2>Component data</h2>
              <pre>{util.inspect(props, {depth: 4})}</pre>
              <Link className="btn-demo-pages" to={`${ROUTE_PATH}/${i + 1}`}>view just this</Link>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );

  var routes = [
    <Route
      key={ROUTE_PATH}
      component={DemoRouteHandler}
      path={ROUTE_PATH}
    />
  ];

  examples.forEach((props, index) => {
    var SingleDemo = () => (
      <Component {...props} />
    );

    routes.unshift(
      <Route
        key={ROUTE_PATH + index}
        component={SingleDemo}
        path={`${ROUTE_PATH}/${index + 1}`}
      />
    );
  });

  return routes;
}

run();
