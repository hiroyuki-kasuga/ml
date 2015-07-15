'use strict';

import React from 'react';
import Router   from 'react-router';
import {RouteHandler} from 'react-router';
import ReactMixin from 'react-mixin';
import GdataAction from '../actions/GdataAction';
import ReactTapEventPlugin from 'react-tap-event-plugin';
import MaterialUi from 'material-ui';
import AppStore from '../stores/AppStore';
import Header from './Header.js';
import Footer from './Footer.js';
import 'normalize.css';
import '../styles/main.sass';

const ThemeManager = new MaterialUi.Styles.ThemeManager();
const Colors = MaterialUi.Styles.Colors;
const RaisedButton = MaterialUi.RaisedButton;
const ReactTransitionGroup = React.addons.TransitionGroup;

ReactTapEventPlugin();

var MlApp = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  mixins: [Router.Navigation],
  getChildContext: function() {
      return {
          muiTheme: ThemeManager.getCurrentTheme()
      };
  },
  getInitialState: function () {
    return {
      auth: null,
      authError: false
    };
  },
  componentWillMount: function() {
    //this._handleAuth();
  },
  componentDidMount: function () {
      AppStore.addAuthErrorListener(this._onError);
      AppStore.addAuthAcceptListener(this._onAccept);
  },
  componentWillUnmount: function () {
      AppStore.removeAuthErrorListener(this._onError);
      AppStore.removeAuthAcceptListener(this._onAccept);
  },
  _onError: function () {
      this.setState({
          auth: AppStore.getAuth(),
          authError: true
      });
  },
  _onAccept: function () {
    this.setState({
        auth: AppStore.getAuth(),
        authError: false
    });
  },
  render: function () {
    let containerStyle = {
        textAlign: 'center',
        paddingTop: '200px'
    };
      if(this.state.authError){
        return (
          <div style={containerStyle}>
            <h1> Make ML </h1>
            <RaisedButton label="Auth" primary={true} onTouchTap={this._handleAuth}/>
            <p>AuthError. You must Accept App Authentication.</p>
          </div>
        );
      } else if (this.state.auth !== null) {
        let containerStyle = {
            textAlign: 'center',
            paddingTop: '0'
        };
        return (
          <div>
            <Header />
            <div style={containerStyle}>
              <RouteHandler />
            </div>
            <Footer />
          </div>
        );
      }
      return (
        <div style={containerStyle}>
          <h1> Make ML </h1> <RaisedButton label="Auth" primary={true} onTouchTap={this._handleAuth}/>
        </div>
      );
  },
  _handleAuth: function () {
      GdataAction.auth();
  }
});
module.exports = MlApp;
