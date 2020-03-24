/**
 * The version of the Component
 */
export const VERSION: string = require('../../package.json').version;

/**
 * The OPCodes for the Socket from Discord
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
  /**
   * Sets the activity for Discord
   */
  SetActivity = 'SET_ACTIVITY'
}