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

const vm = MainViewModel.instance()

vm.db = new NeDatabase({filename: 'src/database/user.json', autoload: true});
vm.db.persistence.setAutocompactionInterval(1000 * 60 * 10); // 10분마다 데이터베이스 정리

const client = new TalkClient();

client.on('chat', async (data, channel) => {
  const sender = data.getSenderInfo(channel);
  if (!sender) return;

  /*let user = await User.fromId(sender.userId.toString());
  console.log(user)

  if (!user) {
      console.log('aa')
      const newUser = User.createNew(sender.userId.toString(), sender.nickname);
      Database.updateUser(newUser);
      user = newUser;
  }*/

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