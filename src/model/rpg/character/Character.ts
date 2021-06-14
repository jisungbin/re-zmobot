/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

import {CharacterType} from "./CharacterType";
import '../../util/extensions/String';

export class Character {
  name: string;
  gender: CharacterType;
  kind: CharacterType;
  imageUrl: string;

  constructor(
    name: string,
    gender: CharacterType,
    kind: CharacterType,
    imageUrl: string
  ) {
    this.name = name
    this.gender = gender
    this.kind = kind
    this.imageUrl = imageUrl
  }

  toString = () => `
        이름: ${this.name}
        성별: ${this.gender}
        종류: ${this.kind}
    `.trimAllLine();
}