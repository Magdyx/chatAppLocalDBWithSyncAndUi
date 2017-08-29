import React, {Component} from 'react';
import {Text, View, NetInfo} from 'react-native';

var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class Magdy extends Component {

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        // Remove the alert located on this master page from the manager
        MessageBarManager.unregisterMessageBar();
    }

    renderNoConnectionMessage() {
        this.checkConnection();
    }

    checkConnection(){
        NetInfo.fetch().done((reach) => { console.log('Initial: ' + reach); });

        NetInfo.addEventListener( 'change', this.handleFirstConnectivityChange);
    }

    handleFirstConnectivityChange(reach) {
        console.log('First change: ' + reach);
        MessageBarManager.showAlert({
            title: 'Your alert title goes here',
            message: 'Your alert message goes here',
            alertType: 'warning',
            // See Properties section for full customization
            // Or check `index.ios.js` or `index.android.js` for a complete example
        });
        NetInfo.removeEventListener('change', this.handleFirstConnectivityChange );
    }

    render() {
        this.renderNoConnectionMessage();
        return(
            <View>
                <Text>
                    hello world
                </Text>
                <MessageBarAlert ref="alert" />
            </View>
        );
    }
}

export default Magdy;