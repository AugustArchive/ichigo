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

/**
 * The relationship types
 */
export enum RelationshipTypes {
    /**
     * Not a friend nor blocked
     */
    NONE,

    /**
     * Is a friend
     */
    FRIEND,

    /**
     * Blocked from the user or you blocked
     */
    BLOCKED,

    /**
     * Pending Relationship (incoming)
     */
    PENDING_INCOMING,

    /**
     * Pending Relationship (outgoing)
     */
    PENDING_OUTGOING,

    /**
     * Unknown at this time
     */
    IMPLICIT
}