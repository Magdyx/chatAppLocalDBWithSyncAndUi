import React, { Component } from 'react';
import { ListView } from 'react-native';


export default class GenericScrollView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.data),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this.props.renderItemFunction(rowData)}
      />
    );
  }
}
