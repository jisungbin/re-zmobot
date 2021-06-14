/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

interface Number {
  toMoneyString: () => string;
}

Number.prototype.toMoneyString = function (): string {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '벨';
}