# Ichigo
> :love_letter: **| [Discord](https://discordapp.com) RPC client made in [TypeScript](https://typescriptlang.org), based on [discord-µrpc](https://github.com/rellfy/discord-urpc)**

## Example
```ts
import Ichigo, { TimestampBuilder } from '@augu/ichigo';
const rpc = new Ichigo('');

rpc.on('open', () => console.log('[Ichigo] Opened connection.'));
rpc.on('error', (error) => console.error('[Ichigo] Unknown error!', error));
rpc.on('ready', () => {
    console.log('[Ichigo] Ready!');
    rpc.setActivity(process.pid, {
        instance: false,
        state: 'State',
        details: 'Details',
        timestamps: new TimestampBuilder()
            .setStartTime(Date.getTime() / 1000)
            .parse()
    });
});

rpc.start();
```

## LICENSE
> **Ichigo** is released under the **MIT** License

```
Copyright (c) 2019 August

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
