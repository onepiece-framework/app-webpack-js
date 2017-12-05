/**
 * app-webpack-js:/i18n.js
 *
 * @creation  2017-06-07
 * @version   1.0
 * @package   app-skeleton
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
//	...
(function(){
	//	...
	var serial = 0;
	var domain = $OP.URL.Domain();
	var path   = $OP.Path.Convert('app:/');
	var url    = "<?= Env::Get('google-cloud-translation') ? '1':'0' ?>" === "1"  ? 'app:' : '//onepiece-framework.com';
		url   += '/api/i18n/translate/';

	//	...
	$OP.i18n = {};

	//	...
	$OP.i18n.Translate = function( source, target, string, __callback ){
		if(!target){
			target = $OP.i18n.getLanguageCode();
		}

		//	...
		var post = {};
			post.source = source;
			post.target = target;
			post.string = string;

		//	...
		var xhr = $OP.Ajax(url, post, function(json){
			if( json.result && json.result.translate && json.result.translate.length ){
				__callback(json.result.translate[0]);
			}
		});

		//	...
		return xhr;
	}

	//	...
	$OP.i18n.Translation = function( target ){
		//	...
		serial++;

		//	...
		if(!target ){
			target = $OP.i18n.getLanguageCode();
		}

		//	...
		var bulk = {};
		var tags = document.querySelectorAll('[data-i18n="true"]');

		//	...
		for(var i=0; i<tags.length; i++){
			//	...
			var source = tags[i].dataset.lang;
			var string = tags[i].innerHTML;

			//	...
			if( source === target ){
				continue;
			}

			//	...
			tags[i].dataset.i18n   = false;
			tags[i].dataset.serial = serial +'-'+ i;
			tags[i].dataset.cursor = tags[i].style.cursor;
			tags[i].style.cursor   = 'progress';

			//	...
			if( typeof bulk[source] === "undefined" ){
				bulk[source] = [];
			}

			//	...
			bulk[source].push(string);
		}

		//	...
		var xhrs = [];

		//	...
		for(var source in bulk){
			var strings = bulk[source];
			var self = this;
			var post = {};
				post.times  = 1;
				post.serial = serial;
				post.source = source;
				post.target = target;
				post.strings= strings;
			var xhr = $OP.Ajax(url, post, function(json){
				//	...
				if(!json.result ){
					return;
				}

				//	...
				var serial = json.result.serial;
				var result = json.result.translate;

				//	...
				for(var i=0; i<result.length; i++){
					var temp = document.querySelector('[data-serial="'+serial+'-'+i+'"]');
					if( temp ){
						temp.innerHTML = result[i];
					}
				}

				//	...
				for(var i=0; i<tags.length; i++){
					//	...
					tags[i].style.cursor   = tags[i].dataset.cursor
				}
			});

			//	...
			xhrs.push(xhr);
		}

		//	...
		return xhrs;
	};

	//	...
	$OP.i18n.language = function(lang, __callback){
		//	...
		if(!lang ){
			lang = $OP.i18n.getLanguageCode();
		}

		//	...
		var list = localStorage.getItem('language-list-' + lang);
		var json = JSON.parse(list);
		if( json && json.length ){
			__callback(json);
			return;
		}

		//	...
		var url  = <?= Env::Get('google-cloud-translation') ? 1:0 ?> ? 'app:/api/i18n/language/':'https://onepiece-framework.com/api/i18n/language';
		var post = {};
			post.lang = lang;
		var xhr = $OP.Ajax(url, post, function(json){
			if( json.result && json.result.language ){
				var language = json.result.language;
				//	...
				__callback(language);

				//	...
				localStorage.setItem('language-list-' + lang, JSON.stringify(language));
			}
		});
	};

	//	...
	$OP.i18n.setLanguageCode = function(lang){
		localStorage.setItem('$OP.i18n.language.code', lang);
	};

	//	...
	$OP.i18n.getLanguageCode = function(){
		//	By URL Query.
		var lang = $OP.URL.Query.Get('lang');

		//	By Web Strage.
		if(!lang ){
			lang = localStorage.getItem('$OP.i18n.language.code');
		}

		//	By Browser.
		if(!lang ){
			lang = (navigator.browserLanguage || navigator.language || navigator.userLanguage);
		}

		//	...
		return lang;
	};

	//	...
	document.addEventListener('DOMContentLoaded', function(){
		$OP.i18n.Translation();
	});
})();
