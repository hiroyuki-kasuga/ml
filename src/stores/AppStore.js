'use strict';

import {
    EventEmitter
}
from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
    CONST_AUTH,
    CONST_GROUP_LIST,
    CONST_GROUP_ADD,
    CONST_GROUP_EDIT,
    CONST_GROUP_DELETE,
    CONST_GROUP_SELECT,
    CONST_GROUP_MEMBER_LIST,
    CONST_GROUP_MEMBER_ADD,
    CONST_GROUP_MEMBER_DELETE,
    CONST_USER_LIST,
    CONST_USER_ADD
}
from '../constants/Constants';
import MlUtil from '../util/MlUtil';

const AUTH_ACCEPT = 'auth_accept';
const AUTH_ERROR = 'auth_error';
const GROUP_LIST = 'group_list';
const GROUP_LIST_ERROR = 'group_list_error';
const GROUP_EDIT = 'group_edit';
const GROUP_EDIT_ERROR = 'group_edit_error';
const GROUP_SELECT = 'group_select';
const GROUP_SELECT_ERROR = 'group_select_error';
const GROUP_ADD = 'group_add';
const GROUP_ADD_ERROR = 'group_add_error';
const GROUP_DELETE = 'group_delete';
const GROUP_DELETE_ERROR = 'group_delete_error';
const GROUP_MEMBER_LIST = 'group_member_list';
const GROUP_MEMBER_LIST_ERROR = 'group_member_list_error';
const GROUP_MEMBER_DELETE = 'group_member_delete';
const GROUP_MEMBER_DELETE_ERROR = 'group_member_delete_error';
const GROUP_MEMBER_ADD = 'group_member_add';
const GROUP_MEMBER_ADD_ERROR = 'group_member_add_error';

let auth = {};
let groupList = {};
let memberList = [];
let deleteGroupMember = {};
let addGroupMember = {};
let editGroup = {};
let addGroup = {};
let selectGroup = {};
let deleteGroup = {};

