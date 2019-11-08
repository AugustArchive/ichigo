# interface `ActivityOptions`
> An simple object of *what* should be in the `setActivity` function

## Example
```js
{
    state: 'In a game',
    details: 'Competive Match',
    instance: true,
    timestamps: {
        start: 
    },
    assets: {
        large_image: 'pionner',
        large_text: 'Playing as a Pionner',
        small_image: 'game_img',
        small_text: 'Playing Something'
    },
    party: {
        id: Engine.getId(),
        size: [3, 10]
    },
    secrets: {
        // taken from Discord's API Docs
        // https://discordapp.com/developers/docs/topics/gateway#activity-object
        join: '025ed05c71f639de8bfaa0d679d7c94b2fdce12f',
        spectate: 'e7eb30d2ee025ed05c71ea495f770b76454ee4e0',
        match: '4b2fdce12f639de8bfa7e3591b71a0d679d7c93f'
    }
}
```