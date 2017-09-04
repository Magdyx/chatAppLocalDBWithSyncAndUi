import ChatDetails from '../List/src/Components/ChatDetails';
import GenericList from '../List/src/Components/GenericList';
import Example from '../List/src/Components/Tabs';
import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';
import userService from '../LocalStorage/DAOs/userService';
import {StackNavigator, NavigationActions} from 'react-navigation';
import {syncChannels} from '../LocalStorage/Sync';

let agencyList = [];
let  usersList = [];

function agencyOrUser() {
    agencyList = [];
    usersList = [];
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
    while (i < 1) {
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
    // while (i < 4) {
    //     userService.createChannel({
    //         channel_id: "x" + i,
    //         qr: 'xx',
    //         status: true,
    //         localName: 'new user' + i,
    //         unreadMessages: 0,
    //         image: '',
    //         lastMessageState: 0
    //     })
    //     i++;
    // }
}


class ChannelView extends Component {
   constructor(){
       super();
       this.state = {
            agencyList : [],
            usersList : []
       }
       this.shouldRefresh = this.shouldRefresh.bind(this);
   }

    componentDidMount() {
        setTimeout(()=>this.shouldRefresh(true),3000);

    }

    shouldRefresh(syncSuccess){
        console.log("shouldRefresh");

        if(syncSuccess) {
            userService.channelSurrogateKey = userService.findAllChannels().length+1 ;
            _fillDatabaseWithDummyChannels();
            agencyOrUser();
            this.forceUpdate();
            ToastAndroid.show('force update', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('Network error: couldn\'t sync with server', ToastAndroid.SHORT);
        }
    }

    render() {
       // _fillDatabaseWithDummyChannels();
        console.log("len ",userService.channelSurrogateKey);
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