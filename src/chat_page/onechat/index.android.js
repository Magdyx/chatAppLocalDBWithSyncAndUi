/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View
 } from 'react-native';

import Chat from './Chat';


let messages = [
  {
    _id: 1,
    text: 'Hello chat',
    state: 1,
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'ahmed',
    },
  },
  {
    _id: 70,
    text: 'Hello chat',
    state: 2,
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'ahmed',
    },
  },
  {
    _id: 77,
    text: 'Hello chat',
    state: 3,
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'ahmed',
    },
  },
  {
    _id: 2,
    text: 'Hello chat tttttttttt',
    state: 1,
    image: 'https://facebook.github.io/react/img/logo_og.png',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'mohamed',
    },
  },
  {
    _id: 3,
    text: 'Hello developer',
    state: 1,
    createdAt: new Date(),
    user: {
      _id: 4,
      name: 'React Native',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
  },
  {
    _id: 4,
    text: 'Hello coder',
    state: 1,
    createdAt: new Date(),
    user: {
      _id: 4,
      name: 'React Native',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
  },
  {
    _id: 5,
    text: 'Hello coder1',
    state: 1,
    createdAt: new Date(),
    user: {
      _id: 4,
      name: 'React Native',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
  },
  {
    _id: 6,
    text: 'Hello coder2',
    state: 1,
    createdAt: new Date(),
    user: {
      _id: 4,
      name: 'React Native',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
  },
  {
    _id: 7,
    text: 'Hello coder3',
    state: 1,
    createdAt: new Date(),
    user: {
      _id: 4,
      name: 'React Native',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
  },
];

export default class onechat extends Component {

  state = {
    messages: [],
    loadEarlier: true,
    isLoadingEarlier: false,
  };

  componentDidMount() {
    setTimeout(()=> {
       this.setState({messages: messages});
     }, 5000);
  }

  onLoadEarlier() {
    this.setState({ isLoadingEarlier: true });
    let rest = [
      {
        _id: 12,
        text: 'Hello coder8',
        state: 1,
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },
      {
        _id: 13,
        text: 'Hello coder9',
        state: 1,
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },
      {
        _id: 8,
        text: 'Hello coder4',
        state: 1,
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },
      {
        _id: 9,
        text: 'Hello coder5',
        state: 1,
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },
      {
        _id: 10,
        text: 'Hello coder6',
        state: 1,
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },
      {
        _id: 11,
        text: 'Hello coder7',
        state: 1,
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },
    ];
    this.setState({ messages: this.state.messages.concat(rest),
      loadEarlier: false, isLoadingEarlier: false });
  }

  render() {
    return (
      <Chat messages={this.state.messages}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier.bind(this)}
        isLoadingEarlier={this.state.isLoadingEarlier}
        onPressAvatar={(user) => {console.log(user)} }
        onMessageSend={(message) => { console.log(message)} }
        userID={1}
        userName='ahmed'
        //rightColor='#AB47BC'
        />
    );
  }
}

AppRegistry.registerComponent('onechat', () => onechat);
