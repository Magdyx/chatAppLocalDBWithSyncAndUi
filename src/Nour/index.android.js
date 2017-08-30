import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, Image, TouchableOpacity
} from 'react-native';
 import userService from './src/DAOs/userService';
 import { StackNavigator, NavigationActions } from 'react-navigation';

import ChatDetails from './src/List/ChatDetails';
import GenericList from './src/List/GenericList';
import Example from './src/List/Tabs';

//import Magdy from './src/CheckConnection/checkInternetConnection';
import { syncChannels, syncMessages } from './src/Sync';
import App from './src/Chat/App';

const usersList=[];
const agencyList=[];

function agencyOrUser() {
    const localChannels = userService.findAllChannels();
    for(let i=0;i< localChannels.length; i++){
      let adaptedChannel={
          userName: localChannels[i].localName,
          lastMessage: getDateFormat(localChannels[i].latestUpdateTimeStamp),
          numberOfUnreadMessages: localChannels[i].unreadMessages,
          onTouch: ()=>redirectToChannel(localChannels[i]),
          image: localChannels[i].image == ''? 'https://i.imgur.com/K3KJ3w4h.jpg': localChannels[i].image
      };
      if( localChannels[i].qr==''){
        agencyList.push(adaptedChannel);
      } else {
        usersList.push(adaptedChannel);
      }
    }
  }

function getDateFormat(time) {
  const days=["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
   let timeFormat = "";
    let today=new Date();
    today.setSeconds(0);
    today.setMilliseconds(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    let diff=today.getTime()-time.getTime();
    if(today.getTime() >= time.getTime()){
      timeFormat += "Today - ";
      timeFormat+= days[time.getDay()] +" ";
    }
    else if(diff <= (24 * 60 * 60 *1000)){
      timeFormat += "Yesterday - ";
      timeFormat+= days[time.getDay()] +" ";
    }
    else {
      timeFormat+= days[time.getDay()] +" ";
    }
    timeFormat+= time.getHours()+":";
    timeFormat+= time.getMinutes();
    if(time.getHours()>12)
    {
      timeFormat+="PM";
    }else {
      timeFormat+="AM";
    }
    return timeFormat;
}


function redirectToChannel(channel) {
        navigate('App');
    console.log('redirected to channel', channel.channel_id)
}

function renderItems(item) {
  return <ChatDetails key={item.userName} listItem={item} />;
}

function printResponse(response) {
    console.log(response.json());
}
function messageListAdapter(channelSurrogateKey) {
    console.log('in message adapter',);
}

function _fillDatabaseWithDummyChannels() {
    let i = 0;
    while(i < 20) {
        userService.createChannel({
            channel_id: "xjgj"+i,
            qr: '',
            status: true,
            localName: 'new user'+i,
            unreadMessages: 0,
            image: '',
            lastMessageState: 0
        })
        i++;
    }
    while(i < 40) {
        userService.createChannel({
            channel_id: "x"+i,
            qr: 'xx',
            status: true,
            localName: 'new user'+i,
            unreadMessages: 0,
            image: '',
            lastMessageState: 0
        })
        i++;
    }
}

//syncChannels();
//syncMessages();

class testRealm extends Component {
    constructor(props) {
        super(props);
        this.state = {realm: null};
    }

    render() {
      //_fillDatabaseWithDummyChannels();
        agencyOrUser();
        // const agencyListUI=agencyListAdapter();
        // const usersListUI=userListAdapter();
        return (
          <View style={{ flex: 1 }}>
              <View style={styles.headerStyle}>
                <Text style={{ fontSize: 25, color: '#ffff', paddingLeft: '2%' }} >
                  One Chat
                </Text>

                <TouchableOpacity
                  onPress={() => console.log('Search')}
                  style={{ position: 'absolute', right: 50 }}
                >
                  <Image source={require('./src/images/search.png')}  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => console.log('Menu')}
                  style={{ position: 'absolute', right: 20 }}
                >
                  <Image source={require('./src/images/more.png')} />
                </TouchableOpacity>
              </View>

              <View style={{ height: 1, width: '100%', backgroundColor: '#ffff' }} />

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

              <TouchableOpacity
                onPress={() => console.log('IMAGE')}
                style={{ position: 'absolute', bottom: 10, right: 10 }}
              >
              <Image
                source={require('./src/images/qr_code.png')}
              />
              </TouchableOpacity>
              </View>

        );
    }
}

const styles = {
  headerStyle: {
    height: '10%',
    width: '100%',
    backgroundColor: '#05aaea',
    alignItems: 'center',
    flexDirection: 'row'
  }
};

AppRegistry.registerComponent('testRealm', () => testRealm);
