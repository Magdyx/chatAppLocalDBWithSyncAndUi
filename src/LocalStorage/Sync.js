import {POST, GET} from '../ApiCalls';
import userService from './DAOs/userService';
import _ from 'lodash';


function printChannels(channels) {
    _.forEach(channels, function (channel) {
        console.log("channel", channel.channel_id, "unreadMessages", channel.unreadMessages);
    })
}
function syncChannels(shouldRefresh) {
    const obj = {agencyDeviceToken: '123'};
    const URL = 'http://192.168.1.26:9998/onechat/openchannels';
    POST(obj, URL, (response, flag)=>compareChannels(response, flag, shouldRefresh));
}

function compareChannels(response, flag, shouldRefresh) {
    let change = false;
    console.log("Hi");
    console.log("flag: ", flag);
    console.log(response);
    if(!flag) {
        shouldRefresh(true);
        return;
    }
    console.log("channels", response.data.openChannelsIDs);
    const localChannels = userService.findAllActiveChannels();
    const remoteChannels = response.data.openChannelsIDs;
    let surrogate = localChannels.length;
    let count2 = 0;
    const localChannelsLength = localChannels.length;

    _.forEach(remoteChannels, function (channel) {
        let found = false;
        let timeoutFlags = [];
        for (let counter = 0; counter < localChannelsLength; counter++) {
            timeoutFlags.push(false);
        }
        console.log("timeout flags", timeoutFlags);

        console.log("Channels Before");
        printChannels(userService.findAllChannels());
        // console.log("Messages Before" , userService.findAllMessages().slice()[17].message_id, " " ,userService.findAllMessages().slice()[17].status );
        for (let count = 0; count < localChannelsLength; count++) {
            let localChannel = localChannels[count];
            if (channel.agencySessionId == localChannel.channel_id) {
                    found = true;
                    timeoutFlags[count] = true;
                let unreadMessages = null;
                console.log("from for");

                const localSeqNumber = userService.getSeqNumber(localChannel.surrogateKey);

                if (channel.seqNumber > localSeqNumber || channel.status == "Closed") {
                    console.log("channel.seqNumber > localSeqNumber");
                    unreadMessages = channel.seqNumber - localSeqNumber;
                    userService.updateChannel(localChannel.surrogateKey, unreadMessages, channel.status, channel.state);
                    console.log("Channels After", userService.findAllChannels());
                    printChannels(userService.findAllChannels());
                    change = true;
                }
                break;
            }
        }

        if (!found) {
            const new_channel = {
                channel_id: channel.agencySessionId,
                qr: '',
                status: channel.status == 'closed' ? false : true,
                localName: 'new user',
                unreadMessages: channel.seqNumber,
                image: '', //TODO
                lastMessageState: channel.state

            }
            console.log('channel id ', channel.agencySessionId);
            userService.createChannel(new_channel);
            console.log('channel id created', channel.agencySessionId);
            change = true;
        }

        for (let counter = 0; counter < localChannelsLength; counter++) {
            if (!timeoutFlags[counter]) {
                userService.disableChannelStatus(localChannels[counter]);
                change = true;
            }
        }
    });

    if(change)
        shouldRefresh(true);

}

function syncMessages(channelSurrogate, unreadMessages, state) {
    if (unreadMessages == 0 && userService.getMessageStatus(channelSurrogate) == state) {
        console.log("hi from if: detected no unread messages or change in state => don't sync");
        return;
    }
    const URL = "http://192.168.1.26:9998/onechat/retrievemessages";
    const lastMessageIndex = userService.getlastUnread(channelSurrogate);
    const channel_id = userService.mapSurrogateId(channelSurrogate);
    const obj = {
        "senderID": "NxoPHSD1QP2LHfPqYvc6AA", /// TODO channel_id
        "fromMessageSequence": lastMessageIndex + ""
    }
    POST(obj, URL, (response) => {
        compareMessages(response, channelSurrogate, lastMessageIndex)
    });
    userService.update
}

/*

 */
function compareMessages(response, channelSurrogate, lastMessageIndex) {
    console.log("hello from compare messages");
    const remoteMessages = response.data.chatMessages;
    console.log("Messages Before", userService.findAllMessages().slice()[17].message_id, " ",
        userService.findAllMessages().slice()[17].status);
    console.log('remote messages', remoteMessages);
    const maxMessageSeq = userService.getSeqNumber(channelSurrogate);
    console.log("maxMessageSeq ", maxMessageSeq);
    for (let count = 0; count < remoteMessages.length; count++) {
        //get this message to update it's status
        if (remoteMessages[count].messageSequence <= maxMessageSeq && maxMessageSeq != 0) {
            console.log("here 2");
            //TODO
            //need to check for different status first
            userService.updateMessageStatus(remoteMessages[count].messageSequence, channelSurrogate,
                remoteMessages[count].state);
        }

        //Create this message if not found in local
        else {
            console.log("here 3");
            const message = remoteMessages[count];
            const new_message = {
                message_id: message.messageSequence,
                channel_id: channelSurrogate,
                text: message.messageontents,
                status: message.state,
                createdAt: message.messageTimestamp,
                chatMessageSenderType: (message.chatMessageSenderType == "CUSTOMER") ? true : false
            }
            const new_m = userService.createMessage(new_message);
            console.log("new message", new_m);
        }

    }
    userService.updateChannelUnreadMessages(channelSurrogate, 0);

}

/*
dummy function to test a standalone version of retrieve messages api call
 */
export function syncChannelMessages() {
    const obj = {"senderID": "NxoPHSD1QP2LHfPqYvc6AA", "fromMessageSequence": "1"};
    const URL = "http://192.168.1.26:9998/onechat/retrievemessages";
    // if(localChannel.length == 0) {
    //     syncChannels();
    // }
    POST(obj, URL, (response) => console.log('res', response.data.chatMessages));
}

export {syncChannels, syncMessages};