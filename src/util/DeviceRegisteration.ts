import {AuthApiClient, KnownAuthStatusCode} from 'node-kakao';
import * as readline from 'readline';
import {BotData} from "../secret/BotData";

// https://github.com/storycraft/node-kakao/blob/stable/examples/device-registration.ts
const main = async () => {
  const form = {
    email: BotData.EMAIL,
    password: BotData.PASSWORD,
    forced: true,
  };

  const api = await AuthApiClient.create(BotData.NAME, BotData.UUID);
  const loginRes = await api.login(form);
  if (loginRes.success) throw new Error('Device already registered!');
  if (loginRes.status !== KnownAuthStatusCode.DEVICE_NOT_REGISTERED) {
    throw new Error(`Web login failed with status: ${loginRes.status}`);
  }

  const passcodeRes = await api.requestPasscode(form);
  if (!passcodeRes.success) throw new Error(`Passcode request failed with status: ${passcodeRes.status}`);

  const inputInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const passcode = await new Promise<string>((resolve) => inputInterface.question('Enter passcode: ', resolve));
  inputInterface.close();

  const registerRes = await api.registerDevice(form, passcode, true);
  if (!registerRes.success) throw new Error(`Device registration failed with status: ${registerRes.status}`);

  console.log(`Device ${BotData.UUID} has been registered`);

  const loginAfterRes = await api.login(form);
  if (!loginAfterRes.success) throw new Error(`Web login failed with status: ${loginAfterRes.status}`);
  console.log(`Client logon successfully`);
};
main().then();