/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

interface String {
  replaceAll: (originText: string, replacement: string) => string;
  trimAllLine: () => string;
  isEmpty: () => boolean;
  isBlank: () => boolean;
  isNotEmpty: () => boolean;
  isNotBlank: () => boolean;
  contains: (string: string) => boolean;
}

String.prototype.contains = function (string: string): boolean {
  return this.indexOf(string) !== -1;
}

String.prototype.replaceAll = function (originText: string, replacement: string): string {
  return this.split(originText).join(replacement);
}

String.prototype.isEmpty = function (): boolean {
  return this.length === 0;
}

String.prototype.isBlank = function (): boolean {
  const cache = this.replaceAll(' ', '');
  return cache.isEmpty();
}

String.prototype.isNotEmpty = function (): boolean {
  return !this.isEmpty();
}

String.prototype.isNotBlank = function (): boolean {
  return !this.isBlank();
}

String.prototype.trimAllLine = function (): string {
  return this.split('\n').map((string: string) => string.trim()).join('\n');
}