import Realm from 'realm';
import channelModelSchema from '../Model/channelModel';
import settingModel from '../Model/settingModel';
import chatMessageModel from '../Model/chatMessagesModel';

let repository = new Realm({
    schema: [channelModelSchema,
        chatMessageModel,
        settingModel
    ]
});


class userService {

    static messageSurrogateKey = 0;
    static channelSurrogateKey = 0;


    static getLastMessage(channelId) {
        return repository.objects('Messages').filtered('channel_id = $0', channelId).length;
    }

    static disableChannelStatus(channel) {
        repository.write(() => {
            repository.create('Channel', {channel_id: channel.channel_id, status: false}, true);
        })
    }

    static getSeqNumber(channel_id) {
        sortBy = ['message_id'];
        let channels = repository.objects('Messages').filtered(`channel_id = ${channel_id}`)
            .sorted(sortBy);
        if(channels.length === 0)
            return 0;
        else
         return channels[channels.length - 1].message_id;
    }

    static updateChannel(surrogateKey, unreadMessages, status, lastMessageState) {
        repository.write(() => {
            repository.create('Channel', {
                surrogateKey: surrogateKey,
                unreadMessages: unreadMessages,
                latestUpdateTimeStamp: new Date(),
                status: status == 'closed' ? false : true,
                lastMessageState: lastMessageState
            }, true);
        })
    }


    static getChannel(channelId) {
        const channel = repository.objects('Messages').filtered('channelId = $0', channelId);
        return channel;
    }

    static updateUnreadMessages(channelId, count) {
        repository.write(() => {
            const channel = repository.objects('Messages').filtered('channelId = $0', channelId);
            channel.unreadMessages = remoteMessages.length + channel.unreadMessages;
        });
    }


    static saveMessage(message) {
        repository.write(() => {
            repository.create('Message', message);
        });
    }


    static findToken() {
        return repository.objects('Setting').filtered('key = "FCM_token" ').slice();
    }

    static findAllChannels() {
        return repository.objects('Channel').slice();
    }

    static findAllMessages() {
        return repository.objects('Messages').slice();
    }

    static setMaxId(collectionMessage, collectionChannel) {
        userService.messageSurrogateKey = collectionMessage.length;
        userService.channelSurrogateKey = collectionChannel.length;
    }

    static findMessage(message) {
        console.log("Message surrogateKey= " + `${message.surrogateKey}`)
        return repository.objects('Messages').filtered(`surrogateKey = "${message.surrogateKey}"`).slice();
    }

    static createSetting(setting) {
        repository.write(() => {
            repository.create('Setting', setting);
        })
    }

    static createChannel(channel) {
        let newChannel;
        repository.write(() => {
            channel.surrogateKey = ++userService.channelSurrogateKey;
            channel.latestUpdateTimeStamp = new Date();
            channel.status = channel.status;
            channel.favourite = false;
            newChannel = repository.create('Channel', channel);

        });
        return newChannel;
    }

    static createMessage(message) {
        console.log("hmada: ", userService.messageSurrogateKey);
        let m;
        repository.write(() => {
            message.surrogateKey = ++userService.messageSurrogateKey;
            message.createdAt = new Date();
            message.creation_on_server = new Date();
            message.status = 0;
            m = repository.create('Messages', message);

        });
        return m;
    }

    static updateSetting(setting) {
        repository.write(() => {
            repository.create('Setting', {key: setting.key, value: setting.value}, true);
        });
    }

    static updateMessage(message) {
        repository.write(() => {
            repository.create('Messages', {
                surrogateKey: message.surrogateKey,
                status: message.status
            }, true);
        });
    }

    static update(channel, callback) {
        if (!callback) return;
        repository.write(() => {
            callback();
            channel.latestUpdateTimeStamp = new Date();
        });
    }
}

export default userService;
