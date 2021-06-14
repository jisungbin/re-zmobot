/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

import {ItemType} from "./ItemType";

export class Item {
  type: ItemType;
  name: string;
  money: number;

  constructor(type: ItemType, name: string, money: number) {
    this.type = type
    this.name = name
    this.money = money
  }
}