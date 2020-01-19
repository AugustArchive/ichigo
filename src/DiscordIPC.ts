import { decode, encode } from './util/PacketUtil';
import { EventEmitter } from 'events';
import { OPCodes } from './util/Constants';
import { Socket } from 'net';
import { getIPC } from './util/IPCUtil';

/**
 * The IPC controller
 */
export default class DiscordIPC extends EventEmitter {
  /**
   * The client ID
   */
  public clientID: string;

  /**
   * The socket for handling the IPC events
   * 
   * **NOTE**: It returns `null` if it's not connected
   */
  public socket: Socket | null = null;

  constructor(clientID: string) {
    super();

    this.clientID = clientID;
  }

  /**
   * When the user disconnects
   */
  private onDisconnection(error: any) {
    this.emit('close', error);
  }

  /**
   * When an error occurs
   * @param error The error itself
   */
  private onError(error: any) {
    this.emit('error', error);
  }

  /**
   * Sends a packet
   * @param op The OPCode to send
   * @param data Any data to supply
   */
  send(op: number, data: { [x: string]: any }) {
    this.socket!.write(encode(op, data));
  }

  /**
   * Disconnects from the IPC server
   */
  disconnect() {
    if (!this.socket) {
      this.emit('wtf', 'No socket connection was defined');
      return;
    }

    this.send(OPCodes.CLOSE, {});
    this.socket!.end();
  }

  /**
   * Connects to the IPC server
   */
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

  /**
   * Emitted when the IPC server send a message to us!
   */
  on(event: 'message', listener: (data: any) => void): this;

  /**
   * Emitted when a weird error occured
   */
  on(event: 'error', listener: (error: any) => void): this;

  /**
   * Emitted when the server closed us
   */
  on(event: 'close', listener: (reason: any) => void): this;

  /**
   * Emitted when the server has opened
   */
  on(event: 'open', listener: () => void): this;

  /**
   * Emitted when Ichigo doesn't understand what happened
   */
  on(event: 'wtf', listener: (message: string) => void): this;
  on(event: string, listener: (...args: any[]) => void) {
    return super.on(event, listener);
  }
}