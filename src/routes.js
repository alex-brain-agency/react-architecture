import React from 'react';
import {Route} from 'react-router';

import App from './app';
import FriendBox from './molecules/FriendBox/FriendBox';
import UserRanking from './molecules/UserRanking/UserRanking';
import UserStarsBox from './molecules/UserStarsBox/UserStarsBox';
import StepsBox from './molecules/StepsBox/StepsBox';

export default (
  <Route name="App" path="/" component={App}>
    <Route name="FriendBox" path="/test-friend" component={FriendBox} />
    <Route name="UserRanking" path="/user-ranking" component={UserRanking} />
    <Route name="UserStarsBox" path="/user-stars" component={UserStarsBox} />
    <Route name="StepsBox" path="/steps-box" component={StepsBox} />
  </Route>
);
