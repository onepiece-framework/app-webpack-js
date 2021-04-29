
/** op-module-webpack:/js/op/ToLowerCase.js
 *
 * @created   2020-10-24
 * @version   1.0
 * @package   op-module-webpack
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */

/** Convert all string to lowercase.
 * 
 * @see       https://qiita.com/niusounds/items/fff91f3f236c31ca910f
 * @created   2020-10-24
 * @param     STRING
 * @returns   string
 */
const ToLowerCase = function(s){
	if ('i' === 'I'.toUpperCase()) {
		return s.toUpperCase();
	} else {
		return s.replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);});
	}
}
