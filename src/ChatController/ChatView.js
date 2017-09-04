import React, {Component} from 'react';
import userService from '../LocalStorage/DAOs/userService';
import _ from 'lodash';
import Chat from '../Chat/Chat';

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



function messageListAdapter(channelSurrogateKey) {
    console.log('in message adapter', channelSurrogateKey);
    const localMessages = userService.findMessagesForChatPage(channelSurrogateKey, 0);
    console.log('local messages are', localMessages);
    const userOrAgencyStatus = userService.identifyType(channelSurrogateKey);
    const userId = userService.mapSurrogateId(channelSurrogateKey);
    const uiMessages = localMessages.map((message) => {
        return {
            _id: message.message_id,
            text: message.text,
            state: message.status,
            createdAt: message.createdAt,
            user: {
                _id: userOrAgencyStatus == message.chatMessageSenderType ? 1 : 2,
                name: userService.getChannelLocalName(channelSurrogateKey),
            },
        }
    })
    return uiMessages;
}

function _fillDummyMessages(channelSurrogate){
    let i = 2;
    let flag = false;
    while (i < 20) {
        console.log('To create message', i);
        userService.createMessage({
            message_id: i+1,
            channel_id: channelSurrogate,
            text: "hello message " + i,
            status: 3,
            createdAt: new Date(),
            chatMessageSenderType: flag
        });
        console.log("Message created", i);
        i++;
        flag = !flag;
    }
}

class ChatView extends Component {
    render() {
       // _fillDatabaseWithDummyChannels();
        //_fillDummyMessages(this.props.channelSurrogateKey);
        const userId = userService.mapSurrogateId(this.props.channelSurrogateKey);
        const localName = userService.getChannelLocalName(this.props.channelSurrogateKey);
        return (
            <Chat messages={messageListAdapter(this.props.channelSurrogateKey)}
                  onPressAvatar={(user) => {
                      console.log(user)
                  } }
                  onMessageSend={(message) => {
                      console.log(message)
                  } }
                  userID={userId}
                  userName='Ahmed'
                //rightColor='#AB47BC'
            />
        );
    }
}

export default ChatView;