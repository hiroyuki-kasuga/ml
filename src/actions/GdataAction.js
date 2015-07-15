'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {
    CONST_AUTH,
    CONST_GROUP_LIST,
    CONST_GROUP_SELECT,
    CONST_GROUP_ADD,
    CONST_GROUP_EDIT,
    CONST_GROUP_DELETE,
    CONST_GROUP_MEMBER_LIST,
    CONST_GROUP_MEMBER_ADD,
    CONST_GROUP_MEMBER_DELETE,
    CONST_GROUP_MEMBER_EDIT,
    CONST_USER_LIST,
    CONST_USER_ADD
}
from '../constants/Constants';
import MlUtil from '../util/MlUtil';
var json = require("../config/config.json");

const GROUP_LIST_PATH = '/admin/directory/v1/groups';
const GROUP_ADD_PATH = '/admin/directory/v1/groups';
let GROUP_EDIT_PATH = '/admin/directory/v1/groups/%s';
let GROUP_REMOVE_PATH = '/admin/directory/v1/groups/%s';
let GROUP_MEMBER_LIST_PATH = '/admin/directory/v1/groups/%s/members';
let GROUP_MEMBER_DELETE_PATH = '/admin/directory/v1/groups/%1s/members/%2s';
let GROUP_MEMBER_ADD_PATH = '/admin/directory/v1/groups/%s/members';

export default {
    clientId() {
      return json.google_api_key;
    },
    scopes() {
      return [
        'https://www.googleapis.com/auth/admin.directory.group',
        'https://www.googleapis.com/auth/admin.directory.group.member',
        'https://www.googleapis.com/auth/admin.directory.group.member.readonly',
        'https://www.googleapis.com/auth/admin.directory.group.readonly',
        'https://www.googleapis.com/auth/admin.directory.user',
        'https://www.googleapis.com/auth/admin.directory.user.alias',
        'https://www.googleapis.com/auth/admin.directory.user.alias.readonly',
        'https://www.googleapis.com/auth/admin.directory.user.readonly',
        'https://www.googleapis.com/auth/admin.directory.user.security',
        'https://www.googleapis.com/auth/admin.directory.userschema',
        'https://www.googleapis.com/auth/admin.directory.userschema.readonly'
      ];
    },
    auth() {
      gapi.auth.authorize({
          client_id: this.clientId(),
          scope: this.scopes(),
          immediate: false
        },
        this._handleAuthResult
      );
    },
    _handleAuthResult(authResult) {
      AppDispatcher.handleAuthAction({
          type: CONST_AUTH,
          data: authResult
      });
    },
    groupList() {
      let request = gapi.client.request({
        path: GROUP_LIST_PATH,
        method: 'GET',
        params: {
          domain: 'honeycomb-lab.co.jp'
        }
      });
      request.execute(this._handleGroupListResult);
    },
    _handleGroupListResult(result){
      AppDispatcher.handleGroupListAction({
        type: CONST_GROUP_LIST,
        data: result
      });
    },
    selectGroup(groupId){
      AppDispatcher.handleGroupSelectAction({
        type: CONST_GROUP_SELECT,
        data: {groupId: groupId}
      });
    },
    addGroup(email, name, description){
      MlUtil.logging('start addGroup');
      MlUtil.logging('email => ' + email);
      MlUtil.logging('name => ' + name);
      MlUtil.logging('description => ' + description);
      let request = gapi.client.request({
        path: GROUP_ADD_PATH,
        method: 'POST',
        body: {
          name: name,
          email: email,
          description: description
        }
      }).then((response) => {
        MlUtil.logging('start response addGroup');
        AppDispatcher.handleGroupAddAction({
          type: CONST_GROUP_ADD,
          data: response.result
        });
        MlUtil.logging('end response addGroup');
      });
      MlUtil.logging('end addGroup');
    },
    editGroup(groupId, email, name, description){
      MlUtil.logging('start editGroup');
      MlUtil.logging('groupId => ' + groupId);
      MlUtil.logging('email => ' + email);
      MlUtil.logging('name => ' + name);
      MlUtil.logging('description => ' + description);
      let request = gapi.client.request({
        path: GROUP_EDIT_PATH.replace('%s', groupId),
        method: 'PATCH',
        body: {
          name: name,
          email: email,
          description: description
        }
      }).then((response) => {
        MlUtil.logging('start response editGroup');
        AppDispatcher.handleGroupEditAction({
          type: CONST_GROUP_EDIT,
          data: response.result
        });
        MlUtil.logging('end response editGroup');
      });
      MlUtil.logging('end editGroup');
    },
    removeGroup(groupId){
      MlUtil.logging('start removeGroup');
      MlUtil.logging('groupId => ' + groupId);
      let request = gapi.client.request({
        path: GROUP_REMOVE_PATH.replace('%s', groupId),
        method: 'DELETE'
      }).then((response) => {
        MlUtil.logging('start response removeGroup');
        let result = {groupId: groupId};
        AppDispatcher.handleGroupRemoveAction({
          type: CONST_GROUP_DELETE,
          data: result
        });
        MlUtil.logging('end response removeGroup');
      });
      MlUtil.logging('end removeGroup');
    },
    groupMemberList(groupId) {
      let request = gapi.client.request({
        path: GROUP_MEMBER_LIST_PATH.replace('%s', groupId),
        method: 'GET',
      });
      request.execute(this._handleGroupMemberListResult);
    },
    _handleGroupMemberListResult(result){
      AppDispatcher.handleGroupMemberListAction({
        type: CONST_GROUP_MEMBER_LIST,
        data: result
      });
    },
    deleteGroupMember(groupId, memberId){
      MlUtil.logging('start deleteGroupMember');
      let request = gapi.client.request({
        path: GROUP_MEMBER_DELETE_PATH.replace('%1s', groupId).replace('%2s', memberId),
        method: 'DELETE'
      }).then((response) => {
        MlUtil.logging('start response deleteGroupMember');
        MlUtil.logging(response);
        let result = {groupId: groupId, memberId: memberId};
        AppDispatcher.handleGroupMemberDeleteAction({
          type: CONST_GROUP_MEMBER_DELETE,
          data: result
        });
        MlUtil.logging('end response deleteGroupMember');
      });
      MlUtil.logging('end deleteGroupMember');
    },
    addGroupMember(groupId, email, type, role){
      let request = gapi.client.request({
        path: GROUP_MEMBER_ADD_PATH.replace('%s', groupId),
        method: 'POST',
        body: {
          email: email,
          type: type,
          role: role
        }
      });
      request.execute(this._handleGroupMemberAddResult);
    },
    _handleGroupMemberAddResult(result){
      MlUtil.logging('start _handleGroupMemberAddResult');
      MlUtil.logging(result);
      AppDispatcher.handleGroupMemberAddAction({
        type: CONST_GROUP_MEMBER_ADD,
        data: result
      });
      MlUtil.logging('end _handleGroupMemberDeleteResult');
    }
};
