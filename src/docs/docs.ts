/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE.
 */

/* --- raw 보내기 ---
(channel as TalkOpenChannel).session.request("WRITE", {
    chatId: channel.channelId,
    msgId: 1,
    type: 1,
    noSeen: true,
    msg: '1234',
    extra: JSON.stringify({ // raw-content
      "shout": true,
      "mentions": []
    })
  }
)
*/

/* --- 삭제된 메시지 전송 ---
client.on('chat_deleted', (feedChatlog, channel) => {
  const text = feedChatlog.text;
  if (text) {
    channel.sendChat(new ChatBuilder().text(text).build(KnownChatType.TEXT));
  }
});
*/
