# Getting Started
> To get started, you must install `@augu/ichigo` on NPM

```sh
# Yarn
$ yarn add @augu/ichigo

# NPM
$ npm i @augu/ichigo
```

## Example RPC Test
```js
const { Ichigo } = require('@augu/ichigo');
const rpc = new Ichigo('xxxxxxx');

rpc.on('ready', () => {
    console.log('[Test] Test successful!');
    rpc.setActivity({
        state: 'uwu this is cool (bottom)',
        details: 'owo whats this (top)',
        timestamps: {
            start: new Date().getTime()
        },
        instance: false
    });
});

rpc.on('connect', () => console.log('[Test] Connection was established'));
rpc.on('debug', (m) => console.debug(m));
rpc.on('error', console.error);
rpc.on('close', console.error);
rpc.on('wtf', console.error);

rpc.connect();
```