const AppStore = assign({}, EventEmitter.prototype, {
    emitAuthAccept() {
      this.emit(AUTH_ACCEPT);
    },
    addAuthAcceptListener(callback) {
      this.on(AUTH_ACCEPT, callback);
    },
    removeAuthAcceptListener(callback) {
      this.removeListener(AUTH_ACCEPT, callback);
    },
    emitAuthError() {
      this.emit(AUTH_ERROR);
    },
    addAuthErrorListener(callback) {
      this.on(AUTH_ERROR, callback);
    },
    removeAuthErrorListener(callback) {
      this.removeListener(AUTH_ERROR, callback);
    },
    getAuth() {
      MlUtil.logging('start getAuth');
      MlUtil.logging(auth);
      MlUtil.logging('end getAuth');
      return auth;
    },

    emitGroupList() {
      this.emit(GROUP_LIST);
    },
    addGroupListListener(callback) {
      this.on(GROUP_LIST, callback);
    },
    removeGroupListListener(callback) {
      this.removeListener(GROUP_LIST, callback);
    },
    emitGroupListError() {
      this.emit(GROUP_LIST_ERROR);
    },
    addGroupListErrorListener(callback) {
      this.on(GROUP_LIST_ERROR, callback);
    },
    removeGroupListErrorListener(callback) {
      this.removeListener(GROUP_LIST_ERROR, callback);
    },
    getGroupList() {
      MlUtil.logging('start getGroupList');
      MlUtil.logging(groupList);
      MlUtil.logging('end getGroupList');
      return groupList;
    },

    emitGroupMemberList() {
      this.emit(GROUP_MEMBER_LIST);
    },
    addGroupMemberListListener(callback) {
      this.on(GROUP_MEMBER_LIST, callback);
    },
    removeGroupMemberListListener(callback) {
      this.removeListener(GROUP_MEMBER_LIST, callback);
    },
    emitGroupMemberListError() {
      this.emit(GROUP_MEMBER_LIST_ERROR);
    },
    addGroupMemberListErrorListener(callback) {
      this.on(GROUP_MEMBER_LIST_ERROR, callback);
    },
    removeGroupMemberListErrorListener(callback) {
      this.removeListener(GROUP_MEMBER_LIST_ERROR, callback);
    },
    getGroupMemberList() {
      MlUtil.logging('start getGroupMemberList');
      MlUtil.logging(memberList);
      MlUtil.logging('end getGroupMemberList');
      return memberList;
    },

    emitGroupMemberDelete() {
      this.emit(GROUP_MEMBER_DELETE);
    },
    addGroupMemberDeleteListener(callback) {
      this.on(GROUP_MEMBER_DELETE, callback);
    },
    removeGroupMemberDeleteListener(callback) {
      this.removeListener(GROUP_MEMBER_DELETE, callback);
    },
    emitGroupMemberDeleteError() {
      this.emit(GROUP_MEMBER_DELETE_ERROR);
    },
    addGroupMemberDeleteErrorListener(callback) {
      this.on(GROUP_MEMBER_DELETE_ERROR, callback);
    },
    removeGroupMemberDeleteErrorListener(callback) {
      this.removeListener(GROUP_MEMBER_DELETE_ERROR, callback);
    },
    getGroupMemberDelete() {
      MlUtil.logging('start getGroupMemberDelete');
      MlUtil.logging(deleteGroupMember);
      MlUtil.logging('end getGroupMemberDelete');
      return deleteGroupMember;
    },

    emitGroupMemberAdd() {
      this.emit(GROUP_MEMBER_ADD);
    },
    addGroupMemberAddListener(callback) {
      this.on(GROUP_MEMBER_ADD, callback);
    },
    removeGroupMemberAddListener(callback) {
      this.removeListener(GROUP_MEMBER_ADD, callback);
    },
    emitGroupMemberAddError() {
      this.emit(GROUP_MEMBER_ADD_ERROR);
    },
    addGroupMemberAddErrorListener(callback) {
      this.on(GROUP_MEMBER_ADD_ERROR, callback);
    },
    removeGroupMemberAddErrorListener(callback) {
      this.removeListener(GROUP_MEMBER_ADD_ERROR, callback);
    },
    getGroupMemberAdd() {
      MlUtil.logging('start getGroupMemberAdd');
      MlUtil.logging(addGroupMember);
      MlUtil.logging('end getGroupMemberAdd');
      return addGroupMember;
    },


    emitGroupEdit() {
      this.emit(GROUP_EDIT);
    },
    addGroupEditListener(callback) {
      this.on(GROUP_EDIT, callback);
    },
    removeGroupEditListener(callback) {
      this.removeListener(GROUP_EDIT, callback);
    },
    emitGroupEditError() {
      this.emit(GROUP_EDIT_ERROR);
    },
    addGroupEditErrorListener(callback) {
      this.on(GROUP_EDIT_ERROR, callback);
    },
    removeGroupEditErrorListener(callback) {
      this.removeListener(GROUP_EDIT_ERROR, callback);
    },
    getGroupEdit() {
      MlUtil.logging('start getGroupMemberEdit');
      MlUtil.logging(editGroup);
      MlUtil.logging('end getGroupMemberEdit');
      return editGroup;
    },

    emitGroupSelect() {
      this.emit(GROUP_SELECT);
    },
    addGroupSelectListener(callback) {
      this.on(GROUP_SELECT, callback);
    },
    removeGroupSelectListener(callback) {
      this.removeListener(GROUP_SELECT, callback);
    },
    emitGroupSelectError() {
      this.emit(GROUP_SELECT_ERROR);
    },
    addGroupSelectErrorListener(callback) {
      this.on(GROUP_SELECT_ERROR, callback);
    },
    removeGroupSelectErrorListener(callback) {
      this.removeListener(GROUP_SELECT_ERROR, callback);
    },
    getGroupSelect() {
      MlUtil.logging('start getGroupMemberEdit');
      MlUtil.logging(selectGroup);
      MlUtil.logging('end getGroupMemberEdit');
      return selectGroup;
    },

    emitGroupAdd() {
      this.emit(GROUP_ADD);
    },
    addGroupAddListener(callback) {
      this.on(GROUP_ADD, callback);
    },
    removeGroupAddListener(callback) {
      this.removeListener(GROUP_ADD, callback);
    },
    emitGroupAddError() {
      this.emit(GROUP_ADD_ERROR);
    },
    addGroupAddErrorListener(callback) {
      this.on(GROUP_ADD_ERROR, callback);
    },
    removeGroupAddErrorListener(callback) {
      this.removeListener(GROUP_ADD_ERROR, callback);
    },
    getGroupAdd() {
      MlUtil.logging('start getGroupAdd');
      MlUtil.logging(addGroup);
      MlUtil.logging('end getGroupAdd');
      return addGroup;
    },

    emitGroupDelete() {
      this.emit(GROUP_DELETE);
    },
    addGroupDeleteListener(callback) {
      this.on(GROUP_DELETE, callback);
    },
    removeGroupDeleteListener(callback) {
      this.removeListener(GROUP_DELETE, callback);
    },
    emitGroupDeleteError() {
      this.emit(GROUP_DELETE_ERROR);
    },
    addGroupDeleteErrorListener(callback) {
      this.on(GROUP_DELETE_ERROR, callback);
    },
    removeGroupDeleteErrorListener(callback) {
      this.removeListener(GROUP_DELETE_ERROR, callback);
    },
    getGroupDelete() {
      MlUtil.logging('start getGroupDelete');
      MlUtil.logging(deleteGroup);
      MlUtil.logging('end getGroupDelete');
      return deleteGroup;
    },
});

