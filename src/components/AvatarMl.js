'use strict';

import React from 'react';
import MaterialUi from 'material-ui';
import {Link} from 'react-router';
import GdataAction from '../actions/GdataAction';
import ReactTapEventPlugin from 'react-tap-event-plugin';
import AppStore from '../stores/AppStore';
import 'normalize.css';
import '../styles/main.sass';

const ThemeManager = new MaterialUi.Styles.ThemeManager();
const Colors = MaterialUi.Styles.Colors;
const Avatar = MaterialUi.Avatar;
const FontIcon = MaterialUi.FontIcon;
const ReactTransitionGroup = React.addons.TransitionGroup;
let Router = require('react-router');

ReactTapEventPlugin();

var AvatarMl = React.createClass({
  render: function(){
    return (
      <Avatar
        icon={
          <FontIcon className="icon-envelope-alt" />
        } />
    );
  }
});

module.exports = AvatarMl;
