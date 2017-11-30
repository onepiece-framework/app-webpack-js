/**
 * app-skeleton-3:/html/js/op/path.js
 *
 * @creation  2017-10-05
 * @version   1.0
 * @package   app-skeleton
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */

/** Compress to meta path from real path.
 *
 * <pre>
 * $OP.Path.Compress('/www/localhost/app-foo/test1'); --> app:/test1
 * $OP.Path.Compress('/www/localhost/app-bar/test2'); --> app:/test2
 * $OP.Path.Compress('/www/localhost/hoge/hoge');     --> doc:/hoge/hoge
 * </pre>
 *
 * @creation  2017-06-07
 * @version   1.0
 * @package   app-skeleton
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
$OP.Path.Compress = function( path ){
	//	...
	if(!path){
		return '';
	}

	//	...
	for(var key in $OP.meta.path){
		var val =  $OP.meta.path[key];
		if( val === path.substr(0, val.length ) ){
			return key + ':/' + path.substr(val.length);
		}
	}
	//	...
	return path;
}

/** Convert to document-root-url from meta path.
 *
 * <pre>
 * Document root is "/www/localhost";
 * Application root is "/www/localhost/app-foo";
 *
 * $OP.Path.Convert('app:/test1'); --> /app-foo/test1
 * </pre>
 *
 * @creation  2017-06-07
 * @version   1.0
 * @package   app-skeleton
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
$OP.Path.Convert = function( path ){
	//	...
	var m = path.match(/^([\w]+):\/[^/]/);
	if( m && m.length && m[1] ){
		//	...
		var r = new RegExp('^'+m[1]+':/');
		path = path.replace(r, $OP.meta.path[m[1]]);

		//	...
		var r = new RegExp('^' + $OP.meta.path.doc);
		path = path.replace(r, '/');
	}

	//	...
	return path;
}
