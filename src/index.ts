/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

import {
  AuthApiClient,
  ChatBuilder,
  KnownChatType,
  MentionContent,
  ReplyAttachment,
  ReplyContent,
  TalkClient
} from 'node-kakao';
import NeDatabase from 'nedb';
import {BotData} from './secret/BotData';
import {Bot} from "./util/Bot";
import {MainViewModel} from "./viewmodel/MainViewModel";
import {Message} from "./model/Message";

const vm = MainViewModel.instance()

vm.db = new NeDatabase({filename: 'src/database/user.json', autoload: true});
vm.db.persistence.setAutocompactionInterval(1000 * 60 * 10); // 10분마다 데이터베이스 정리

const client = new TalkClient();

client.on('chat_deleted', (feedChatlog, channel) => {
  if (!feedChatlog) return;
  const chatDataJson = JSON.parse(feedChatlog.text!);
  const logId = chatDataJson["logId"];

  console.log("logId: " + logId);

  vm.messages.forEach((value) => {
      // console.log("logId: " + logId);
      console.log("vm.messages: " + value.logId);
      // console.log(value.logId.toString() == logId.toString());
    }
  );

  // const message = Message.fromLogId(logId)!;
  // Bot.replyToChannel(channel, `${message.sender}님이 방금 삭제하신 메시지에요!\n\n ${message.text}`)
});

client.on('chat', async (data, channel) => {
  const sender = data.getSenderInfo(channel);
  if (!sender) return;

  if (channel.getDisplayName() != "성빈방") return;

  console.log("data.chat: " + data.chat.prevLogId)
  console.log("data.chat: " + data.chat.logId)
  console.log("data.chat: " + data.chat.text)
  console.log("data.chat: " + data.chat.messageId)
  vm.messages.push(Message.fromChat(data, channel));

  if (data.text === '!db압축') {
    vm.db.persistence.compactDatafile();
    Bot.replyToChannel(channel, 'DB 압축 완료');
  }

  if (data.text === 'ㅎㅇ') {
    channel.sendChat(
      new ChatBuilder()
        .append(new ReplyContent(data.chat))
        .append(new MentionContent(sender))
        .text('님, 안녕하세요!')
        .shout(true)
        .build(KnownChatType.REPLY)
    ).then();
  }

  if (data.text === '@everyone') {
    const builder = new ChatBuilder();
    for (const user of channel.getAllUserInfo()) {
      builder.append(new MentionContent(user)).text(' ')
    }
    channel.sendChat(builder.build(KnownChatType.TEXT)).then();
  }

  if (data.text === '!읽은사람') {
    if (data.originalType === KnownChatType.REPLY) {
      const reply = data.attachment<ReplyAttachment>();
      const logId = reply.src_logId;
      if (logId) {
        const readers = channel.getReaders({logId});
        channel.sendChat(
          `${readers.length}명이 읽었어요!\n\n${readers.map(reader => reader.nickname).join(', ')}`
        ).then();
      }
    } else {
      const logId = data.chat.prevLogId;
      if (logId) {
        const readers = channel.getReaders({logId});
        channel.sendChat(
          `${readers.length}명이 읽었어요!\n\n${readers.map(reader => reader.nickname).join(', ')}`
        ).then();
      }
    }
  }
});

const main = async () => {
  const api = await AuthApiClient.create(BotData.NAME, BotData.UUID);
  const loginRes = await api.login({
    email: BotData.EMAIL,
    password: BotData.PASSWORD,
    forced: true,
  });
  if (!loginRes.success) throw new Error(`Web login failed with status: ${loginRes.status}`);

  console.log(`Received access token: ${loginRes.result.accessToken}`);

  const res = await client.login(loginRes.result);
  if (!res.success) throw new Error(`Login failed with status: ${res.status}`);

  console.log('Login success');
};

main().then();