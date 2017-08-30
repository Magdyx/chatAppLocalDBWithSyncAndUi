// npm install react-native-vector-icons --save
// react-native link react-native-vector-icons


// npm install react-native-gifted-chat --save



import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';

import Day from './Day';

import SendIcon from 'react-native-vector-icons/Ionicons';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import send from './send.png';

import { POST } from '../ApiCalls';


import { GiftedChat } from 'react-native-gifted-chat';


export default class Chat extends Component {

  constructor(props) {
    super(props);

    state = {
      messages: [],
    };
  }

  componentWillMount() {
    this.setState({
      messages: this.props.messages
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.messages
    });
  }

  onResponseReceived(response, bool) {
    console.log("message received");
    // response.data.messageSequence
    // response.data.messageTimestamp

    // update the state of this message in db
  }

  onSend(messages = []) {

    // add this message to db with state 0 and get surrogateKey

    // add surrogateKey to this object
    let obj = {senderID:this.props.userID, messageContents:messages[0].text};
    let URLpost='http://192.168.1.42:9998/onechat/sendmessage';
    POST(obj,URLpost,this.onResponseReceived);

    // the parent should put the messages array in state and setState with any update in db
    // then the view will automatically update
  }

  renderSend(props) {
    // return the custom view of send button
    if (props.text.trim().length > 0) {
      return (
        <TouchableOpacity
          style={[styles.container, props.containerStyle]}
          onPress={() => {
            props.onSend({text: props.text.trim()}, true);
          }}
          accessibilityTraits="button"
        >
          <SendIcon name="md-send" size={30} color="#2196F3" style={styles.sendIcon} />
        </TouchableOpacity>
      );
    }
    return <View/>;
  }

  renderLoadEarlier(props) {
    return (
      <TouchableOpacity
        style={styles.loadingContainer}
        onPress={() => {
          if (props.onLoadEarlier) {
            props.onLoadEarlier();
          }
        }}
        disabled={props.isLoadingEarlier === true}
        accessibilityTraits="button"
      >
        <View style={styles.loadingWrapper}>
          {this.renderLoading(props)}
        </View>
      </TouchableOpacity>
    );
  }

  renderLoading(props) {
    if (props.isLoadingEarlier === false) {
      return (
        <Text style={styles.loadingText}>
          Load earlier messages
        </Text>
      );
    }
    return (
      <View>
        <Text style={styles.loadingText, {
            opacity: 0,
          }}>
          Load earlier messages
        </Text>
        <ActivityIndicator
          color='white'
          size='small'
          style={styles.activityIndicator}
        />
      </View>
    );
  }

  renderTicks(currentMessage) {
    if (currentMessage.user._id !== this.props.userID) {
        return;
    }
    switch (currentMessage.state) {
      case 0:
        return <CheckIcon name='check' size={15} color='#FFFFFF00' style={styles.tick} />;
        break;
      case 1:
        return <CheckIcon name='check' size={15} color='#FFFFFF' style={styles.tick} />
        break;
      case 2:
        return <CheckIcon name='check-all' size={15} color='#FFFFFF' style={styles.tick} />
        break;
      case 3:
        return <CheckIcon name='check-all' size={15} color='#76FF03' style={styles.tick} />
        break;
      default:
        return null;
    }
  }

  renderDay(props) {
    return <Day {...props}/>;
  }

  render() {

    const wrapperStyle = StyleSheet.create({
      left: {
        backgroundColor: this.props.leftColor,
      },
      right: {
        backgroundColor: this.props.rightColor,
      },
    });

    return (
      <GiftedChat
        isAnimated={this.props.isAnimated}
        wrapperStyle={wrapperStyle}
        loadEarlier={this.props.loadEarlier}
        onLoadEarlier={this.props.onLoadEarlier}
        isLoadingEarlier={this.props.isLoadingEarlier}
        renderSend={this.renderSend.bind(this)}
        renderTicks={this.renderTicks.bind(this)}
        renderLoadEarlier={this.renderLoadEarlier.bind(this)}
        renderDay={this.renderDay.bind(this)}
        showUserAvatar={this.props.showUserAvatar}
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        onPressAvatar={this.props.onPressAvatar}
        user={{
          _id: this.props.userID,
          userName: '',
          userAvatar: null,
          hostColor: '',
          guestColor: '',
          name: this.props.userName,
          avatar: this.props.userAvatar,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  loadingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b2b2b2',             // color of load earlier toast
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  loadingText: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 12,
  },
  activityIndicator: {
    marginTop: Platform.select({
      ios: -14,
      android: -16,
    }),
  },
  sendIcon: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 7,
    alignSelf: 'center',
  },
  tick: {
    marginLeft: -5,
    marginRight: 5,
  }
});

Chat.defaultProps = {
  isAnimated: false,
  loadEarlier: false,
  onLoadEarlier: null,
  isLoadingEarlier: false,
  showUserAvatar: false,
  onPressAvatar: null,
  userID: null,
  userName: '',
  userAvatar: null,
  rightColor: '#44b9e0',
  leftColor: '#f0f0f0'
};
