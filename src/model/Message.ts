/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE.
 */

import {Long, TalkChannel, TalkChatData} from "node-kakao";
import {MainViewModel} from "../viewmodel/MainViewModel";

export class Message {

  private static vm = MainViewModel.instance()

  logId: Long;
  text: string;
  sender: string;

  static fromLogId = (logId: Long): Message => {
    return Message.vm.messages.filter((message) => message.logId.toString() == logId.toString())[0];
  }

  static fromChat = (chat: TalkChatData, channel: TalkChannel): Message => {
    const sender = chat.getSenderInfo(channel)!;
    return new Message(chat.chat.logId, chat.text, sender.nickname);
  }

  constructor(logId: Long, text: string, sender: string) {
    this.logId = logId;
    this.text = text;
    this.sender = sender;
  }
}