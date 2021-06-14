/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

export class List<T> {
  private readonly array: T[] = [];

  constructor(array: T[]) {
    this.array = array;
  }

  static from = (array: any[]) => new List(array);

  get = () => this.array;

  contains = (element: T) => this.array.indexOf(element) !== -1;

  size = () => this.array.length;

  isEmpty = () => this.size() === 0;

  isNotEmpty = () => this.size() !== 0;

  random = (count: number = 1): T | T[] => {
    const results = new Array(count).fill('').map(() => this.array[Math.random() * this.size() | 0]);
    if (results.length === 1) return results[0];
    return results;
  }
}