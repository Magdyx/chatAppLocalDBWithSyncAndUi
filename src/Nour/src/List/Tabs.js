import React, { Component } from 'react';
import { Text } from 'react-native';


var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class Tabs extends Component {

  render() {
    return (
      <ScrollableTabView
          tabBarBackgroundColor='#05aaea'
          tabBarActiveTextColor='#ffff'
          tabBarInactiveTextColor='#ffff'
          tabBarTextStyle={{ fontFamily: 'serif', fontSize: 15 }}
          tabBarUnderlineStyle={{ backgroundColor: '#ffff' }}>
        {this.props.tabs}
      </ScrollableTabView>
    );
  }
}
