import { createConnection, Socket } from 'net';

/**
 * Gets the IPC path
 * @param id The ID of the ipc path
 */
export const getIPCPath = (id: number) => {
//* If the OS is Windows
  if (process.platform === 'win32') return `\\\\?\\pipe\\discord-ipc-${id}`;

  const prefix = (
    process.env.XDG_RUNTIME_DIR || 
    process.env.TMPDIR ||
    process.env.TEMP ||
    process.env.TMP ||
    '/tmp'
  );

  return `${prefix.replace(/\/$/, '')}/discord-ipc-${id}`;
};

/**
 * Gets the IPC path
 * @param id The ID
 */
export const getIPC = (id: number = 0) => new Promise<Socket>((resolve, reject) => {
  const path = getIPCPath(id);
  const onError = () => {
    if (id < 10) {
      resolve(getIPC(id + 1));
    } else {
      reject(new Error('Could not connect to IPC server'));
    }
  };

  const socket = createConnection(path, () => {
    socket.removeListener('error', onError);
    resolve(socket);
  });

  socket.once('error', onError);
});