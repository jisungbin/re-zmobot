/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

import {Fish} from "../fishing/Fish";
import {Item} from "./item/Item";

export class Rpg {
  inventory: Item[];
  catchFishs: Fish[];

  constructor(inventory: Item[], catchFishs: Fish[]) {
    this.inventory = inventory
    this.catchFishs = catchFishs
  }

  static createNew = () => new Rpg([], []);
}