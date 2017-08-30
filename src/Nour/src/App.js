import React, { Component } from 'react';
import { View } from 'react-native';
import { POST, GET } from './ApiCalls';

class App extends Component {

  printFunc(response , bool){
    console.log(response);
  }

  render() {
    let obj = {id:"0",Name:"Nour"};

    let URLpost='http://192.168.1.30:9998/onechat/loginagency';
    let URLget = 'http://192.168.1.68:3000/Data/0';

   POST(obj,URLpost,this.printFunc);
   GET( URLget, this.printFunc);
   //DELETE('HXzkr6DkQeqEsFDU7MztBw', URL, this.printFunc);

    return (
      <View/>
    );
  }
}

export default App;
