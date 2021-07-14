/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import { SOCKET_IO_SERVER } from './config';
import io from 'socket.io-client';
import Logger from './utils/logger';

const EVENT_JOIN_ROOM = 'join-room';
const EVENT_JOIN_ROOMS = 'user-join-rooms';
const EVENT_LEAVEJOIN_ROOMS = 'user-leave-rooms';
const EVENT_LEAVE_ROOM = 'leave-room';
const EVENT_LIST_LIVE_STREAM = 'list-live-stream';
const EVENT_BEGIN_LIVE_STREAM = 'begin-live-stream';
const EVENT_FINISH_LIVE_STREAM = 'finish-live-stream';
const EVENT_SEND_HEART = 'send-heart';
const EVENT_SEND_HEARTS = 'send-hearts';
const EVENT_SEND_MESSAGE = 'send-message';
const EVENT_PREPARE_LIVE_STREAM = 'prepare-live-stream';
const EVENT_SEND_REPLAY = 'replay';

//Fambase Message module

const EVENT_ONLINE = 'onlineStatus';
const EVENT_CONNECT = 'connectUser'
const EVENT_DISCONNECT = 'disconnectUser'
const EVENT_MESSAGE = 'sendMessage'
const EVENT_RECEIVE_MESSAGE = 'msgReceived'
const EVENT_HISTORY = 'chatDetails'
const EVENT_HISTORY_DETAIL = 'chatHistory'
const EVENT_LIST = 'chatList'
const EVENT_LISTS = 'chatLists'
const EVENT_TYPING = 'typing'
const EVENT_TYPING_STATUS = 'typingStatus'
const EVENT_SEEN = 'seen'
const EVENT_USER_ONLINE = 'userOnlineStatus'


class SocketManager {
  socket = null;

  constructor() {
    try {
      if (SocketManager.instance) {
        return SocketManager.instance;
      }
      SocketManager.instance = this;
      this.socket = io(SOCKET_IO_SERVER);
      this.setupListenDefaultEvents();
      return this;
    } catch (err) {
      alert(err)
    }
  }

  setupListenDefaultEvents() {
    this.socket.on('connect', () => {
      Logger.instance.log('connect');
    });
    this.socket.on('disconnect', () => {
      Logger.instance.log('disconnect');
    });
  }

