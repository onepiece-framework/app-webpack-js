/**
 * app-skeleton-3:/html/js/op/url.js
 *
 * @creation  2017-06-08
 * @version   1.0
 * @package   app-skeleton
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
//	...
if( typeof $OP.URL === "undefined" ){
	$OP.URL = {};
}

//	...
(function(){
	//	...
	var queries = {};
	var domain  = "<?php echo $_SERVER['SERVER_NAME'] ?>";

	//	...
	$OP.URL.Domain = function(){
		return domain;
	};

	//	...
	$OP.URL.Query = {};

	//	...
	$OP.URL.Query.Get = function(key, def){
		if( queries[key] ){
			return decodeURI(queries[key]);
		}else if( def === null ){
			//	Web storage
		}else{
			return def ? def: null;
		}
	};

	//	...
	$OP.URL.Query.Set = function(key, val, save){
		queries[key] = val
		window.history.pushState(null, null, __generate());

		//	...
		if( save ){
			//	Web storage
		}
	}

	//	...
	location.search.substr(1).split('&').map(function(v){
		m = v.match(/^([^=]+)(=)(.+)/);
		if( m ){
			var key = m[1];
			var val = m[3];
			queries[key] = val;
		}
	});

	//	...
	function __generate(){
		var url = '?';
		for(var key in queries ){
			var val =  queries[key];
			url += key+"="+val+'&';
		}
		return url.slice(0, -1);
	};
})();
