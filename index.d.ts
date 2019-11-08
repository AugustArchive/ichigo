declare module '@augu/ichigo' {
    import { EventEmitter } from 'events';
    import { Socket } from 'net';

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

    class DiscordIPC extends EventEmitter {
        constructor(clientID: string);

        public clientID: string;
        public socket: Socket | null;
        public connect(): Promise<void>;
        public on(event: 'message', listener: (data: any) => void): this;
        public on(event: 'error', listener: (error: any) => void): this;
        public on(event: 'close', listener: (error: any) => void): this;
        public on(event: 'open', listener: () => void): this;
        public on(event: 'wtf', listener: (msg: string) => void): this;
    }

    export const version: string;
    export class Ichigo {
        constructor(clientID: string);

        public ipc: DiscordIPC;
        public connect(): void;
        public send(cmd: string, args: { [x: string]: any }): void;
        public setActivity(activity: ActivityOptions): void;
        public on(event: 'connect', listener: () => void): this;
        public on(event: 'error', listener: (error: any) => void): this;
        public on(event: 'close', listener: (error: any) => void): this;
        public on(event: 'open', listener: () => void): this;
        public on(event: 'wtf', listener: (m: string) => void): this;
    }
}