/**
 * app-skeleton-3:/html/js/op/ajax.js
 *
 * @creation  2017-06-07
 * @version   1.0
 * @package   app-skeleton
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
//	...
(function(){
$OP.Ajax = function(url, data, __success, __failure){
	//	...
	if(!url){
		D("URL is empty.");
		return;
	}

	//	...
	url = $OP.Path.Convert(url);

	//	...
	var xhr = new XMLHttpRequest();
	if(!xhr){
		console.log("XMLHttpRequest was failed.");
		return;
	}

	//	...
	xhr.onreadystatechange = function(){
		/**
		 * 0 = uninitialized
		 * 1 = loading
		 * 2 = loaded
		 * 3 = interactive
		 * 4 = complete
		 */
		var state  = this.readyState;

		/**
		 * 200	OK
		 * 401	Unauthorized
		 * 403	Forbidden
		 * 404	Not Found
		 * 500	Internal Server Error
		 */
		var status = this.status;

		//	...
		if( state === 4 ){
			if( status === 200 ){
				var type = xhr.getResponseHeader('content-type');
				var text = this.responseText;

				//	...
				if( type.substr(0, 9) === 'text/json' ){
					//	...
					var json = text = JSON.parse(text);

					//	...
					if( json.errors || json.notice ){
						console.error('Error', json.uri);
						console.log(json);
					}

					//	...
					if( json.errors ){
						for(var i=0; i<json.errors.length; i++){
							console.info(json.errors[i]);
						}
					}

					//	...
					if( json.notice ){
						for(var i=0; i<json.notice.length; i++){
							console.info(json.notice[i]);
						}
					}
				}

				//	...
				if( __success ){
					__success(text);
				}
			}else{
				//	...
				if( __failure ){
					__failure(status);
				}
			}
		}
	};

	//	...
	var post = data === null ? null: $OP.GenerateUrlQuery(data);

	//	...
	var method = post ? 'POST':'GET';

	//	...
	xhr.open(method, url, true);
	if( method === 'POST' ){
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	}
	xhr.send(post);
//	xhr.abort();

	//	...
	return xhr;
};

/** Generate URL Query.
 *
 */
$OP.GenerateUrlQuery = function GenerateUrlQuery(data){
	var join = [];
	for(var key in data){
		var val =  data[key];
			key =  encodeURIComponent(key);
		switch( typeof val ){
			case 'string':
				val = encodeURIComponent(val);
				break;

			case 'object':
				for(var tmp in val){
					tmp = encodeURIComponent(tmp);

					//	...
					join.push(key+'['+tmp+']' +'='+ encodeURIComponent(val[tmp]));
				}
				continue;

			default:
		}

		//	...
		join.push(key +'='+ val);
	}
	return join.join('&').replace( /%20/g, '+' );
}
})();