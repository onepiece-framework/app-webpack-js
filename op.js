/**
 * op-module-webpack:/js/op/op.js
 *
 * @created   2017-06-07
 * @version   1.0
 * @package   op-module-webpack
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */

/** Use strict mode.
 *
 */
"use strict";

/** OP
 *
 */
if( $OP === undefined ){
	var $OP = {};
}

/** Add trim function to String object.
 *
 */
if(!String.prototype.trim ){
	String.prototype.trim = function(){
		return this.replace(/^\s+|\s+$/g,'');
	};
};
