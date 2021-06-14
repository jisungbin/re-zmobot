/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

import {User} from "../model/user/User";
import {MainViewModel} from "../viewmodel/MainViewModel";

export class Database {

  private static vm = MainViewModel.instance()

  static updateUser = (user: User) => {
    console.log(user.nickname)
    console.log('aa')
    Database.vm.db.update({_id: user._id}, user, {upsert: true},
      async (error: Error | null, _numberOfUpdated: number, _upsert: boolean) => {
        if (error) console.log(error.message);
      });
  }

  static plusMoney = (user: User, money: number) => {
    const newUser = user;
    newUser.money += money;
    Database.updateUser(newUser);
  }

  static minusMoney = (user: User, money: number) => {
    const newUser = user;
    newUser.money -= money;
    Database.updateUser(newUser);
  }

}