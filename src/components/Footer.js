import React from 'react';
import {Link} from 'react-router';
import MaterialUi from 'material-ui';
import ReactTapEventPlugin from 'react-tap-event-plugin';
import 'normalize.css';
import '../styles/main.sass';

const ThemeManager = new MaterialUi.Styles.ThemeManager();
const Colors = MaterialUi.Styles.Colors;
const ReactTransitionGroup = React.addons.TransitionGroup;

ReactTapEventPlugin();

export default class Footer extends React.Component{

  render(){
    return (
      <div></div>
    );
  }
}
