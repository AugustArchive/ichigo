export const VERSION: string = require('../../package.json').version;
export enum OPCodes {
    HANDSHAKE,
    FRAME,
    CLOSE,
    PING,
    PONG
}
export enum RequestCommand {
    SET_ACTIVITY = 'SET_ACTIVITY'
}