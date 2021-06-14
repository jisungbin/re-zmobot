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
import {Bot} from './secret/Bot';

const client = new TalkClient();

// client.on('chat_deleted', (feedChatlog, channel, feed) => {
//     const text = feedChatlog.text;
//     if (text != undefined) {
//         channel.sendChat(new ChatBuilder().text(feedChatlog.text!.toString()).build(KnownChatType.TEXT));
//     }
// });

client.on('chat', (data, channel) => {
  const sender = data.getSenderInfo(channel);
  if (!sender) return;

  // (channel as TalkOpenChannel).session.request("WRITE", {
  //         chatId: channel.channelId,
  //         msgId: 1,
  //         type: 1,
  //         noSeen: true,
  //         msg: '1234',
  //         extra: JSON.stringify({
  //             "shout": true,
  //             "mentions": []
  //         })
  //     }
  // )

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
  const api = await AuthApiClient.create(Bot.Name, Bot.Uuid);
  const loginRes = await api.login({
    email: Bot.Email,
    password: Bot.Password,
    forced: true,
  });
  if (!loginRes.success) throw new Error(`Web login failed with status: ${loginRes.status}`);

  console.log(`Received access token: ${loginRes.result.accessToken}`);

  const res = await client.login(loginRes.result);
  if (!res.success) throw new Error(`Login failed with status: ${res.status}`);

  console.log('Login success');
};

main().then();