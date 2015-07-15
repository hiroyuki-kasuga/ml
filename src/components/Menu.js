'use strict';

import React from 'react';
import MaterialUi from 'material-ui';
import {Link} from 'react-router';
import ReactTapEventPlugin from 'react-tap-event-plugin';
import 'normalize.css';
import '../styles/main.sass';

const ThemeManager = new MaterialUi.Styles.ThemeManager();
const Colors = MaterialUi.Styles.Colors;
const ReactTransitionGroup = React.addons.TransitionGroup;
let Router = require('react-router');

ReactTapEventPlugin();

var Menu = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
      return {
          muiTheme: ThemeManager.getCurrentTheme()
      };
  },
  render: function(){
    let containerStyle = {
        listStyleType: "none"
    };
    return (
      <div>
        <ul style={containerStyle}>
          <li><Link to="ml-list">ML List</Link></li>
        </ul>
      </div>
    );
  },
});

module.exports = Menu;
