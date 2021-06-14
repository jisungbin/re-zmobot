/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

import {ChannelUserInfo, TalkChannel} from "node-kakao";
import {User} from "../../model/user/User";
import {Collection} from "../../util/Collection";
import {CharacterData} from "../../model/rpg/character/CharacterData";
import {Character} from "../../model/rpg/character/Character";
import {Database} from "../../database/Database";
import {Bot} from "../../util/Bot";
import {KNumber} from "../../kclass/KNumber";

export class RpgResponse {

  static getCharacter = (channel: TalkChannel, user: User, sender: ChannelUserInfo) => {
    if (!user.character) {
      const character = (Collection.shuffle(CharacterData.parse())[0] as Character);
      const description = `${sender.nickname}님의 캐릭터`;
      user.character = character;
      Bot.replyToChannel(channel, `${description}\n\n${character.toString()}`);
      Database.updateUser(user);
    } else {
      Bot.replyToChannel(channel, `이미 ${sender.nickname}님은 캐릭터가 있어요.\n캐릭터를 확인하시려면 '!내정보'를 입력해 주세요.`);
    }
  }

  static resetCharacter = (channel: TalkChannel, user: User, sender: ChannelUserInfo) => {
    if (user.character) {
      if (user.money > 10000) {
        RpgResponse.getCharacter(channel, user, sender);
      } else {
        Bot.replyToChannel(
          channel,
          `캐릭터재설정에 필요한 돈이 부족해요 :(\n필요한 돈: 10,000벨 / 보유 돈: ${KNumber.from(user.money).toMoneyString()}`
        );
      }
    } else {
      Bot.replyToChannel(
        channel,
        `${sender.nickname}님은 캐릭터가 없어요!\n먼저 '!캐릭터뽑기'를 이용해서 캐릭터를 뽑아주세요 :)`
      );
    }
  }

  static information = (channel: TalkChannel, user: User, sender: ChannelUserInfo) => {
    if (!user.character) {
      return Bot.replyToChannel(channel, `${sender.nickname}님의 캐릭터가 없어요.\n먼저 '!캐릭터뽑기'를 이용해서 캐릭터를 뽑아주세요 :)`);
    }

    const description = `${sender.nickname}님의 정보`;

    const userInfoString = `
            돈: ${KNumber.from(user.money).toMoneyString()}
            레벨: ${user.level}
            아이디: ${user._id}
        `;

    const characterString = `
            이름: ${user.character.name}
            성별: ${user.character.gender}
            종류: ${user.character.kind}

            캐릭터 재설정은 '!캐릭터재설정' 입력!
            캐릭터 재설정 비용은 10,000벨 이에요.
        `;

    Bot.replyToChannel(channel, `${description}\n\n${userInfoString}\n${'-'.repeat(10)}\n${characterString}`);

    // TemplateMessageUtil.sendCarouselContent(
    //   channelId, description, Bot.SITE, 2,
    //   [userInfoString.toTextDescFragment('기본 정보'),
    //     characterString.toTextDescFragment('캐릭터 정보')],
    //   Collection.ofUndefineds(2),
    //   [undefined, [_user.character.imageUrl.toImageFragment()]],
    //   [new ProfileFragment(
    //     userInfo.Nickname.toTextDescFragment(),
    //     Bot.SITE.toUrlFragment(),
    //     userInfo.OriginalProfileImageURL.toImageFragment(),
    //     userInfo.OriginalProfileImageURL.toImageFragment()
    //   ), new ProfileFragment(
    //     userInfo.Nickname.toTextDescFragment(),
    //     Bot.SITE.toUrlFragment(),
    //     userInfo.OriginalProfileImageURL.toImageFragment(),
    //     userInfo.OriginalProfileImageURL.toImageFragment()
    //   )]
    // );
  }
}