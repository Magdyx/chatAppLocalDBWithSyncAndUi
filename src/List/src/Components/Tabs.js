import React, { Component } from 'react';
import { Text } from 'react-native';


var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class Tabs extends Component {

  render() {
    return (
      <ScrollableTabView>
        {this.props.tabs}
      </ScrollableTabView>
    );
  }
}
