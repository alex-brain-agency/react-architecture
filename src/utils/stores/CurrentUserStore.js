import {createStore} from 'reflux-core';
import UserActions from '@utils/actions/UserActions';

export default
createStore({
  init(){
    this.listenTo(UserActions.receivedProfile, this.update);
    this.user = {};
  },

  update(data){
    this.user = Object.assign({}, this.user, data);
    this.trigger(data);
  },

  getState(){
    return this.user;
  }
});
