# Ichigo
> The main class instance. Used to connect to the IPC server.

## Constructor
```js
new Ichigo(clientID);
```

## Functions
### Ichigo.send(cmd: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), args: [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)): void
> Sends a object to the IPC server

```js
Ichigo.send('SET_ACTIVITY', {
    pid: process.pid,
    activity: {}
});
```

### Ichigo.setActivity(activity: [ActivityOptions](../typedefs/ActivityOptions.md)): void
> Sets the activity (without using `Ichigo#send`)

```js
Ichigo.setActivity({});
```

### Ichigo.connect(): void
> Connects to the IPC server

```js
Ichigo.connect();
```

## Events
|Name|Description|Listener|
|---|---|---|
|`wtf`|Something that isn't supposed to occur|`(msg: string) => void`|
|`open`|Sends when the connection has opened|`() => void`|
|`close`|Sends when the connection has closed|`(error?: any) => void`|
|`error`|Sends when an error occured|`(error: any) => void`|
|`connect`|Sends when a connection has been established by the socket|`() => void`|
