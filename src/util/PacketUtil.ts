import { Socket } from 'net';

interface DecodeResult {
  op: number;
  data: any;
}

/**
 * Encodes the data as a `Buffer` from a `JSON` request
 * @param op The OPCode to set
 * @param data The data to buffer
 * @returns A buffer of the data
 */
export const encode = (op: number, data: any) => {
  const d = JSON.stringify(data);
  const length = Buffer.byteLength(d);
  const packet = Buffer.alloc(8 + length);

  packet.writeInt32LE(op, 0);
  packet.writeInt32LE(length, 4);
  packet.write(d, 8, length);
  return packet;
};

/**
 * Decodes raw data from the connected socket
 * @param socket The socket to decode the data
 * @param callback A returning callback
 * @returns Nothing
 */
export const decode = (socket: Socket, callback: (result: DecodeResult) => void) => {
  let working: { full: string; op: number | null; } = {
    full: '',
    op: null
  };

  const packet = socket.read();
  if (!packet) return;

  let op = working.op;
  let raw: any;
  if (working.full === '') {
    op = working.op = packet.readInt32LE(0);
    raw = packet.slice(8, packet.readInt32LE(4) + 8);
  } else {
    raw = packet.toString();
  }

  try {
    let data = JSON.parse(working.full + raw);
    callback({ op: op!, data });
    working.full = '';
    working.op = null;
  } catch {
    working.full += raw;
  }

  decode(socket, callback);
};