import {AuthApiClient, ChatBuilder, KnownChatType, MentionContent, ReplyContent, TalkClient} from 'node-kakao';
import { Bot } from './secret/Bot';

const CLIENT = new TalkClient();

CLIENT.on('chat', (data, channel) => {
    const sender = data.getSenderInfo(channel);
    if (!sender) return;

    if (data.text === '안녕하세요') {
        channel.sendChat(
            new ChatBuilder()
                .append(new ReplyContent(data.chat))
                .text('안녕하세요 ')
                .append(new MentionContent(sender))
                .build(KnownChatType.REPLY)).then(r => {
                    console.log('aa')
        });
    }
});

async function main() {
    const api = await AuthApiClient.create(Bot.NAME, Bot.UUID);
    const loginRes = await api.login({
        email: Bot.EMAIL,
        password: Bot.PASSWORD,
        forced: true,
    });
    if (!loginRes.success) throw new Error(`Web login failed with status: ${loginRes.status}`);

    console.log(`Received access token: ${loginRes.result.accessToken}`);

    const res = await CLIENT.login(loginRes.result);
    if (!res.success) throw new Error(`Login failed with status: ${res.status}`);

    console.log('Login success');
}

main().then();