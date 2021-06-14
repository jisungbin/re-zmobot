/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

export class KString {
  private readonly string: string = '';

  constructor(string: string) {
    this.string = string;
  }

  static from = (string: string) => new KString(string);

  get = () => this.string;

  contains = (search: string) => this.string.indexOf(search) !== -1;

  replaceAll = (originText: string, replacement: string) => KString.from(this.string.split(originText).join(replacement));

  isEmpty = () => this.string.length === 0;

  isBlank = () => this.replaceAll(' ', '').isEmpty();

  isNotEmpty = () => !this.isEmpty();

  isNotBlank = () => !this.isBlank();

  trimAllLine = () => KString.from(this.string.split('\n').map((string: string) => string.trim()).join('\n'));
}