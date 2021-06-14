/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

import '../../extensions/String'
import {Character} from '../rpg/character/Character';
import {Rpg} from '../rpg/Rpg';
import {MainViewModel} from "../../viewmodel/MainViewModel";

export class User {

  private static vm = MainViewModel.instance()

  _id: string;
  money: number;
  nickname: string;
  level: number;
  game: Rpg;
  character: Character | null;

  constructor(
    _id: string,
    money: number,
    nickname: string,
    level: number,
    game: Rpg,
    character: Character | null,
  ) {
    this._id = _id
    this.money = money
    this.nickname = nickname
    this.level = level
    this.game = game
    this.character = character
  }

  static createNew = (_id: string, nickname: string) => new User(_id, 0, nickname, 0, Rpg.createNew(), null);

  static fromId = async (id: string): Promise<any> => {
    const result = new Promise((resolve, reject) => {
      User.vm.userDb.findOne({_id: id}, (error: Error | null, user: User) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
    return await result;
  }
}