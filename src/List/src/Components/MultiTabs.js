import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

export default class TabViewExample extends PureComponent {
  routes = [];
  constructor(props) {
    super(props);
    for (let i = 1; i <= props.chatListProps.numberOfTabs; i++) {
      this.routes.push({ key: `${i}`, title: props.chatListProps.tabs[i-1].title });
    }
  }

  state = {
    index: 0,
    routes: this.routes
  };


  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = () => {
    return this.props.chatListProps.tabs[this.state.index].content;
  };
  //SceneMap(this.scenes);

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
