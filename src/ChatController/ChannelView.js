import ChatDetails from '../List/src/Components/ChatDetails';
import GenericList from '../List/src/Components/GenericList';
import Example from '../List/src/Components/Tabs';
import React, {Component} from 'react';
import userService from '../LocalStorage/DAOs/userService';
import {StackNavigator, NavigationActions} from 'react-navigation';

const usersList = [];
const agencyList = [];

function agencyOrUser() {
    const localChannels = userService.findAllChannels();
    for (let i = 0; i < localChannels.length; i++) {
        let adaptedChannel = {
            userName: localChannels[i].localName,
            lastMessage: getDateFormat(localChannels[i].latestUpdateTimeStamp),
            numberOfUnreadMessages: localChannels[i].unreadMessages,
            onTouch: () => redirectToChannel(localChannels[i]),
            image: localChannels[i].image == '' ? 'https://i.imgur.com/K3KJ3w4h.jpg' : localChannels[i].image
        };
        if (localChannels[i].qr == '') {
            agencyList.push(adaptedChannel);
        } else {
            usersList.push(adaptedChannel);
        }
    }
}

function getDateFormat(time) {
    const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    let timeFormat = "";
    let today = new Date();
    today.setSeconds(0);
    today.setMilliseconds(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    let diff = today.getTime() - time.getTime();
    if (today.getTime() >= time.getTime()) {
        timeFormat += "Today - ";
        timeFormat += days[time.getDay()] + " ";
    }
    else if (diff <= (24 * 60 * 60 * 1000)) {
        timeFormat += "Yesterday - ";
        timeFormat += days[time.getDay()] + " ";
    }
    else {
        timeFormat += days[time.getDay()] + " ";
    }
    timeFormat += time.getHours() + ":";
    timeFormat += time.getMinutes();
    if (time.getHours() > 12) {
        timeFormat += "PM";
    } else {
        timeFormat += "AM";
    }
    return timeFormat;
}


function redirectToChannel(channel) {
    // navigate('App');
    console.log('redirected to channel', channel.channel_id)
}

function renderItems(item) {
    return <ChatDetails key={item.userName} listItem={item}/>;
}

function _fillDatabaseWithDummyChannels() {
    let i = 0;
    while (i < 20) {
        userService.createChannel({
            channel_id: "xjgj" + i,
            qr: '',
            status: true,
            localName: 'new user' + i,
            unreadMessages: 0,
            image: '',
            lastMessageState: 0
        })
        i++;
    }
    while (i < 40) {
        userService.createChannel({
            channel_id: "x" + i,
            qr: 'xx',
            status: true,
            localName: 'new user' + i,
            unreadMessages: 0,
            image: '',
            lastMessageState: 0
        })
        i++;
    }
}

class ChannelView extends Component {
    render() {
        _fillDatabaseWithDummyChannels();
        agencyOrUser();
        return (
            <Example
                tabs={[
                    <GenericList
                        data={agencyList}
                        renderItemFunction={renderItems}
                        tabLabel="Agency"
                        key="1"
                    />,
                    <GenericList
                        data={usersList}
                        renderItemFunction={renderItems}
                        tabLabel="User"
                        key="2"
                    />]}
            />
        );
    }
}

export default ChannelView;