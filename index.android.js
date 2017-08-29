import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Magdy from './src/CheckConnection/checkInternetConnection';
import { syncChannels, syncMessages } from './src/Sync';
import ChatDetails from './src/List/src/Components/ChatDetails';
import GenericList from './src/List/src/Components/GenericList';
import Example from './src/List/src/Components/Tabs';
import userService from './src/DAOs/userService';
import _ from 'lodash';

function printResponse(response) {
    console.log(response.json());
}

//syncChannels();
//syncMessages();

function redirectToChannel(channel) {
    console.log('redirected to channel', channel.channel_id)
}

function chatListAdapter() {
    console.log('in chat list adapter')
    const localChannels = userService.findAllChannels();
    console.log(localChannels);
    const uiChannels = localChannels.map((channel) => {
        return {
            userName: channel.localName,
            lastMessage: channel.latestUpdateTimeStamp.format("dd.mm.yyyy hh:MM:ss"),
            numberOfUnreadMessages: channel.unreadMessages,
            onTouch: redirectToChannel(channel),
            image: channel.image == ''? 'https://i.imgur.com/K3KJ3w4h.jpg': channel.image
        }
    })
    return uiChannels;
}

function _fillDatabaseWithDummyChannels() {
    let i = 0;
    while(i < 20) {
        userService.createChannel({
            channel_id: "x"+i,
            qr: '',
            status: true,
            localName: 'new user'+i,
            unreadMessages: 0,
            image: '',
            lastMessageState: 0
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
    console.log('in render item', item);
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
        console.log('ui channels', list);
        return (
            <View style={{flex: 1}}>
                <Example
                    tabs={[
                        <GenericList
                            data={list}
                            renderItemFunction={renderItems}
                            tabLabel="User"
                            key="1"
                        />,
                        <GenericList
                            data={secondList}
                            renderItemFunction={renderItems}
                            tabLabel="Agency"
                            key="2"
                        />]}
                />
            </View>
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