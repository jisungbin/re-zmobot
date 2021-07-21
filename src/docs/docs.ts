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

/* --- 삭제된 메시지 전송 --- (검증됨)
client.on('chat_deleted', async (feedChatLog, channel) => {
  if (!feedChatLog) return;
  const chat = await channel.chatListStore.get(feedChatLog.logId)
  Bot.replyToChannel(channel, chat?.text ?? "삭제된 메시지를 읽어올 수 없음")
});

*/


/* --- 유저 업데이트 ---
let user = await User.fromId(sender.userId.toString());
console.log(user)

if (!user) {
    console.log('aa')
    const newUser = User.createNew(sender.userId.toString(), sender.nickname);
    Database.updateUser(newUser);
    user = newUser;
}*/