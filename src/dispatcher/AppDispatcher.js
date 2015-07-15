'use strict';

import {Dispatcher} from 'flux';
import assign from 'object-assign';

export default new Dispatcher();

const AppDispatcher = assign(new Dispatcher(),  {
  handleAuthAction(action) {
    this.dispatch(action);
  },
  handleGroupListAction(action) {
    this.dispatch(action);
  },
  handleGroupAddAction(action){
    this.dispatch(action);
  },
  handleGroupEditAction(action){
    this.dispatch(action);
  },
  handleGroupMemberListAction(action) {
    this.dispatch(action);
  },
  handleGroupMemberDeleteAction(action){
    this.dispatch(action);
  },
  handleGroupMemberAddAction(action){
    this.dispatch(action);
  },
  handleGroupSelectAction(action){
    this.dispatch(action);
  },
  handleGroupRemoveAction(action){
    this.dispatch(action);
  },
});

export default AppDispatcher;
