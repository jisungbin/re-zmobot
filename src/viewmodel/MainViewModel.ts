/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

import Nedb from "nedb";

export class MainViewModel {
  private static _instance = new MainViewModel();

  db!: Nedb;

  private constructor() {
  }

  static instance = (): MainViewModel => {
    return MainViewModel._instance;
  }
}