  //
  // ──────────────────────────────────────────────────────────────── I ──────────
  //   :::::: L I S T E N   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  listenPrepareLiveStream(callback = () => null) {
    this.socket.on(EVENT_PREPARE_LIVE_STREAM, () => {
      Logger.instance.log(`${EVENT_PREPARE_LIVE_STREAM} :`);
      return callback();
    });
  }

  listenBeginLiveStream(callback = () => null) {
    this.socket.on(EVENT_BEGIN_LIVE_STREAM, (data) => {
      Logger.instance.log(`${EVENT_BEGIN_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }
  listenJoinLiveStream(callback = () => null) {
    this.socket.on(EVENT_JOIN_ROOMS, (data) => {
      Logger.instance.log(`${EVENT_JOIN_ROOMS} :`, data);
      return callback(data);
    });
  }
  listenLeaveLiveStream(callback = () => null) {
    this.socket.on(EVENT_LEAVEJOIN_ROOMS, (data) => {
      Logger.instance.log(`${EVENT_LEAVEJOIN_ROOMS} :`, data);
      return callback(data);
    });
  }
  listenFinishLiveStream(callback = () => null) {
    this.socket.on(EVENT_FINISH_LIVE_STREAM, (data) => {
      Logger.instance.log(`${EVENT_FINISH_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }

  listenListLiveStream(callback = () => null) {
    this.socket.on(EVENT_LIST_LIVE_STREAM, (data) => {
      Logger.instance.log(`${EVENT_LIST_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }

  listenSendHeart(callback = () => null) {
    this.socket.on(EVENT_SEND_HEARTS, (data) => {
      Logger.instance.log(`${EVENT_SEND_HEARTS} :`, data);
      return callback(data);
    });
  }

  listenSendMessage(callback = () => null) {
    this.socket.on(EVENT_SEND_MESSAGE, (data) => {
      Logger.instance.log(`${EVENT_SEND_MESSAGE} :`);
      return callback(data);
    });
  }

  listenReplay(callback = () => null) {
    this.socket.on(EVENT_SEND_REPLAY, (data) => {
      Logger.instance.log(`${EVENT_SEND_REPLAY} :`);
      return callback(data);
    });
  }

  //
  // ──────────────────────────────────────────────────────────── I ──────────
  //   :::::: E M I T   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  emitPrepareLiveStream({ userName, roomName }) {
    this.socket.emit(EVENT_PREPARE_LIVE_STREAM, { userName, roomName });
  }

  emitJoinRoom({ userId, roomName }) {
    this.socket.emit(EVENT_JOIN_ROOM, { userId, roomName });
  }
  emitJoinsRoom({ userId, roomName }) {
    this.socket.emit(EVENT_JOIN_ROOMS, { userId, roomName });
  }
  emitUserLeaveRoom({ userId, roomName }) {
    this.socket.emit(EVENT_LEAVEJOIN_ROOMS, { userId, roomName });
  }

  emitLeaveRoom({ userId, roomName }) {
    this.socket.emit(EVENT_LEAVE_ROOM, { userId, roomName });
  }

  emitBeginLiveStream({ userName, roomName }) {
    this.socket.emit(EVENT_BEGIN_LIVE_STREAM, { userName, roomName });
  }

  emitFinishLiveStream({ userName, roomName }) {
    this.socket.emit(EVENT_FINISH_LIVE_STREAM, { userName, roomName });
  }

  emitListLiveStream() {
    this.socket.emit(EVENT_LIST_LIVE_STREAM);
  }

  emitSendHeart({ roomName, userId }) {
    this.socket.emit(EVENT_SEND_HEART, { roomName, userId });
  }

  emitSendMessage({ roomName, userName, message }) {
    this.socket.emit(EVENT_SEND_MESSAGE, { roomName, userName, message });
  }

  emitReplay({ roomName, userName }) {
    this.socket.emit(EVENT_SEND_REPLAY, { roomName, userName });
  }


  //Fambase Message module

  listenOnlineStatus(callback = () => null) {
    this.socket.on(EVENT_ONLINE, (data) => {
      Logger.instance.log(`${EVENT_ONLINE} :`);
      return callback(data);
    });
  }
  listenMessages(callback = () => null) {
    this.socket.on(EVENT_RECEIVE_MESSAGE, (data) => {
      Logger.instance.log(`${EVENT_RECEIVE_MESSAGE} :`);
      return callback(data);
    });
  }
  listenMessagesHistory(callback = () => null) {
    this.socket.on(EVENT_HISTORY_DETAIL, (data) => {
      Logger.instance.log(`${EVENT_HISTORY_DETAIL} :`);
      return callback(data);
    });
  }
  listenChatLists(callback = () => null) {
    this.socket.on(EVENT_LISTS, (data) => {
      Logger.instance.log(`${EVENT_LISTS} :`);
      return callback(data);
    });
  }
  listenTyping(callback = () => null) {
    this.socket.on(EVENT_TYPING_STATUS, (data) => {
      Logger.instance.log(`${EVENT_TYPING_STATUS} :`);
      return callback(data);
    });
  }
  listenUserOnline(callback = () => null) {
    this.socket.on(EVENT_USER_ONLINE, (data) => {
      Logger.instance.log(`${EVENT_USER_ONLINE} :`);
      return callback(data);
    });
  }

  //
  // ──────────────────────────────────────────────────────────── I ──────────
  //   :::::: E M I T   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  emitConnect({ senderId }) {
    this.socket.emit(EVENT_CONNECT, { senderId });
  }
  emitDisconnect({ senderId }) {
    this.socket.emit(EVENT_DISCONNECT, { senderId });
  }
  emitOnlineStatus({ senderId }) {
    this.socket.emit(EVENT_ONLINE, { senderId });
  }
  emitMessages({ senderId, receiverId, type, message, file }) {
    this.socket.emit(EVENT_MESSAGE, { senderId, receiverId, type, message, file, });
  }
  emitMessagesHistory({ chatId, receiverId, }) {
    this.socket.emit(EVENT_HISTORY, { chatId, receiverId, });
  }
  emitChatLists({ senderId }) {
    this.socket.emit(EVENT_LIST, { senderId });
  }
  emitTyping({ senderId, receiverId, isTyping }) {
    this.socket.emit(EVENT_TYPING, { senderId, receiverId, isTyping });
  }
  emitSeen({ senderId, receiverId, chatId }) {
    this.socket.emit(EVENT_SEEN, { senderId, receiverId, chatId });
  }
  emitUserOnline({ senderId, receiverId }) {
    this.socket.emit(EVENT_USER_ONLINE, { senderId, receiverId });
  }
}

const instance = new SocketManager();
Object.freeze(instance);

export default SocketManager;
