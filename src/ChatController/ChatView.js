import react, {Component} from 'react';
import userService from '../LocalStorage/DAOs/userService';
import _ from 'lodash';
import Chat from '../Chat/Chat';

function messageListAdapter(channelSurrogateKey) {
    console.log('in message adapter', channelSurrogateKey);
    const localMessages = userService.findUnsyncMessages(channelSurrogateKey, 0);
    console.log('local messages are', localMessages);
    const userOrAgencyStatus = userService.identifyType(channelSurrogateKey);
    const uiMessages = localMessages.map((message) => {
        return {
            _id: message.message_id,
            text: message.text,
            state: message.status,
            image: 'https://facebook.github.io/react/img/logo_og.png',
            createdAt: message.createdAt,
            user: {
                _id: userOrAgencyStatus==message.chatMessageSenderType?1:2,
                name: userService.getChannelLocalName(channelSurrogateKey),
            },
        }
    })
    return uiMessages;
}

class ChatView extends Component {

    state = {
        messages: [],
        loadEarlier: true,
        isLoadingEarlier: false,
    };

    componentDidMount() {
        setTimeout(()=> {
            this.setState({messages: messages});
        }, 5000);
    }

    onLoadEarlier() {
        this.setState({ isLoadingEarlier: true });
        let rest = [
            {
                _id: 12,
                text: 'Hello coder8',
                state: 1,
                createdAt: new Date(),
                user: {
                    _id: 4,
                    name: 'React Native',
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                },
            },
            {
                _id: 13,
                text: 'Hello coder9',
                state: 1,
                createdAt: new Date(),
                user: {
                    _id: 4,
                    name: 'React Native',
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                },
            },
            {
                _id: 8,
                text: 'Hello coder4',
                state: 1,
                createdAt: new Date(),
                user: {
                    _id: 4,
                    name: 'React Native',
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                },
            },
            {
                _id: 9,
                text: 'Hello coder5',
                state: 1,
                createdAt: new Date(),
                user: {
                    _id: 4,
                    name: 'React Native',
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                },
            },
            {
                _id: 10,
                text: 'Hello coder6',
                state: 1,
                createdAt: new Date(),
                user: {
                    _id: 4,
                    name: 'React Native',
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                },
            },
            {
                _id: 11,
                text: 'Hello coder7',
                state: 1,
                createdAt: new Date(),
                user: {
                    _id: 4,
                    name: 'React Native',
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                },
            },
        ];
        this.setState({ messages: this.state.messages.concat(rest),
            loadEarlier: false, isLoadingEarlier: false });
    }

    render() {
        <Chat messages={this.state.messages}
              loadEarlier={this.state.loadEarlier}
              onLoadEarlier={this.onLoadEarlier.bind(this)}
              isLoadingEarlier={this.state.isLoadingEarlier}
              onPressAvatar={(user) => {console.log(user)} }
              onMessageSend={(message) => { console.log(message)} }
              userID={1}
              userName='ahmed'
            //rightColor='#AB47BC'
        />
    }
}

export default ChatView;