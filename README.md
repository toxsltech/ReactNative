## Famebase

This project was bootstrapped with [Create React Native App](https://github.com/start-react/native-starter-kit).

## System Requirements

Globally installed node
Globally installed react-native CLI
Install CodePush globally and get keys for your app.

## Available Scripts

## npm start

Runs your app in development mode.
Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the --reset-cache flag to the start script:

npm start -- --reset-cache

# or

yarn start -- --reset-cache

## npm test

Runs the jest test runner on your tests.

## npm run ios

Like npm start, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

## Installation

(https://reactnative.dev/docs/environment-setup)

## Simulate for iOS

Method One

Open the project in XCode from ios/NativeStarterKit.xcodeproj
Hit the play button.

Method Two

Run the following command in your terminal
\$ react-native run-ios

## npm run android

Like npm start, but also attempts to open your app on a connected Android device or emulator.

## Simulate for Android

Make sure you have an Android emulator installed and running.
Run the following command in your terminal

\$ react-native run-android

## npm run eject

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.
Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an Xcode and/or Android Studio environment set up.

## Writing and Running Tests

This project is set up to use jest for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called **tests** or with the .test extension to have the files loaded by jest. See the the template project for an example test. The jest documentation is also a wonderful resource, as is the React Native testing tutorial.

## Environment Variables

Create React Native App, you can specify your own hostname via the REACT_NATIVE_PACKAGER_HOSTNAME environment variable:
Mac and Linux:

REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname' npm start
Windows:

set REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname'
npm start

## Release

For Android
make apk for android build
Run the command:
cd android/
cd ./gradlew assembleRelease(https://reactnative.dev/docs/signed-apk-android)

For Ios
In xcode ,build on Generic devices and archieve
Upload the both builds on diawi.com
(https://www.diawi.com/)

### Directory Structure

```
/fambase-node-1497-react-native/-/tree/reactnative_fambase/src  All app screens
/fambase-node-1497-react-native/-/tree/reactnative_fambase/docs      documentation

```

## Usage

Once setup is done you need to follow the final setup with the installer .

make sure you give READ/WRITE permission to your folder.

### Installation

> NOTE: Refer the [Installation](http://192.168.10.22/node/fambase-node-1497-react-native/-/blob/master/docs/installation.md) for details on all the security concerns and other important parameters of the project before its actual releasing.

### CheckList

> NOTE: Refer the [CheckList](http://192.168.10.22/node/fambase-node-1497-react-native/-/blob/master/docs/checklist.md) for details on all the security concerns and other important parameters of the project before its actual releasing.

### Coding Guidelines

> NOTE: Refer the [Coding Guidelines](http://192.168.10.22/node/fambase-node-1497-react-native/-/blob/master/docs/coding-guidelines.md) for details on all the security concerns and other important parameters of the project before its actual releasing.

## License