AppStore.dispatchToken = AppDispatcher.register(action => {
    MlUtil.logging('start dispatchToken');
    MlUtil.logging(action);
    switch (action.type) {
      case CONST_AUTH:
        MlUtil.logging('start CONST_AUTH');
        auth = action.data;
        if (typeof auth.error !== 'undefined') {
          MlUtil.logging('CONST_AUTH error');
          AppStore.emitAuthError();
          return;
        } else {
          AppStore.emitAuthAccept();
        }
        MlUtil.logging('end CONST_AUTH');
        break;
      case CONST_GROUP_ADD:
        MlUtil.logging('start CONST_GROUP_ADD');
        if (typeof action.data.error !== 'undefined') {
          MlUtil.logging('CONST_GROUP_ADD error');
          AppStore.emitGroupListError();
          return;
        }
        addGroup = action.data;
        addGroup.directMembersCount = 0;
        selectGroup = addGroup;
        groupList.push(addGroup);
        AppStore.emitGroupList();
        AppStore.emitGroupAdd();
        MlUtil.logging('end CONST_GROUP_ADD');
        break;
      case CONST_GROUP_LIST:
        MlUtil.logging('start CONST_GROUP_LIST');
        if (typeof action.data.error !== 'undefined') {
          MlUtil.logging('CONST_GROUP_LIST error');
          AppStore.emitGroupListError();
          return;
        }
        groupList = action.data.groups;
        AppStore.emitGroupList();
        MlUtil.logging('end CONST_GROUP_LIST');
        break;
      case CONST_GROUP_DELETE:
        MlUtil.logging('start CONST_GROUP_DELETE');
        if (typeof action.data.error !== 'undefined') {
          MlUtil.logging('CONST_GROUP_DELETE error');
          AppStore.emitGroupDeleteError();
          return;
        }
        deleteGroup = action.data;
        let newGroupList = [];
        for(let group of groupList){
          if(group.id === action.data.groupId){
            console.log('IN');
            continue;
          }
          newGroupList.push(group);
        }
        groupList = newGroupList;
        AppStore.emitGroupDelete();
        AppStore.emitGroupList();
        MlUtil.logging('end CONST_GROUP_DELETE');
        break;
      case CONST_GROUP_SELECT:
        MlUtil.logging('start CONST_GROUP_SELECT');
        let groupId = action.data.groupId;
        let isExist = false;
        for(var g of groupList){
          if(g.id === groupId){
            isExist = true;
            selectGroup = g;
            break;
          }
        }
        if(isExist === false){
          MlUtil.logging('CONST_GROUP_SELECT error');
          AppStore.emitGroupSelectError();
          return;
        }
        AppStore.emitGroupSelect();
        MlUtil.logging('end CONST_GROUP_SELECT');
        break;
      case CONST_GROUP_EDIT:
          MlUtil.logging('start CONST_GROUP_EDIT');
          if (typeof action.data.error !== 'undefined') {
            MlUtil.logging('CONST_GROUP_EDIT error');
            AppStore.emitGroupEditError();
            return;
          }
          editGroup = action.data;
          AppStore.emitGroupEdit();

          for(var i = 0 ; i < groupList.length ; i++){
            if(groupList[i].id === editGroup.id){
              editGroup.directMembersCount = groupList[i].directMembersCount;
              groupList[i] = editGroup;
              break;
            }
          }
          AppStore.emitGroupList();

          MlUtil.logging('end CONST_GROUP_EDIT');
          break;
      case CONST_GROUP_MEMBER_LIST:
        MlUtil.logging('start CONST_GROUP_MEMBER_LIST');
        if (typeof action.data.error !== 'undefined') {
          MlUtil.logging('CONST_GROUP_MEMBER_LIST error');
          AppStore.emitGroupMemberListError();
          return;
        }
        memberList = action.data.members;
        AppStore.emitGroupMemberList();
        MlUtil.logging('end CONST_GROUP_MEMBER_LIST');
        break;
      case CONST_GROUP_MEMBER_DELETE:
        MlUtil.logging('start CONST_GROUP_DELETE');
        if (typeof action.data.error !== 'undefined') {
          MlUtil.logging('CONST_GROUP_DELETE error');
          AppStore.emitGroupMemberDeleteError();
          return;
        }
        deleteGroupMember = action.data;
        let newMemberList = [];
        for(let member of memberList){
          if(member.id === action.data.memberId){
            continue;
          }
          newMemberList.push(member);
        }
        memberList = newMemberList;

        selectGroup.directMembersCount = Number(selectGroup.directMembersCount) - 1;

        AppStore.emitGroupMemberDelete();
        AppStore.emitGroupList();
        MlUtil.logging('end CONST_GROUP_DELETE');
        break;
      case CONST_GROUP_MEMBER_ADD:
        MlUtil.logging('start CONST_GROUP_MEMBER_ADD');
        if (typeof action.data.error !== 'undefined') {
          MlUtil.logging('CONST_GROUP_MEMBER_ADD error');
          AppStore.emitGroupMemberAddError();
          return;
        }
        addGroupMember = action.data;
        MlUtil.logging(addGroupMember);
        memberList = [];
        memberList.push(addGroupMember);

        selectGroup.directMembersCount = Number(selectGroup.directMembersCount) + 1;
        AppStore.emitGroupMemberAdd();
        AppStore.emitGroupList();
        MlUtil.logging('end CONST_GROUP_MEMBER_ADD');
        break;
    }
    MlUtil.logging('end dispatchToken');
});

export default AppStore;
