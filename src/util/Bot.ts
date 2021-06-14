/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

import {ChatBuilder, KnownChatType, TalkChannel} from "node-kakao";
import {KString} from "../kclass/KString";

export class Bot {
  static replyToChannel = (channel: TalkChannel, text: string) => {
    channel.sendChat(
      new ChatBuilder()
        .text(KString.from(text).trimAllLine().get())
        .build(KnownChatType.TEXT)
    );
  }
}