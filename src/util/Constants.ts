/**
 * The version of the Component
 */
export const VERSION: string = require('../../package.json').version;

/**
 * The OPCodes
 */
export enum OPCodes {
    HANDSHAKE,
    FRAME,
    CLOSE,
    PING,
    PONG
}

/**
 * The commands to send to Discord
 */
export enum RequestCommand {
    SET_ACTIVITY = 'SET_ACTIVITY'
}