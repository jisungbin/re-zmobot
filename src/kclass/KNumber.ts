/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

export class KNumber {
  private readonly number: number = 0;

  constructor(number: number) {
    this.number = number;
  }

  static from = (number: number) => new KNumber(number);

  get = () => this.number;

  toMoneyString = () => this.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '벨';
}