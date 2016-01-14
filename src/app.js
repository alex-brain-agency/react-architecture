import React from 'react';
import Box from '@atoms/Box/Box';
import TopBarWrapper from '@molecules/TopBarWrapper/TopBarWrapper';

export default
class App extends React.Component {
  render(){
    return (
      <div>
        <TopBarWrapper />
        {this.props.children}
      </div>
    );
  }
}
