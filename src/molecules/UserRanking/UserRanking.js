import React, {PropTypes} from 'react';
import Box from '@atoms/Box/Box';

const bem = require('bem-class');
const cx = bem.block('UserRanking');

import './UserRanking.scss';

/**
 FriendBox
 **/
export default
class UserRanking extends React.Component {

  constructor() {
    super();

    this.state = {
      userRanking: []
    };
  }

  static defaultProps = {
    userId: "2231333",
    userName: "Linda",
    requiredPosts: "5000",
    currentPosts: "6782",
    requiredFollowers: "5000",
    currentFollowers: "1.2k",
    requiredReposted: "500",
    currentReposted: "386",
    requiredLikes: "100",
    currentLikes: "127",
    requiredShred: "100",
    currentShred: "87",
    userAvatar: "/assets/images/users/avatars/linda.png"
  };

  //Following Event
  followingEvent(){
    console.log("Start to following");
  };

  renderRanking(userRanking) {
    if (!userRanking || userRanking.length < 0) {
      return (
          <Box>No Ranking</Box>
      );
    }

    return (
        <Box className={cx + ' m20'} key={this.props.userId}>

          <Box direction="row" className={cx.element('header') + ''}>
            <a href="#" className={cx.element('userAvatar') + ''}>
              <img src={this.props.userAvatar} alt={this.props.userName}/>
            </a>
            <h4>{"Top User Rankings for "+ this.props.userName}</h4>

            <a href="#" className={cx.element('topUser') + ''}>
              <i className="blue-rating-ico"></i>
              Top User
            </a>

            <i className="close-white-ico"></i>
          </Box>

          <Box direction="column" className={cx.element('info') + ''}>
            <Box direction="row">
              <i className="blue-star-ico"></i>
              No member has a higher ranking than Linda
            </Box>
            <Box direction="row">
              <i className="blue-rating-ico"></i>
              Linda is the number 1 ranked Top User with 4,786,987 points
            </Box>
            <Box direction="row">
              <i className="red-rating-ico"></i>
              Larry Wilson is ranked number 2 with 4,289,543 points
            </Box>
          </Box>

          <Box className="m-auto">
            <button type="button" className="popup-btn-small mt5">Close</button>
          </Box>

        </Box>
    )
  }

  render() {
    return (
        <Box direction="column">
          {this.renderRanking(this.state.userRanking)}
        </Box>
    );
  }
}
