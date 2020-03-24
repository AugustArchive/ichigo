# Ichigo
> :love_letter: **| [Discord](https://discordapp.com) RPC client made in [TypeScript](https://typescriptlang.org), based on [discord-µrpc](https://github.com/rellfy/discord-urpc)**
>
> [Documentation](https://auguwu.github.io/Ichigo) **|** [NPM](https://npmjs.com/package/@augu/ichigo)

## Example
```ts
import { Ichigo } from '@augu/ichigo';
const rpc = new Ichigo('');

rpc.on('open', () => console.log('[Ichigo] Opened connection.'));
rpc.on('error', (error) => console.error('[Ichigo] Unknown error!', error));
rpc.on('ready', () => {
    console.log('[Ichigo] Ready!');
    rpc.setActivity({
        instance: false,
        state: 'State',
        details: 'Details',
        timestamps: {
            start: new Date().getTime()
        }
    });
});

rpc.connect();
```

## LICENSE
**Ichigo** is released under the **MIT** License, view [here](/LICENSE) for more information.