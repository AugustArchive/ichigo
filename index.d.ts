declare module '@augu/ichigo' {
  import { EventEmitter } from 'events';
  import { Collection } from '@augu/immutable';
  import { Socket } from 'net';

  namespace Ichigo {
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

    interface ExpectingMessage<T = any> {
      resolve(value?: T | PromiseLike<T>): void;
      reject(error?: any): void;
    }

    /**
     * Returns the version of Ichigo
     */
    export const version: string;

    /**
     * The IPC core used for Ichigo
     */
    class DiscordIPC extends EventEmitter {
      /**
       * Creates a new instance of the Discord IPC instance
       * @param clientID The client ID used to connect to
       */
      constructor(clientID: string);

      /**
       * The client ID used from the constructor
       */
      public clientID: string;

      /**
       * The socket used for sending/receiving packets
       */
      public socket: Socket | null;

      /**
       * Connects to the IPC server
       * @returns A promise for asynchronous stuff
       */
      public connect(): Promise<void>;

      /**
       * Emitted when the IPC server send a message to us!
       */
      public on(event: 'message', listener: (data: any) => void): this;

      /**
       * Emitted when a weird error occured
       */
      public on(event: 'error', listener: (error: any) => void): this;

      /**
       * Emitted when the server closed us
       */
      public on(event: 'close', listener: (reason: any) => void): this;

      /**
       * Emitted when the server has opened
       */
      public on(event: 'open', listener: () => void): this;

      /**
       * Emitted when Ichigo doesn't understand what happened
       */
      public on(event: 'wtf', listener: (message: string) => void): this;
    }

    /**
     * The instance used as an "controller" of the RPC connection
     */
    export class Client {
      /**
       * Creates a new instance of the Ichigo instance
       * @param clientID The client ID
       */
      constructor(clientID: string);

      /**
       * The IPC connection from us to Discord
       */
      public ipc: DiscordIPC;

      /**
       * All of the expecting messages will be here
       */
      public expecting: Collection<ExpectingMessage>;

      /**
       * If the client has connected or not
       */
      public connected: boolean;

      /**
       * Connects to the local IPC server
       */
      public connect(): void;

      /**
       * Sends a packet to Discord (if it's not a function already)
       * @param cmd The command name
       * @param args Any arguments to send
       */
      public send<T>(cmd: string, args: { [x: string]: any; }): Promise<T>;

      /**
       * Sets the activity of the RPC
       * @param activity The activity to set
       */
      public setActivity(activity: ActivityOptions): Promise<any>;

      /**
       * Emitted when the connection is opened
       */
      public on(event: 'ready', listener: (data: any) => void): this;

      /**
       * Emitted when we send any messages that act as
       * useful stuff, I have no idea
       */
      public on(event: 'debug', listener: (data: any) => void): this;

      /**
       * Emitted when a weird error occured
       */
      public on(event: 'error', listener: (error: any) => void): this;

      /**
       * Emitted when the server closed us
       */
      public on(event: 'close', listener: (reason: any) => void): this;

      /**
       * Emitted when the server has opened
       */
      public on(event: 'open', listener: () => void): this;

      /**
       * Emitted when Ichigo doesn't understand what happened
       */
      public on(event: 'wtf', listener: (message: string) => void): this;
    }

    export { Client as Ichigo };

    /**
     * The constants for Ichigo
     */
    export namespace Constants {
      /**
       * Semantic version of Ichigo
       */
      export const VERSION: string;

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
    }
  }

  export = Ichigo;
}