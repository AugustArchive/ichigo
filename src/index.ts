import * as Constants from './util/Constants';
import Ichigo from './Ichigo';

/**
 * Returns the version of Ichigo
 */
export const version: string = Constants.VERSION;

/**
 * Constructs a new instance of Ichigo
 * @param clientID The client ID to use
 * @returns The new Ichigo instance
 */
function Instance(clientID: string) {
    return new Ichigo(clientID);
}

export default Instance;
module.exports = Instance;
export { Ichigo, Constants };