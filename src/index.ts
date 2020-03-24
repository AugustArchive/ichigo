import * as Constants from './util/Constants';
import Ichigo from './Ichigo';

/**
 * Returns the version of Ichigo
 */
export const version: string = Constants.VERSION;
export { Constants, Ichigo };
export default Ichigo;
module.exports = Ichigo; // TODO: Remove this when it becomes outdated