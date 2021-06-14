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
import {User} from "./model/user/User";
import {Database} from "./database/Database";
import {RpgResponse} from "./response/game/RpgResponse";
import {Bot} from "./util/Bot";
import {MainViewModel} from "./viewmodel/MainViewModel";

const vm = MainViewModel.instance()

vm.db = new NeDatabase({filename: 'src/database/user.json', autoload: true});
vm.db.persistence.setAutocompactionInterval(1000 * 60 * 10); // 10분마다 데이터베이스 정리

const client = new TalkClient();

// client.on('chat_deleted', (feedChatlog, channel) => {
//   const text = feedChatlog.text;
//   if (text) {
//     channel.sendChat(new ChatBuilder().text(text).build(KnownChatType.TEXT));
//   }
// });

client.on('chat', async (data, channel) => {
  const sender = data.getSenderInfo(channel);
  if (!sender) return;

  // (channel as TalkOpenChannel).session.request("WRITE", {
  //     chatId: channel.channelId,
  //     msgId: 1,
  //     type: 1,
  //     noSeen: true,
  //     msg: '1234',
  //     extra: JSON.stringify({
  //       "shout": true,
  //       "mentions": []
  //     })
  //   }
  // )

  let user = await User.fromId(sender.userId.toString());
  console.log(user)

  if (!user) {
    console.log('aa')
    const newUser = User.createNew(sender.userId.toString(), sender.nickname);
    Database.updateUser(newUser);
    user = newUser;
  }

  if (data.text === '!캐릭터재설정') {
    RpgResponse.resetCharacter(channel, user, sender);
  }

  if (data.text === '!캐릭터뽑기') {
    RpgResponse.getCharacter(channel, user, sender);
  }

  if (data.text === '!내정보') {
    RpgResponse.information(channel, user, sender)
  }

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
    );
  }

  if (data.text === '@everyone') {
    const builder = new ChatBuilder();
    for (const user of channel.getAllUserInfo()) {
      builder.append(new MentionContent(user)).text(' ')
    }
    channel.sendChat(builder.build(KnownChatType.TEXT));
  }

  if (data.text === '!읽은사람') {
    if (data.originalType === KnownChatType.REPLY) {
      const reply = data.attachment<ReplyAttachment>();
      const logId = reply.src_logId;
      if (logId) {
        const readers = channel.getReaders({logId});
        channel.sendChat(`${readers.length}명이 읽었어요!\n\n${readers.map(reader => reader.nickname).join(', ')}`);
      }
    } else {
      const logId = data.chat.prevLogId;
      if (logId) {
        const readers = channel.getReaders({logId});
        channel.sendChat(`${readers.length}명이 읽었어요!\n\n${readers.map(reader => reader.nickname).join(', ')}`);
      }
    }
  }
});

const main = async () => {
  const api = await AuthApiClient.create(BotData.Name, BotData.Uuid);
  const loginRes = await api.login({
    email: BotData.Email,
    password: BotData.Password,
    forced: true,
  });
  if (!loginRes.success) throw new Error(`Web login failed with status: ${loginRes.status}`);

  console.log(`Received access token: ${loginRes.result.accessToken}`);

  const res = await client.login(loginRes.result);
  if (!res.success) throw new Error(`Login failed with status: ${res.status}`);

  console.log('Login success');
};

main().then();