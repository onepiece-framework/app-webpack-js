
/** op-module-webpack:/js/op/fetch.js
 *
 * @created   2020-10-24
 * @version   1.0
 * @package   op-module-webpack
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */

/** Fetch
 * 
 * @created   2020-10-24
 * @param     url  is submit url.
 * @param     data is submit data object.
 * @param     type is GET, POST, FORM, JSON.
 * @returns   json is JSON object.
 */
const Fetch = async function (url='', data={}, type='GET') {
	//	Init
	var mime = null;
	var body = null;

	//	Convert type.
	if( type === '' ){
		type = (Object.keys(data).length === 0) ? 'GET': 'POST';
	}

	//	Switch
	switch( type = ToUpperCase(type) ){
		case 'GET':
			mime = 'text/plain';
			url += '?' + Object.keys(data).map((key)=>key+'='+encodeURIComponent(data[key])).join('&');
			break;

		case 'POST':
			mime = 'application/x-www-form-urlencoded; charset=utf-8';
			body = Object.keys(data).map((key)=>key+'='+encodeURIComponent(data[key])).join('&');
			break;

		case 'FORM':
			mime = 'multipart/form-data';
			body = Object.keys(data).reduce((o,key)=>(o.set(key, data[key]), o), new FormData());
			break;

		case 'JSON':
			mime = 'application/json';
			body = JSON.stringify(data);
			break;
		default:
			console.error('This type is unsupported. ('+type+')');
	}

	//	Default option is marked '*'.
	let temp = {
		method      :  type,         // *GET, POST, PUT, DELETE, etc.
		mode        : 'cors',        // no-cors, *cors, same-origin
		cache       : 'no-cache',    // *default, no-cache, reload, force-cache, only-if-cached
		credentials : 'same-origin', // include, *same-origin, omit
		headers     : {
			'Accept'       : 'application/json',
			'Content-Type' :  mime,
		},
		redirect       : 'follow',            //  manual, *follow, error
		referrerPolicy : 'no-referrer',       //  no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	}

	//	body
	if( body ){
		temp.body = body;
	}

	//	Execute.
	const response = await fetch(url, temp);

	//	Return JSON object.
	return response.json();
}
