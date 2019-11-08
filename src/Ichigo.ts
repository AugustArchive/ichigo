import { OPCodes, RequestCommand } from './util/Constants';
import { EventEmitter } from 'events';
import DiscordIPC from './DiscordIPC';
import uuid from './util/UUID';

interface ActivityOptions {
    state?: string;
    details?: string;
    instance?: boolean;
    timestamps?: {
        start?: number;
        end?: number;
    }
    assets?: {
        large_image?: string;
        large_text?: string;
        small_image?: string;
        small_text?: string;
    }
    party?: {
        id?: any;
        size?: number[];
    }
    secrets?: {
        join?: string;
        spectate?: string;
        match?: string;
    }
}
export default class Ichigo extends EventEmitter {
    public ipc: DiscordIPC;

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

    connect() {
        this.ipc.connect();
        this.emit('connect');
    }

    send(cmd: string, args: { [x: string]: any }) {
        this.ipc.send(OPCodes.FRAME, {
            cmd,
            args,
            nonce: uuid()
        });
    }

    setActivity(activity: ActivityOptions) {
        return this.send(RequestCommand.SET_ACTIVITY, {
            pid: process.pid,
            activity
        });
    }

    _addExternalListeners() {
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
    on(event: string, listener: (...args: any[]) => void) {
        return super.on(event, listener);
    }
}