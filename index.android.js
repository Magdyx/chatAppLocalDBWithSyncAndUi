import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Magdy from './src/CheckConnection/checkInternetConnection';
import { syncChannels, syncMessages, syncChannelMessages } from './src/LocalStorage/Sync';
import ChatDetails from './src/List/src/Components/ChatDetails';
import GenericList from './src/List/src/Components/GenericList';
import Example from './src/List/src/Components/Tabs';
import userService from './src/LocalStorage/DAOs/userService';
import ChannelView from './src/ChatController/ChannelView';
import _ from 'lodash';


// const message1 = {
//     channel_id: 1,
//     message_id: 6,
//     text: 'blabla'
// }
// userService.createMessage(message1);
// const message2 = {
//     channel_id: 1,
//     message_id: 7,
//     text: 'blabl'
// }
// userService.createMessage(message2);
//syncChannels();
//syncChannelMessages();
// userService.updateMessageStatus(18, 1, 2);
// syncMessages( 1 , 1 , 0 );

function redirectToChannel(channel) {
    // console.log('redirected to channel', channel.channel_id)
}

function chatListAdapter() {
    // console.log('in chat list adapter')
    const localChannels = userService.findAllChannels();
    // console.log(localChannels);
    const uiChannels = localChannels.map((channel) => {
        return {
            userName: channel.localName,
            lastMessage: channel.latestUpdateTimeStamp+"",
            numberOfUnreadMessages: channel.unreadMessages,
            onTouch: redirectToChannel(channel),
            image: channel.image == ''? 'https://i.imgur.com/K3KJ3w4h.jpg': channel.image
        }
    })
    return uiChannels;
}

function messageListAdapter(channelSurrogateKey) {
    //console.log('in message adapter',);
}

function _fillDatabaseWithDummyChannels() {
    let i = 1;
    while(i < 20) {
        userService.createChannel({
            channel_id: "x"+i,
            qr: '',
            status: true,
            localName: 'new user'+i,
            unreadMessages: i+2,
            image: '',
            lastMessageState: 1
        })
        i++;
    }
    while(i < 30) {
        userService.createChannel({
            channel_id: "x"+i,
            qr: 'x',
            status: true,
            localName: 'new user'+i,
            unreadMessages: i+2,
            image: '',
            lastMessageState: 1
        })
        i++;
    }
}

const thelist = [
    { userName: 'ahmed', lastMessage: 'aaaaaaaaaaa', numberOfUnreadMessages: 1, onTouch: feedback },
    { userName: 'helmi', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 1, onTouch: feedback },
    { userName: 'adel', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 1, onTouch: feedback },
    { userName: 'magdy', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 1, onTouch: feedback },
    { userName: 'nour', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 1, onTouch: feedback },
    { userName: 'Ibrahim', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 10, onTouch: feedback },
    { userName: 'hafez', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 1, onTouch: feedback },
    { userName: 'sherouk', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 0, onTouch: feedback },
    { userName: 'hossam', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 1, onTouch: feedback },
    { userName: 'taha', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 1, onTouch: feedback },
    { userName: 'gaber', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 1, onTouch: feedback }
];

const secondList = [
    { userName: 'ahmed', lastMessage: 'aaaaaaaaaaa', numberOfUnreadMessages: 0, onTouch: feedback },
    { userName: 'helmi', lastMessage: 'aaaaaaaaaaa', onTouch: feedback },
    { userName: 'adel', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 1, onTouch: feedback },
    { userName: 'magdy', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 1, onTouch: feedback },
    { userName: 'nour', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 1, onTouch: feedback },
    { userName: 'Ibrahim', lastMessage: 'aaaaaaaaaaa', image: 'https://i.imgur.com/K3KJ3w4h.jpg', numberOfUnreadMessages: 10, onTouch: feedback }
];


function renderItems(item) {
    // console.log('in render item', item);
    return <ChatDetails key={item.userName} listItem={item} />;
}

function feedback(item) {
    console.log(item);
}

class testRealm extends Component {
    constructor(props) {
        super(props);
        this.state = {realm: null};
    }

    render() {
        // _fillDatabaseWithDummyChannels();
        const list = chatListAdapter();
        // console.log('ui channels', list);
        return (
            <ChannelView/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('testRealm', () => testRealm);