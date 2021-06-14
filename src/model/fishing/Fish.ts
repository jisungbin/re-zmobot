/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

import '../../util/extensions/String';

export class Fish {
  name: string;
  imageUrl: string;
  date: string;
  time: string;
  locate: string;
  size: string;
  money: string;

  // sendInformation = (channelId: string, description: string = `${this.name} 물고기 정보`) => {
  //     TemplateMessageUtil.sendFeedContent(
  //         channelId, description, Bot.SITE, Bot.NAME,
  //         this.toString().toTextDescFragment(description),
  //         undefined, [this.imageUrl.toImageFragment()]
  //     );
  // }

  constructor(name: string, imageUrl: string, date: string, time: string, locate: string, size: string, money: string) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.date = date;
    this.time = time;
    this.locate = locate;
    this.size = size;
    this.money = money;
  }

  toString = () => `
        이름: ${this.name}
        출현기간: ${this.date}
        출현시간: ${this.time}
        출현위치: ${this.locate}
        크기: ${this.size}
        가격: ${this.money}벨
    `.trimAllLine();
}