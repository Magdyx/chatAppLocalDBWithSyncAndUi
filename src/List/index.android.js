import React from 'react';
import { AppRegistry, View } from 'react-native';
import ChatDetails from './src/Components/ChatDetails';
import TabViewExample from './src/Components/MultiTabs';
import GenericList from './src/Components/GenericList';
import GenericScrollView from './src/Components/GenericScrollView'
import Example from './src/Components/Tabs';

/**/
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
  return <ChatDetails key={item.userName} listItem={item} />;
}

function feedback(item) {
  console.log(item);
}
/*
const chatListProps = {
  numberOfTabs: 2,
  tabs: [{
    title: 'Agency',
    content: <GenericScrollView
    data={thelist}
    renderItemFunction={renderItems}
    />
  },
  {
    title: 'User',
    content: <GenericList
    data={secondList}
    renderItemFunction={renderItems}
    />
  }],
};
*/
const App = () => (
  <View style={{ flex: 1 }}>
    <Example
    tabs={[
      <GenericList
        data={thelist}
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

AppRegistry.registerComponent('albums', () => App);
