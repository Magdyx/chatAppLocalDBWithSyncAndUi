import React, { Component } from 'react';
import { FlatList, View } from 'react-native';


export default class GenericList extends Component {

  render() {
    return (
      <View style={{ flex: 1 }} >
        <FlatList
          data={this.props.data}
          extraData={this.props.extraData}
          renderItem={(item) => {
            return this.props.renderItemFunction(item.item);
          }
          }
        />
      </View>
    );
  }
}
