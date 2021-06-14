/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

interface Array<T> {
  size: () => number; // todo: getter
  random: (count?: number) => any;
  isEmpty: () => boolean;
  isNotEmpty: () => boolean;
  contains: (element: any) => boolean;
}

Array.prototype.contains = function (element: any): boolean {
  return this.indexOf(element) !== -1;
}

Array.prototype.size = function (): number {
  return this.length;
}

Array.prototype.isEmpty = function (): boolean {
  return this.size() === 0;
}

Array.prototype.isNotEmpty = function (): boolean {
  return this.size() !== 0;
}

Array.prototype.random = function (count: number = 1): any {
  const results = new Array(count).fill('').map(() => this[Math.random() * this.length | 0]);
  if (results.length === 1) return results[0];
  return results;
}