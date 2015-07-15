'use strict';

import React from 'react';
import MaterialUi from 'material-ui';
import {Link} from 'react-router';
import ReactTapEventPlugin from 'react-tap-event-plugin';
import MlUtil from '../util/MlUtil';
import Validator from '../util/Validator';
let Router = require('react-router');

const RaisedButton = MaterialUi.RaisedButton;
const TextField = MaterialUi.TextField;

var MlEdit = React.createClass({
  propTypes: {
    group: React.PropTypes.object,
    onEdit: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      group: null
    };
  },
  render: function(){
    if(this.props.group === null){
      return (<div></div>);
    }
    let style = {
      margin: '10px',
      width: '80%'
    };
    return (
      <div key={this.props.group.id}>
        <h1>Edit ML</h1>
        <TextField
          hintText="Name"
          floatingLabelText="Name"
          style={style}
          ref="name_text"
          multiLine={false}
          defaultValue={this.props.group.name} />
        <TextField
          hintText="Email"
          floatingLabelText="Email"
          style={style}
          ref="email_text"
          multiLine={false}
          defaultValue={this.props.group.email} />
        <TextField
          hintText="Description"
          floatingLabelText="Description"
          style={style}
          ref="description_text"
          multiLine={false}
          defaultValue={this.props.group.description}  />
        <br />
        <RaisedButton
          style={{margin: '10px'}}
          label="Edit"
          primary={true}
          onTouchTap={this._onEdit} />

        <RaisedButton
            style={{margin: '10px'}}
            label="Remove"
            primary={true}
            onTouchTap={this.props.onRemove} />
      </div>
    );
  },
  _onEdit: function(e){
    let email = this.refs.email_text;
    let name = this.refs.name_text;
    let description = this.refs.description_text;
    let emailValue = email.getValue();
    let nameValue = name.getValue();
    let descriptionValue = description.getValue();
    let values = {email: {value: emailValue}, name: {value: nameValue}, description: {value: descriptionValue}};

    if(Validator.validate(values)){
      let messages = Validator.messages;
      MlUtil.logging(messages);
      for(let m of messages){
        if(m.errorProperty === 'email'){
          email.setErrorText(m.message);
        }
        if(m.errorProperty === 'name'){
          name.setErrorText(m.message);
        }
        if(m.errorProperty === 'description'){
          description.setErrorText(m.message);
        }
      }
      return;
    }

    this.props.onEdit(emailValue, nameValue, descriptionValue);
  }
});

module.exports = MlEdit;
