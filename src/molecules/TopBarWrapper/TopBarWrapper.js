import React, {PropTypes} from 'react';
import Box from '@atoms/Box/Box';
import providesStore from '@decorators/providesStore';
import CurrentUserStore from '@utils/stores/CurrentUserStore';

export default
@providesStore(CurrentUserStore)
class TopBarWrapper extends React.Component {
  static propTypes = {
    user: providesStore.getPropType(CurrentUserStore)
  };

  render(){
    return (
        <Box
            direction="row"
            className="top-bar"
            padding="0.5em 1em"
            grow={1}
        >
          <Box direction="row">
            <a href="/"><img src="/assets/images/logo.png" className="main-logo" alt=""/></a>
          </Box>
        </Box>
    );
  }
}
