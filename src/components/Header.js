'use strict';

import React from 'react';
import MaterialUi from 'material-ui';
import ReactTapEventPlugin from 'react-tap-event-plugin';
import 'normalize.css';
import '../styles/main.sass';

const ThemeManager = new MaterialUi.Styles.ThemeManager();
const Colors = MaterialUi.Styles.Colors;
const AppBar = MaterialUi.AppBar;
const LeftNav = MaterialUi.LeftNav;
const ReactTransitionGroup = React.addons.TransitionGroup;
let Router = require('react-router');

ReactTapEventPlugin();

let MENU_IETMS = [
  {
    route: 'ml-list',
    text: 'ML List'
  }
];

var Header = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
      return {
          muiTheme: ThemeManager.getCurrentTheme()
      };
  },
  render: function(){
    return (
      <div>
        <AppBar title="Make ML" iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonTouchTap={this._handleTouchMenu} />
        <LeftNav
          ref="leftNav"
          docked={false}
          isInitiallyOpen={false}
          menuItems={MENU_IETMS}
          selectedIndex={this._getSelectedIndex()}
          onChange={this._onLeftNavChange} />
      </div>
    );
  },
  _handleTouchMenu: function(){
    this.refs.leftNav.toggle();
  },
  _getSelectedIndex: function() {
    let currentItem;

    for (let i = MENU_IETMS.length - 1; i >= 0; i--) {
      currentItem = MENU_IETMS[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) {
        return i;
      }
    }
  },
  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  }
});

Header.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Header;
