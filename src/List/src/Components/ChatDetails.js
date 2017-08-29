import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';


const ChatDetails = ({ listItem }) => {
  let {
    lastMessage = '',
    userName = 'User',
    image = 'https://pbs.twimg.com/profile_images/601806103748292608/ZNJrNntN.jpg',
    numberOfUnreadMessages = 0,
    onTouch
  } = listItem;
  const { headerTextStyle, thumbnailContainerStyle,
    thumbnailStyle, containerStyle, numberOfUnreadMessagesStyle } = styles;

  const renderCircle = () => {
    if (numberOfUnreadMessages !== 0) {
      if (numberOfUnreadMessages < 9) {
        return (
          <View style={numberOfUnreadMessagesStyle}>
            <Text style={{ color: 'white', fontSize: 10, left: 4.5 }}>
              { numberOfUnreadMessages }
            </Text>
          </View>
        );
      }
      return (
        <View style={numberOfUnreadMessagesStyle}>
          <Text style={{ color: 'white', fontSize: 10, left: 2.7 }}>
            9+
          </Text>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity onPress={() => { onTouch(userName); numberOfUnreadMessages = 0; }} >
    <Card>
        <CardSection>
          <View style={thumbnailContainerStyle}>
            <Image
            source={{ uri: image }}
            style={thumbnailStyle}
            />
          </View>
          <View style={containerStyle}>
            <Text style={headerTextStyle}>{userName}</Text>
            <Text>{lastMessage}</Text>
          </View>
        </CardSection>
          {renderCircle()}
    </Card>
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
    borderRadius: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  headerTextStyle: {
    fontSize: 18
  },
  numberOfUnreadMessagesStyle: {
    position: 'relative',
    backgroundColor: 'red',
    height: 15,
    width: 15,
    top: -55,
    left: 45,
    borderRadius: 10
  }
};

export default ChatDetails;
