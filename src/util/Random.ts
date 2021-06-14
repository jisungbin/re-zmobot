/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

import {List} from "../kclass/List";

export class Random {
  static nextBoolean = () => List.from([true, false]).random() as boolean;
  static nextInt = (min: number, max: number) => Math.floor(Math.random() * (++max - min) + min);
}