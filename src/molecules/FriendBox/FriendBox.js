import React, {PropTypes} from 'react';
import Box from '@atoms/Box/Box';

const bem = require('bem-class');
const cx = bem.block('FriendBox');

import './FriendBox.scss';

/**
 FriendBox
 **/
export default
class FriendBox extends React.Component {

  constructor() {
    super();

    this.state = {
      friendRequests: [],
      statusRequest: null
    };
  }

  static defaultProps = {
    changeStatusFriend: () => {
    },
    userId: "2231333",
    facebookRequest: false,
    statusRequest: "new",
    requestDate: "July 1st, 2015",
    deleteDate: "July 1st, 2016",
    friendFirstName: "Linda",
    friendLastName: "Johnson",
    registrationDate: "January 31st, 2015",
    userAvatar: "/assets/images/users/avatars/linda.png",
    userLocation: "Scottsdale,  AZ  85255",
    flagIcon: "css-icon-us",
    userStars: "7",
    followingDate: {
      youStart: "March 15th, 2015",
      friendStart: "June 3rd, 2015"
    },
    counterActivity: {
      collections: "787",
      reposts: "9.1k",
      stashed: "1.2k",
      followers: "1.2m",
      following: "728"
    }
  };

  componentDidMount() {
    this.setState({
      statusRequest: this.props.statusRequest
    });
  }

  //Following Event
  followingEvent() {
    console.log("Start to following");
  }

  //Confirm request event
  confirmRequest(status) {
    this.setState({
      statusRequest: status
    })
    console.log("Confirm Request");
  }

  //Delete request event
  deleteRequest() {
    console.log("Delete Request");
  }

  //Send request event
  sendRequest() {
    console.log("Sending Request");
  }

  //Remove friend event
  removeFriend(status) {
    this.setState({
      statusRequest: status
    })
    console.log("Friend Deleted");
  }

  //Send massage
  sendMassage() {
    console.log("Send massage");
  }

  //Send massage
  sendMassage() {
    console.log("Send massage");
  }

  //Open user rating
  openUserRating() {
    console.log("Open user rating");
  }

  //Open user rating
  openUserStars() {
    console.log("Open user stars");
  }

  renderFriend(friendRequests) {
    if (!friendRequests || friendRequests.length < 0) {
      return (
          <Box>No freinds</Box>
      );
    }

    var facebookIco,
        statusRequestBox;

    // Check Facebook Request
    if (this.props.facebookRequest == true) {
      facebookIco = <i className="small-fb-ico"></i>;
    }
    else {
      facebookIco = "";
    }

    // Check Status Request and Rendering Necessary Buttons

    // New Friend Status
    if (this.state.statusRequest == "new") {
      statusRequestBox = <Box direction="row" className={cx.element('statusRequest') + ''}>
        <button className="small-btn grey" onClick={this.deleteRequest}>
          {facebookIco}
          {"Delete Request received " + this.props.requestDate}
        </button>
        <button className="small-btn" onClick={this.confirmRequest.bind(this,"added")}>Confirm Friend</button>
      </Box>;
    }

    // Delete Friend Status
    else if (this.state.statusRequest == "delete") {
      statusRequestBox = <Box direction="row" className={cx.element('statusRequest') + ''}>
        <Box className="small-btn grey">
          {facebookIco}
          {"Delete Request received " + this.props.deleteDate}
        </Box>
      </Box>;
    }

    // Added Friend Status
    else if (this.state.statusRequest == "added") {
      statusRequestBox = <Box direction="row" className={cx.element('statusRequest') + ''}>
        <button className="small-btn" onClick={this.removeFriend.bind(this, "new")}>
          {facebookIco}
          Remove Friend
        </button>
      </Box>
    }

    // Waiting Send Status
    else if (this.state.statusRequest == "waitingSend") {
      statusRequestBox = <Box direction="row" className={cx.element('statusRequest') + ''}>
        <button className="small-btn grey hide">
          {facebookIco}
          {"Delete Request received " + this.props.deleteDate}
        </button>

        <button className="small-btn" onClick={this.sendRequest}>
          {facebookIco}
          Send Friend Request
        </button>
      </Box>
    }

    return (
        <Box className={cx + ' m20'} key={this.props.userId}>

          <Box direction="row">
            <Box direction="column">
              <a href="#" className={cx.element('userAvatar') + ''}>
                <img src={this.props.userAvatar} alt={this.props.friendFirstName}/>
              </a>
            </Box>

            <Box direction="column" className={cx.element('userInfo') + ''}>

              <h3 className={cx.element('userName') + ''}>
                <a href="#">
                  <i className="blue-user-ico"></i>
                  {this.props.friendFirstName + ' ' + this.props.friendLastName}
                </a>
              </h3>

              <p>Member since {this.props.registrationDate}</p>

              <Box className={cx.element('userLocation') + ''} direction="row">
                <p>{this.props.userLocation}</p>

                <div className={this.props.flagIcon}></div>
              </Box>
            </Box>
          </Box>

          <Box className={cx.element('iconsPanel') + ''}>
            <Box direction="row">
              <i className="blue-add-message-ico" onClick={this.sendMassage}></i>
              <i className="blue-rating-ico" onClick={this.openUserRating}></i>
              <i className="blue-star-ico" onClick={this.openUserStars}>{this.props.userStars}</i>
            </Box>
            <button className="border-btn" onClick={this.followingEvent}>Follow</button>
          </Box>

          <Box direction="row" className={cx.element('counterActivity') + ''}>
            <Box></Box>
            <Box>{this.props.counterActivity.collections + "Collections"} </Box>
            <Box>{this.props.counterActivity.reposts + " Reposts"}</Box>
            <Box>{this.props.counterActivity.stashed + " Stashed"}</Box>
            <Box>{this.props.counterActivity.followers + " Followers"}</Box>
            <Box>{this.props.counterActivity.following + " Following"}</Box>
          </Box>

          <Box direction="column" className={cx.element('statusHistory') + ''}>
            <Box>
              {this.props.friendFirstName + " has been following you since " + this.props.followingDate.friendStart}
            </Box>
            <Box>
              {"You have been following " + this.props.friendFirstName + " since " + this.props.followingDate.youStart}
            </Box>
          </Box>

          {statusRequestBox}

        </Box>
    )
  }

  render() {
    return (
        <Box direction="column">
          {this.renderFriend(this.state.friendRequests)}
        </Box>
    );
  }
}
