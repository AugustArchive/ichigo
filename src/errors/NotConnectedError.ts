export default class NotConnectedError extends Error {
  constructor() {
    super('RPC client has not been connected, did you call Client#connect?');

    Error.captureStackTrace(this, this.constructor);
    this.name = 'NotConnectedError';
  }
}