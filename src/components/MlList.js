'use strict';

import React from 'react';
import MaterialUi from 'material-ui';
import {Link} from 'react-router';
import ReactTapEventPlugin from 'react-tap-event-plugin';
import AvatarMl from './AvatarMl';

const Colors = MaterialUi.Styles.Colors;
const List = MaterialUi.List;
const ListItem = MaterialUi.ListItem;
const IconButton = MaterialUi.IconButton;
const FontIcon = MaterialUi.FontIcon;
const ReactTransitionGroup = React.addons.TransitionGroup;
let Router = require('react-router');

var MlList = React.createClass({
  propTypes: {
    list: React.PropTypes.array,
    getList: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
  },
  getDefaultProps() {
    return {
      list: null
    };
  },
  componentDidMount: function () {
    this.props.getList();
  },
  render: function(){
    if(this.props.list === null){
      return (
        <div></div>
      );
    }
    const groups = this.props.list.map( (group, index) => {
      return (
        <div style={{width: '100%', textAlign: 'left'}}>
          <ListItem
            leftAvatar={<AvatarMl />}
            secondaryText={
              <p>
                <span style={{fontSize: '0.9em', color: Colors.darkBlack}}>{group.description}<br />
                人数: {group.directMembersCount}人
                </span>
              </p>
            }
            rightIconButton={
              <IconButton tooltip="Detail" disabled={false}>
                <FontIcon className="icon-chevron-right" color={Colors.lightBlueA100}/>
              </IconButton>
            }
            secondaryTextLines={2}
            key={group.id}
            id={group.id}
            onTouchTap={this._selectGroup} >
            <span style={{paddingLeft: "10px", fontSize: '1.0em'}}>{group.name}</span>
            <p style={{fontSize: '0.5em', margin: 0, padding: 0}}>{group.email}</p>
          </ListItem>
        </div>
      );
    });
    return (
      <List
        ref='list'
        subheader="ML List"
        style={{
          overflow: 'scroll',
          textAlign: 'center',
          fontSize: '1.2em',
          float: 'left'
        }}>
        {groups}
      </List>
    );
  },
  _selectGroup: function(e) {
    let id = $(e.currentTarget).attr('id');
    this.props.onSelect(id);
  },
});

module.exports = MlList;
