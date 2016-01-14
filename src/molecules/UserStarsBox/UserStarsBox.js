import React, {PropTypes} from 'react';
import Box from '@atoms/Box/Box';

const bem = require('bem-class');
const cx = bem.block('UserStarsBox');

import './UserStarsBox.scss';

/**
 FriendBox
 **/
export default
class UserStarsBox extends React.Component {

  constructor() {
    super();

    this.state = {
      UserStars: []
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
    requiredShared: "100",
    currentShared: "87",
    userAvatar: "/assets/images/users/avatars/linda.png"
  };

  //Following Event
  followingEvent() {
    console.log("Start to following");
  }

  renderRanking(UserStars) {
    if (!UserStars || UserStars.length < 0) {
      return (
          <Box>No Stars</Box>
      );
    }

    return (
        <Box className={cx + ' m20'} key={this.props.userId}>

          <Box direction="row" className={cx.element('header') + ''}>
            <a href="#" className={cx.element('userAvatar') + ''}>
              <img src={this.props.userAvatar} alt={this.props.userName}/>
            </a>
            <h4>{"Stars earned by " + this.props.userName}</h4>

            <i className="close-white-ico"></i>
          </Box>

          <div className="p10">
            <Box direction="row" className={cx.element('titleList') + ''}>
              <Box className="w70"></Box>
              <Box className="w15 left">Required</Box>
              <Box className="w15 right">Current</Box>
            </Box>
          </div>


          <Box direction="column" className={cx.element('list') + ''}>
            <Box direction="row">
              <Box className="left" direction="row">
                <i className="blue-star-ico"></i>
                Orignal Posts (Images &nbsp; Videos)
              </Box>
              <Box className={cx.element('requiredStars') + ''}>{this.props.requiredPosts}</Box>
              <Box className={cx.element('currentStars') + ''}>{this.props.currentPosts}</Box>
            </Box>

            <Box direction="row">
              <Box className="left" direction="row">
                <i className="blue-star-ico"></i>
                Followers
              </Box>
              <Box className={cx.element('requiredStars') + ''}>{this.props.requiredFollowers}</Box>
              <Box className={cx.element('currentStars') + ''}>{this.props.currentFollowers}</Box>
            </Box>

            <Box direction="row">
              <Box className="left" direction="row">
                <i className="blue-star-ico"></i>
                Reposted &nbsp; Stashed by other members
              </Box>
              <Box className={cx.element('requiredStars') + ''}>{this.props.requiredReposted}</Box>
              <Box className={cx.element('currentStars') + ''}>{this.props.currentReposted}</Box>
            </Box>

            <Box direction="row">
              <Box className="left" direction="row">
                <i className="blue-star-ico"></i>
                Likes
              </Box>
              <Box className={cx.element('requiredStars') + ''}>{this.props.requiredLikes}</Box>
              <Box className={cx.element('currentStars') + ''}>{this.props.currentLikes}</Box>
            </Box>

            <Box direction="row">
              <Box className="left" direction="row">
                <i className="blue-star-ico"></i>
                Shared
              </Box>
              <Box className={cx.element('requiredStars') + ''}>{this.props.requiredShared}</Box>
              <Box className={cx.element('currentStars') + ''}>{this.props.currentShared}</Box>
            </Box>
          </Box>

          <div className="right mr15 mt5">* Stars earned by your content</div>

          <Box className="m-auto">
            <button type="button" className="popup-btn-small mt5">Close</button>
          </Box>

        </Box>
    )
  }

  render() {
    return (
        <Box direction="column">
          {this.renderRanking(this.state.UserStars)}
        </Box>
    );
  }
}
