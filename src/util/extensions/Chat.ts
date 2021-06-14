/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

const showAll = '\u200b'.repeat(500) + '\n\n';

// todo

// Chat.prototype.reply = function (message: any) {
//     (this as Chat).replyText((message + '').trimAllLine());
// }
//
// Chat.prototype.shout = function (message: any) {
//     const _chat = this as Chat;
//     const res = new PacketMessageWriteReq(
//         BaseKClass.vm.client.ChatManager.getNextMessageId(),
//         _chat.Channel.Id, (message + '').trimAllLine(), ChatType.Text, true, JSON.stringify({ 'shout': true })
//     );
//     // _chat.Channel.getUserInfo(BaseKClass.vm.client.ClientUser).Client.UserManager. TODO: MemberStruct 구해서 type 4이면 전송
//     BaseKClass.vm.client.NetworkManager.requestPacketRes(res);
// }
//
// Chat.prototype.replyLongText = async function sendLongText(message: string, message2: string) {
//     const _chat = (this as Chat);
//     if (_chat.Channel.isOpenChat()) {
//         const longTextAttachment = await LongTextAttachment.fromText(message2, 'file');
//         BaseKClass.vm.client.ChannelManager.get(_chat.Channel.Id)
//             .sendTemplate(new AttachmentTemplate(longTextAttachment, message));
//     } else {
//         _chat.replyText(message + showAll + message2);
//     }
// }