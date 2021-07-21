/*
 * © 2021 Ji Sungbin. all rights reserved.
 *
 * re-zmobot license is under the AGPL-3.0.
 * see full license: https://github.com/jisungbin/re-zmobot/blob/master/LICENSE
 */

import {AuthApiClient, TalkClient} from 'node-kakao';
import NeDatabase from 'nedb';
import {BotData} from './secret/BotData';
import {Bot} from "./util/Bot";
import {MainViewModel} from "./viewmodel/MainViewModel";

const vm = MainViewModel.instance()

vm.db = new NeDatabase({filename: 'src/database/user.json', autoload: true});
vm.db.persistence.setAutocompactionInterval(1000 * 60 * 10); // 10분마다 데이터베이스 정리

const client = new TalkClient();

client.on('chat', async (data, channel) => {
  const sender = data.getSenderInfo(channel);
  if (!sender) return;

  if (data.text === '!db압축') {
    vm.db.persistence.compactDatafile();
    Bot.replyToChannel(channel, 'DB 압축 완료');
  }
});

const main = async () => {
  const api = await AuthApiClient.create(BotData.NAME, BotData.UUID);
  const loginRes = await api.login({
    email: BotData.EMAIL,
    password: BotData.PASSWORD,
    forced: true,
  });
  if (!loginRes.success) throw new Error(`Web login failed with status: ${loginRes.status}`);

  console.log(`Received access token: ${loginRes.result.accessToken}`);

  const res = await client.login(loginRes.result);
  if (!res.success) throw new Error(`Login failed with status: ${res.status}`);

  console.log('Login success');
};

main().then();