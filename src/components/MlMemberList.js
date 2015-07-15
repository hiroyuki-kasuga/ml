'use strict';

import React from 'react';
import MaterialUi from 'material-ui';
import {Link} from 'react-router';
import ReactTapEventPlugin from 'react-tap-event-plugin';
import Validator from '../util/Validator';
import MlUtil from '../util/MlUtil';
var uuid = require('node-uuid');
let Router = require('react-router');

const RaisedButton = MaterialUi.RaisedButton;
const TextField = MaterialUi.TextField;
const SelectField = MaterialUi.SelectField;
const Dialog = MaterialUi.Dialog;
const Colors = MaterialUi.Styles.Colors;
ReactTapEventPlugin();

const roleItems = [
  {
    id: 'OWNER',
    name: 'OWNER',
    text: 'OWNER'
  },
  {
    id: 'MANAGER',
    name: 'MANAGER',
    text: 'MANAGER'
  },
  {
    id: 'MEMBER',
    name: 'MEMBER',
    text: 'MEMBER'
  }
];

const typeItems = [
  {
    id: 'GROUP',
    name: 'GROUP',
    text: 'GROUP'
  },
  {
    id: 'MEMBER',
    name: 'MEMBER',
    text: 'MEMBER'
  }
];
let memberId = null;

var MlMemberList = React.createClass({
  propTypes: {
    list: React.PropTypes.array,
    onDelete: React.PropTypes.func.isRequired,
    onAdd: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      email: null,
      role: null,
      type: null
    };
  },
  getDefaultProps() {
    return {
      list: null
    };
  },
  render: function(){
    let members = [];
    let style = {
      width: '80%'
    };
    if(this.props.list !== null){
      members = this.props.list.map( (member, index) => {
        return (
          <tr key={member.id} style={{height: '50px'}}>
            <td>{member.email}</td>
            <td>{member.role}</td>
            <td>{member.type}</td>
            <td><RaisedButton
              id={member.id}
              key={member.id}
              label="Delete"
              primary={false}
              onTouchTap={this._onDelete} />
            </td>
          </tr>
        );
      });
    }
    members.push(
      (
        <tr>
          <td>
            <TextField
              hintText="Email"
              floatingLabelText="Email"
              style={style}
              ref="email_text"
              multiLine={false}
              defaultValue='' />
          </td>
          <td>
            <SelectField
              ref="role_select"
              hintText="Select Role"
              value={this.state.role}
              onChange={this._changeRole}
              floatingLabelText="Select Role"
              menuItems={roleItems} />
          </td>
          <td>
            <SelectField
              ref="type_select"
              hintText="Select Type"
              value={this.state.type}
              onChange={this._changeType}
              floatingLabelText="Select Type"
              menuItems={typeItems} />
          </td>
          <td>
            <RaisedButton
              key='member_add'
              label="Add"
              primary={true}
              onTouchTap={this._onAdd} />
          </td>
        </tr>
      )
    );
    return (
      <div style={{margin: "30px 5px"}}>
        <table style={{width: '100%'}}>
          <thead>
            <tr style={{height: '50px', width: '100%'}}>
              <td style={{width: '50%'}}>Email</td>
              <td style={{width: '15%'}}>Role</td>
              <td style={{width: '15%'}}>Type</td>
              <td style={{width: '20%'}}>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {members}
          </tbody>
        </table>
        <Dialog
          title="Confirm Delete"
          actions={[
              {text: 'Cancel'},
              {text: 'Delete', onTouchTap: this._onDeleteSubmit, ref: 'submit'}
          ]}
          actionFocus="submit"
          ref="confirm_delete_dialog"
          modal="false" >
          削除しますがよろしいですか？
        </Dialog>
      </div>
    );
  },
  _onAdd: function(e){
    let email = this.refs.email_text;
    let role = this.refs.role_select;
    let type = this.refs.type_select;
    let emailValue = email.getValue();
    let roleValue = this.state.role;
    let typeValue = this.state.type;
    let values = {email: {value: emailValue}, role: {value: roleValue}, type: {value: typeValue}};

    if(Validator.validate(values)){
      let messages = Validator.messages;
      MlUtil.logging(messages);
      for(let m of messages){
        if(m.errorProperty === 'email'){
          email.setErrorText(m.message);
        }
        if(m.errorProperty === 'role'){
          role.setErrorText(m.message);
        }
        if(m.errorProperty === 'type'){
          type.setErrorText(m.message);
        }
      }
      return;
    }
    this.props.onAdd(this.refs.email_text.getValue(), this.state.role, this.state.type);
  },
  _changeRole: function(e){
    this.setState({
      role: e.target.value
    });
  },
  _changeType: function(e){
    this.setState({
      type: e.target.value
    });
  },
  _onDelete: function(e){
    memberId = $(e.currentTarget).attr('id');
    this.refs.confirm_delete_dialog.show();
  },
  _onDeleteSubmit: function(e){
    this.refs.confirm_delete_dialog.dismiss();
    if(memberId !== null){
      this.props.onDelete(memberId);
    }
  }
});

module.exports = MlMemberList;
