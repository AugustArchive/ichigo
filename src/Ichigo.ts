import { OPCodes, RequestCommand } from './util/Constants';
import { EventEmitter } from 'events';
import DiscordIPC from './DiscordIPC';
import uuid from './util/UUID';

/**
 * The activity options to add to the RPC instance
 */
interface ActivityOptions {
    /**
     * The state of the RPC being used
     * 
     * **NOTE**: The state is on the bottom of the text
     */
    state?: string;

    /**
     * The details of the RPC being used
     * 
     * **NOTE**: The details is on the top of the text
     */
    details?: string;

    /**
     * If the RPC is an instance of something
     */
    instance?: boolean;

    /**
     * Timestamps object, to check on the `Elapsed`/`Ends At` text of the RPC
     */
    timestamps?: {
        /**
         * The start of the timestamp
         */
        start?: number;

        /**
         * The end of the timestamp
         */
        end?: number;
    }

    /**
     * Any assets to use when a user is using the RPC
     */
    assets?: {
        /**
         * The image key to use
         */
        large_image?: string;

        /**
         * The text when the large image is hovered
         */
        large_text?: string;

        /**
         * The small image key
         */
        small_image?: string;

        /**
         * The text when the small image key is hovered
         */
        small_text?: string;
       }

    /**
     * The party object, the ability to join/spectate on games
     */
    party?: {
        /**
         * The ID of the party
         */
        id?: any;

        /**
         * The size of the party
         */
        size?: number[];
    }

    /**
     * Any secret keys to use when a user joins/spectates/matches on a game
     */
    secrets?: {
        /**
         * The join key, when a user can join the game
         */
        join?: string;

        /**
         * The spectate key, when a user can spectate on a user during a match
         */
        spectate?: string;

        /**
         * The match key, when a user can join the other user's match
         */
        match?: string;
    }
}

/**
 * The client itself, used for "controlling" the RPC connection
 */
export default class Ichigo extends EventEmitter {
    /**
     * The IPC connection to control
     */
    public ipc: DiscordIPC;

    /**
     * Creates a new instance of the Ichigo client
     * @param clientID The client ID to use
     */
    constructor(clientID: string) {
        super();

        this.ipc = new DiscordIPC(clientID);
        this._addExternalListeners();

        this.ipc.on('message', (event) => {
            switch (event.evt) {
                case 'READY': {
                    this.emit('ready');
                } break;
                default: {
                    this.emit('debug', event);
                } break;
            }
        });
    }

    /**
     * Connects to the IPC server
     */
    connect() {
        this.ipc.connect();
    }

    /**
     * Sends a packet to Discord (if it's not a function already)
     * @param cmd The command name
     * @param args Any arguments to send 
     */
    send(cmd: string, args: { [x: string]: any }) {
        this.ipc.send(OPCodes.FRAME, {
            cmd,
            args,
            nonce: uuid()
        });
    }

    /**
     * Sets the activity of the RPC
     * @param activity The activity to set
     */
    setActivity(activity: ActivityOptions) {
        return this.send(RequestCommand.SET_ACTIVITY, {
            pid: process.pid,
            activity
        });
    }

    private _addExternalListeners() {
        this.ipc.on('close', (event) => {
            this.emit('debug', `Disconnected from Discord:\n${event}`);
            this.emit('close', event);
        });

        this.ipc.on('error', (event) => {
            this.emit('debug', event);
            this.emit('error', event);
        });

        this.ipc.on('open', () => {
            this.emit('debug', 'Opened a connection from Discord');
            this.emit('open');
        });

        this.ipc.on('wtf', (msg) => {
            this.emit('debug', msg);
            this.emit('wtf', msg);
        });
    }

    on(event: 'connect', listener: () => void): this;
    on(event: 'error', listener: (error: any) => void): this;
    on(event: 'close', listener: (error: any) => void): this;
    on(event: 'open', listener: () => void): this;
    on(event: 'wtf', listener: (m: string) => void): this;
    on(event: string, listener: (...args: any[]) => void) {
        return super.on(event, listener);
    }
}