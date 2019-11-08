import { getIPC, getIPCPath } from './util/IPCUtil';
import { decode, encode } from './util/PacketUtil';
import { EventEmitter } from 'events';
import { OPCodes } from './util/Constants';
import { Socket } from 'net';

export default class DiscordIPC extends EventEmitter {
    public clientID: string;
    public socket: Socket | null = null;

    constructor(clientID: string) {
        super();

        this.clientID = clientID;
    }

    onDisconnection(error: any) {
        this.emit('close', error);
    }

    onError(error: any) {
        this.emit('error', error);
    }

    send(op: number, data: { [x: string]: any }) {
        this.socket!.write(encode(op, data));
    }

    disconnect() {
        if (!this.socket) {
            this.emit('wtf', 'No socket connection was defined');
            return;
        }

        this.send(OPCodes.CLOSE, {});
        this.socket!.end();
    }

    async connect() {
        this.socket = await getIPC();

        this.emit('open');
        this.socket.write(encode(OPCodes.HANDSHAKE, {
            v: 1,
            client_id: this.clientID
        }));
        this.socket.pause();

        this.socket.on('readable', () => {
            decode(this.socket!, (result) => {
                switch (result.op) {
                    case 3: {
                        this.send(OPCodes.PONG, result.data);
                    } break;
                    case 1: {
                        this.emit('message', result.data);
                    } break;
                    case 2: {
                        this.emit('close', result.data);
                    } break;
                    default: break;
                }
            });
        });

        this.socket.on('close', this.onDisconnection.bind(this));
        this.socket.on('error', this.onError.bind(this));
    }

    on(event: 'message', listener: (data: any) => void): this;
    on(event: 'error', listener: (error: any) => void): this;
    on(event: 'close', listener: (error: any) => void): this;
    on(event: 'open', listener: () => void): this;
    on(event: 'wtf', listener: (msg: string) => void): this;
    on(event: string, listener: (...args: any[]) => void) {
        return super.on(event, listener);
    }
}