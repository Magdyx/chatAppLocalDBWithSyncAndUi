import { POST, GET } from './ApiCalls';
import userService from './DAOs/userService';
import channelModel from './Model/channelModel';

function compareChannels(response) {
    console.log(response.data.openChannelsIDs);
    const localChannels = userService.findAllChannels();
    const remoteChannels = response.data.openChannelsIDs;
    let surrogate = localChannels.length;
    let count2 = 0;
    for(; count2 < remoteChannels.length; count2++) {
        const channel = remoteChannels[count2];
        let count = 0;
        let found = false;
        for (; count < localChannels.length; count++) {
            let localChannelId = localChannels[count].channel_id;
            if (channel == localChannelId) {
                found = true;
                break;
            }
        }

        if (!found) {
            const new_channel = {
                surrogateKey: surrogate++,
                channel_id: channel,
                qr: '',
                status: 0,
                latestUpdateTimeStamp: new Date(),
                localName: 'string',
                favourite: 0,
                unreadMessages: 0
            }

            try {
                userService.saveChannel(new_channel);
            } catch(e){
                console.log(e);
            }

        }
    }

}

function compareMessages(response, channel_id) {
    console.log('remote messages');
    console.log(response.data.chatMessages);
    console.log('channel_id', channel_id);
    const remoteMessages = response.data.chatMessages;
    const localMessages = userService.getMessages();
    console.log('local');
    console.log(localMessages);

    userService.updateUnreadMessages(channel_id, remoteMessages.length);
    for(let count = 0; count < remoteMessages.length; count++) {
        const message = remoteMessages[count];
        const new_message = {
            message_id: message.messageSequence,
            channel_id: channel_id,
            text: message.messageontents,
            status: message.state,
            createdAt: message.messageTimestamp
        }
        userService.saveMessage(new_message);
    }
    //TODO: api call to update remote messages
}

function syncChannels() {
    const obj = {agencyDeviceToken : '455'};
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

export { syncChannels, syncMessages };