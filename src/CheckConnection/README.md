### Lost Internet Connection Warning message
##### Currently Just a log

1. add this line to your `AndroidManifest.xml` file
```
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```
2. installation of `react-native-message-bar` responsible for the shown message
```
npm install react-native-message-bar --save
```
