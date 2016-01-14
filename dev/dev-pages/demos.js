import {inspect} from 'util';
import React from 'react';
import Box from '@atoms/Box/Box';
import stateHolder from './stateHolder';
const alertInspect = (...args) => { alert(args.map((x) => inspect(x)).join('\n')) };

export default {
  FriendBox: [
  require('../../src/molecules/FriendBox/FriendBox'),
  {
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
    },
    {
      userId: "4333",
      facebookRequest: false,
      statusRequest: "new",
      requestDate: "October 1st, 2015",
      deleteDate: "October 1st, 2016",
      friendFirstName: "Lena",
      friendLastName: "Ivanova",
      registrationDate: "January 31st, 2015",
      userAvatar: "/assets/images/users/avatars/linda.png",
      userLocation: "Scottsdale,  AZ  85255",
      flagIcon: "css-icon-ua",
      userStars: "7",
      followingDate: {
        youStart: "March 14th, 2015",
        friendStart: "June 3rd, 2015"
      },
      counterActivity: {
        collections: "387",
        reposts: "3.1k",
        stashed: "1.2k",
        followers: "2.2m",
        following: "428"
      }
    }
  ],
  UserRanking: [
    require('../../src/molecules/UserRanking/UserRanking'),
    {
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
    }
  ],
  StepBox: [
    require('../../src/atoms/StepBox/StepBox'),
    {
      classIco: "big-ico-mark",
      title: "Test title",
      text: "Test Lorem"
    },
    {
      classIco: "big-ico-location",
      title: "Test title 2",
      text: " Test Lorem Test Lorem Test Lorem Test Lorem"
    }
  ]
};
