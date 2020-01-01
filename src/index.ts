import * as Constants from './util/Constants';
import Ichigo from './Ichigo';

/**
 * Returns the version of Ichigo
 */
export const version: string = Constants.VERSION;

module.exports = Ichigo;
export default Ichigo;
export { Ichigo, Constants };