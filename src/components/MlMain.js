'use strict';

import React from 'react';
import MaterialUi from 'material-ui';
import {Link} from 'react-router';
import GdataAction from '../actions/GdataAction';
import ReactTapEventPlugin from 'react-tap-event-plugin';
import AppStore from '../stores/AppStore';
import MlMemberList from './MlMemberList';
import MlList from './MlList';
import MlEdit from './MlEdit';
import MlNew from './MlNew';
import MlUtil from '../util/MlUtil';
var uuid = require('node-uuid');
import 'normalize.css';
import '../styles/main.sass';

const ThemeManager = new MaterialUi.Styles.ThemeManager();
const Snackbar = MaterialUi.Snackbar;
const RaisedButton = MaterialUi.RaisedButton;
const Colors = MaterialUi.Styles.Colors;
let Router = require('react-router');

ReactTapEventPlugin();

var MlMain = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
      return {
          muiTheme: ThemeManager.getCurrentTheme()
      };
  },
  getInitialState: function () {
    return {
      groupList: null,
      selectGroup: null,
      selectGroupMemberList: null,
      listHeight: $(document).height(),
      snackMessage: '',
      showSnack: false,
      snackUuid: uuid.v4().split('-').join('')
    };
  },
  componentDidMount: function () {
    AppStore.addGroupMemberListErrorListener(this._onError);
    AppStore.addGroupMemberListListener(this._onGroupMemberList);

    AppStore.addGroupListErrorListener(this._onError);
    AppStore.addGroupListListener(this._onGroupList);

    AppStore.addGroupMemberDeleteErrorListener(this._onError);
    AppStore.addGroupMemberDeleteListener(this._onGroupMemberDelete);

    AppStore.addGroupMemberAddErrorListener(this._onError);
    AppStore.addGroupMemberAddListener(this._onGroupMemberAdd);

    AppStore.addGroupEditErrorListener(this._onError);
    AppStore.addGroupEditListener(this._onGroupEdit);

    AppStore.addGroupSelectErrorListener(this._onError);
    AppStore.addGroupSelectListener(this._onGroupSelect);

    AppStore.addGroupAddErrorListener(this._onError);
    AppStore.addGroupAddListener(this._onGroupAdd);

    AppStore.addGroupDeleteErrorListener(this._onError);
    AppStore.addGroupDeleteListener(this._onGroupDelete);

    window.addEventListener('resize', this._handleResize);
  },
  componentWillUnmount: function () {
    AppStore.removeGroupMemberListErrorListener(this._onError);
    AppStore.removeGroupMemberListListener(this._onGroupMemberList);

    AppStore.removeGroupListErrorListener(this._onError);
    AppStore.removeGroupListListener(this._onGroupList);

    AppStore.removeMemberDeleteErrorListener(this._onError);
    AppStore.removeMemberDeleteListener(this._onGroupMemberDelete);

    AppStore.removeGroupMemberAddErrorListener(this._onError);
    AppStore.removeGroupMemberAddListener(this._onGroupMemberAdd);

    AppStore.removeGroupEditErrorListener(this._onError);
    AppStore.removeGroupEditListener(this._onGroupEdit);

    AppStore.removeGroupSelectErrorListener(this._onError);
    AppStore.removeGroupSelectListener(this._onGroupSelect);

    AppStore.removeGroupAddErrorListener(this._onError);
    AppStore.removeGroupAddListener(this._onGroupAdd);

    AppStore.removeGroupDeleteErrorListener(this._onError);
    AppStore.removeGroupDeleteListener(this._onGroupDelete);

    window.removeEventListener('resize', this._handleResize);
  },
  _onError: function(){
    MlUtil.logging('start _onError');
    MlUtil.logging('end progress');
    MlUtil.hideProgress();
    alert('エラーが発生しました。');
    MlUtil.logging('end _onError');
  },
  _onGroupDelete: function(){
    MlUtil.logging('start _onGroupDelete');
    MlUtil.logging('end progress');
    MlUtil.hideProgress();
    this.setState({
      snackMessage: '削除しました。',
      showSnack: true,
      snackUuid: uuid.v4().split('-').join('')
    });
    MlUtil.logging('end _onGroupDelete');
  },
  _onGroupAdd: function(){
    MlUtil.logging('start _onGroupAdd');
    MlUtil.logging('end progress');
    MlUtil.hideProgress();
    this.setState({
      selectGroup: AppStore.getGroupSelect(),
      snackMessage: '追加しました。',
      showSnack: true,
      snackUuid: uuid.v4().split('-').join('')
    });
    MlUtil.logging('end _onGroupEdit');
  },
  _onGroupEdit: function(){
    MlUtil.logging('start _onGroupEdit');
    MlUtil.logging('end progress');
    MlUtil.hideProgress();
    this.setState({
      selectGroup: AppStore.getGroupEdit(),
      snackMessage: '更新しました。',
      showSnack: true,
      snackUuid: uuid.v4().split('-').join('')
    });
    MlUtil.logging('end _onGroupEdit');
  },
  _onGroupMemberList: function(){
    MlUtil.logging('start _onGroupMemberList');
    MlUtil.logging('end progress');
    MlUtil.hideProgress();
    this.setState({
      selectGroupMemberList: AppStore.getGroupMemberList()
    });
    MlUtil.logging('end _onGroupMemberList');
  },
  _onGroupList: function(){
    MlUtil.logging('start _onGroupList');
    MlUtil.logging('end progress');
    MlUtil.hideProgress();
    this.setState({
        groupList: AppStore.getGroupList()
    });
    MlUtil.logging('end _onGroupList');
  },
  _onGroupSelect: function(){
    MlUtil.logging('start _onGroupSelect');
    this.setState({
      selectGroup: AppStore.getGroupSelect(),
    });
    GdataAction.groupMemberList(AppStore.getGroupSelect().id);
    MlUtil.logging('end _onGroupSelect');
  },
  _onGroupMemberDelete: function(){
    MlUtil.logging('start _onGroupMemberDelete');
    MlUtil.logging('end progress');
    MlUtil.hideProgress();
    this.setState({
      selectGroupMemberList: AppStore.getGroupMemberList(),
      snackMessage: '削除しました。',
      showSnack: true
    });
    this.refs.snackbar.show();
    MlUtil.logging('end _onGroupMemberDelete');
  },
  _onGroupMemberAdd: function(){
    MlUtil.logging('start _onGroupMemberAdd');
    MlUtil.logging('end progress');
    MlUtil.hideProgress();
    this.setState({
      selectGroupMemberList: AppStore.getGroupMemberList(),
      snackMessage: '追加しました。',
      showSnack: true
    });
    this.refs.snackbar.show();
    MlUtil.logging('end _onGroupMemberAdd');
  },
  render: function(){
    var view = this._addEditView();
    return (
      <div style={{width: '100%', textAlign: 'left'}}>
        <div style={{
            width: '30%',
            height: this.state.listHeight + 'px',
            overflow: 'scroll',
            textAlign: 'center',
            fontSize: '1.2em',
            float: 'left'}}>
          <MlList
            list={this.state.groupList}
            getList={this._getGroupList}
            onSelect={this._groupSelect} />
        </div>
        <div style={{
            width: '65%',
            float: 'right',
            margin: '5px'}}>
          <RaisedButton
              label="New"
              style={{float: 'right', margin: '20px'}}
              primary={true}
              onTouchTap={this._onNew} />
            {view}
          <MlMemberList
            list={this.state.selectGroupMemberList}
            onDelete={this._memberDelete}
            onAdd={this._memberAdd} />
        </div>
        <Snackbar
          key={this.state.snackUuid}
          ref="snackbar"
          message={this.state.snackMessage}
          action="close"
          openOnMount={this.state.showSnack}
          onActionTouchTap={this._onSnackbarClose}/>
      </div>
    );
  },
  _onNew: function(){
    this.setState({
      selectGroup: null,
      selectGroupMemberList: null
    });
  },
  _addEditView: function(){
    if(this.state.selectGroup !== null){
      return (
        <MlEdit
          group={this.state.selectGroup}
          onEdit={this._edit}
          onRemove={this._removeGroup} />
      );
    }else{
      return (
        <MlNew
          onAdd={this._add} />
      );
    }
  },
  _add: function(email, type, role){
    MlUtil.logging('start _add');
    MlUtil.logging('email => ' + email);
    MlUtil.logging('type => ' + type);
    MlUtil.logging('role => ' + role);
    MlUtil.logging('start progress');
    MlUtil.showProgress();
    GdataAction.addGroup(email, type, role);
    MlUtil.logging('end _add');
  },
  _edit: function(email, name, description){
    MlUtil.logging("start _edit");
    MlUtil.logging('start progress');
    MlUtil.logging('id => ' + this.state.selectGroup.id);
    MlUtil.logging('email => ' + email);
    MlUtil.logging('name => ' + name);
    MlUtil.logging('description => ' + description);
    MlUtil.showProgress();
    GdataAction.editGroup(this.state.selectGroup.id, email, name, description);
    MlUtil.logging("end _edit");
  },
  _removeGroup: function(){
    MlUtil.logging("start _removeGroup");
    MlUtil.logging('start progress');
    MlUtil.logging('id => ' + this.state.selectGroup.id);
    MlUtil.showProgress();
    GdataAction.removeGroup(this.state.selectGroup.id);
    MlUtil.logging("end _removeGroup");
  },
  _onSnackbarClose: function(){
    MlUtil.logging('start _onSnackbarClose');
    this.refs.snackbar.dismiss();
    MlUtil.logging('end _onSnackbarClose');
  },
  _memberAdd: function(email, type, role){
    MlUtil.logging('start _memberAdd');
    MlUtil.logging('id => ' + this.state.selectGroup.id);
    MlUtil.logging('email => ' + email);
    MlUtil.logging('type => ' + type);
    MlUtil.logging('role => ' + role);
    MlUtil.logging('start progress');
    MlUtil.showProgress();
    GdataAction.addGroupMember(this.state.selectGroup.id, email, type, role);
    MlUtil.logging('end _memberAdd');
  },
  _memberDelete: function(id){
    MlUtil.logging('start _memberDelete');
    MlUtil.logging('start progress');
    MlUtil.showProgress();
    MlUtil.logging('groupId => ' + this.state.selectGroup.id);
    MlUtil.logging('memberId => ' + id);
    GdataAction.deleteGroupMember(this.state.selectGroup.id, id);
    MlUtil.logging('end _memberDelete');
  },
  _getGroupList: function(){
    MlUtil.logging('start _getGroupList');
    MlUtil.logging('start progress');
    MlUtil.showProgress();
    GdataAction.groupList();
    MlUtil.logging('end _getGroupList');
  },
  _groupSelect: function(id){
    MlUtil.logging('start _getGroupList');
    MlUtil.logging('id => ' + id);
    MlUtil.logging('start progress');
    MlUtil.showProgress();
    GdataAction.selectGroup(id);
    MlUtil.logging('end _getGroupList');
  },
  _handleResize: function(){
    this.setState({
      listHeight: $(document).height()
    });
  }
});

module.exports = MlMain;
