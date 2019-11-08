/**
 * Makes a random UUID for Discord
 * @credit [discordjs/RPC](https://github.com/discordjs/RPC/blob/master/src/util.js) (**MIT License**)
 * @returns The uuid for Discord as `nonce`
 */
export default () => {
    let uuid = '';
    for (let i = 0; i < 32; i += 1) {
        if (i === 8 || i === 12 || i === 16 || i === 20) uuid += '-';
        let n: number;
        if (i === 12) {
            n = 4;
        } else {
            const random = (Math.random() * 16) | 0;
            if (i === 16) {
                n = (random & 3) | 0;
            } else {
                n = random;
            }
        }

        uuid += n.toString();
    }

    return uuid;
};