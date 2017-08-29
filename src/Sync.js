import { POST, GET } from './ApiCalls';
import userService from './DAOs/userService';
import channelModel from './Model/channelModel';
import _ from 'lodash';


function printChannels(channels){
    _.forEach(channels, function(channel) {
        console.log("channel", channel.channel_id, "unreadMessages" , channel.unreadMessages);
    })
}

function compareChannels(response) {


    const message = {
        channel_id: 1,
        message_id: 5,
        text: 'blabla'
    }
    userService.createMessage(message);
    const message1 = {
        channel_id: 1,
        message_id: 6,
        text: 'blabla'
    }
    userService.createMessage(message1);
    const message2 = {
        channel_id: 1,
        message_id: 7,
        text: 'blabl'
    }
    userService.createMessage(message2);


    console.log(response.data.openChannelsIDs);
    const localChannels = userService.findAllChannels();
    const remoteChannels = response.data.openChannelsIDs;
    let surrogate = localChannels.length;
    let count2 = 0;
    const localChannelsLength = localChannels.length;

    _.forEach(remoteChannels, function(channel){
        let count = 0;
        let found = false;
        let timeoutFlags = [];
        for(let counter = 0; counter < localChannelsLength; counter++) {
            timeoutFlags.push(false);
        };
        console.log(timeoutFlags);

        console.log("Channels Before" );
        printChannels(userService.findAllChannels());
        console.log("Messages Before" , userService.findAllMessages());

        console.log('count', count)

        for (; count < localChannelsLength; count++) {
            let localChannel = localChannels[count];
            if (channel.agencySessionId == localChannel.channel_id) {
                found = true;
                timeoutFlags[count] = true;
                let unreadMessages = null;
                console.log("from for");

                const localSeqNumber = userService.getSeqNumber(localChannel.surrogateKey);

                if(channel.seqNumber > localSeqNumber){
                    console.log("channel.seqNumber > localSeqNumber");
                    unreadMessages = channel.seqNumber - localSeqNumber;
                    userService.updateChannel(localChannel.surrogateKey, unreadMessages, channel.status, channel.state);
                    console.log("Channels After" , userService.findAllChannels());
                    printChannels(userService.findAllChannels());
                }
                break;
            }
        }

        if (!found) {
            const new_channel = {
                channel_id: channel.agencySessionId,
                qr: '',
                status: channel.status=='closed'?false:true,
                localName: 'new user',
                unreadMessages: channel.seqNumber,
                image: '', //TODO
                lastMessageState: channel.state
            }
            console.log('channel id ', channel.agencySessionId);
            userService.createChannel(new_channel);
            console.log('channel id created', channel.agencySessionId);
        }

        for(let counter=0;counter< localChannelsLength; counter++) {
            if(!timeoutFlags[counter]){
                userService.disableChannelStatus(localChannels[counter]);
            }
        }
    });

    // for(; count2 < remoteChannels.length; count2++) {
    //     const channel = remoteChannels[count2];
    //
    // }

}

function compareMessages(response, channel) {
    const remoteMessages = response.data.chatMessages;
    console.log('remote messages', remoteMessages);
    const localMessages = userService.findAllMessages();
    console.log('local messages', localMessages);
    userService.updateUnreadMessages(channel_id, remoteMessages.length); //TODO: rethink
    for(let count = 0; count < remoteMessages.length; count++) {
        const message = remoteMessages[count];
        const new_message = {
            message_id: message.messageSequence,
            channel_id: channel_id,
            text: message.messageontents,
            status: message.state,
            createdAt: message.messageTimestamp
        }
        userService.createMessage(new_message);
    }

}

function syncChannels() {
    const obj = {agencyDeviceToken : '123'};
    const URL = 'http://192.168.1.42:9998/onechat/openchannels';
    POST(obj, URL, compareChannels);
}

function syncMessages() {

    const obj = {
        senderID : "YIQ43TQ5RHG06F48W35new",
        fromMessageSequence : '3'
    };
    const URL = "http://192.168.1.42:9998/onechat/retrievemessages";
    const localChannels = userService.findAllChannels();
    for(let count = 0; count < localChannels.length; count++) {
        // let lastMessage = userService.getLastMessage(channelId);
        // const obj = { senderID : {localChannels[count].channel_id} };
        POST(obj,URL,(response)=>compareMessages(response,"YIQ43TQ5RHG06F48W35new"/*{localChannels[count].channel_id}"};
 */));
    }
}

function syncChannelMessages(channel) {
    let lastMessage = userService.getLastMessage(channel.surrogateKey);
    const obj = {
        senderID: channel.channel_id,
        fromMessageSequence: lastMessage
    };
    const URL = "http://192.168.1.42:9998/onechat/retrievemessages";
    const localChannel = userService.getChannel(channel.channel_id);
    // if(localChannel.length == 0) {
    //     syncChannels();
    // }
    POST(obj, URL, (response) => compareMessages(response, channel));

}

export { syncChannels, syncMessages };