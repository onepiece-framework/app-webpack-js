/**
 * app-webpack-js:/mark.js
 *
 * @creation  2017-07-28
 * @version   1.0
 * @package   app-skeleton
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
//	...
(function(){
	//	...
	$OP.Mark = function(div){
		var text = div.innerText;
		var json = JSON.parse(text);

		//	...
		var spans = {};
			spans.file = document.createElement('span');
			spans.line = document.createElement('span');
			spans.args = document.createElement('span');

			spans.file.innerText = json.file;
			spans.line.innerText = json.line;
			spans.args.appendChild( $OP.Args(json.args) );

			spans.file.classList.add('file');
			spans.line.classList.add('line');
			spans.args.classList.add('args');

		//	...
		div.innerText = '';
		div.appendChild(spans.file);
		div.appendChild(spans.line);
		div.appendChild(spans.args);

		/*
		//	...
		for(var i=0; i<json.args.length; i++){
			var type = json.args[i].type;
			var text = json.args[i].value;
			var span = document.createElement('span');

			//	...
			span.classList.add('arg');
			span.classList.add(type);

			//	...
			if( type === 'string' ){
				//	...
				span.innerHTML = show_meta_character(text);
			}else{
				//	...
				if( type === 'NULL' ){
					text = 'null';
				}

				if( type === 'boolean' ){
					span.classList.add( text ? 'true':'false' );
				}

				//	...
				span.innerText = text;
			}

			//	...
			spans.args.appendChild(span);
		}
		*/
	}

	//	...
	document.addEventListener('DOMContentLoaded', function(){
		var divs = document.querySelectorAll('div.OP_MARK');
		for(var i=0; i<divs.length; i++){
			$OP.Mark(divs[i]);
		}
	});
})();
