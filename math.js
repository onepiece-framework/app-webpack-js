/**
 * app-skeleton-3:/html/js/op/math.js
 *
 * @creation  2017-11-20
 * @version   1.0
 * @package   app-skeleton
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
//	...
if( typeof $OP.Math === "undefined" ){
	$OP.Math = {};
}

//	...
(function(){
	//	Return random integer number between min and max.
	$OP.Math.Random = function(min, max) {
		return Math.floor( Math.random() * (max - min + 1) ) + min;
	}
})();
