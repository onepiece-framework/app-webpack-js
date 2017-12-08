/**
 * app-webpack-js:/args.js
 *
 * @creation  2017-07-31
 * @version   1.0
 * @package   app-skeleton
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
//	...
(function(){
	/** Generate arguments spans.
	 *
	 * @param  array
	 * @return DOM
	 */
	$OP.Args = function(values, is_notice){
		//	...
		var args = document.createElement('span');
			args.classList.add('args');

		//	...
		if( values ){
			for(var i=0; i<values.length; i++ ){
				var arg = document.createElement('span');
					arg.classList.add('arg');
					arg.appendChild( $OP.Arg(values[i], is_notice) );
				args.appendChild( arg );
			}
		}

		//	...
		return args;
	}

	/** Create each argument span.
	 *
	 * @param  mixed
	 * @return DOM
	 */
	$OP.Arg = function(val, is_notice){
		var span = document.createElement('span');
		var type = val === null ? 'null': typeof val;

		//	...
		span.classList.add('arg');
		span.classList.add(type);

		//	...
		if( type === 'string' ){
			//	...
			if( is_notice ){
				val = $OP.Path.Compress(val);
			}

			//	...
			span.innerHTML = __meta(val);

			//	...
		//	if( val.match(/^\s?\d+\s?$/) ){
			if( val.match(/^\d+$/) ){
				span.classList.add('quote');
			}

			//	...
			if( val === 'true' || val === 'false' || val === 'null' ){
				span.classList.add('quote');
			}
		}else{
			//	...
			if( type === 'null' ){
				val = 'null';
			}

			//	...
			if( type === 'boolean' ){
				span.classList.add( val ? 'true':'false' );
				val = val ? 'true':'false';
			}

			//	...
			span.innerText = val;
		}

		//	...
		return span;
	}

	/** Show meta character.
	 *
	 * @param  string
	 * @return string
	 */
	function __meta(s){
		return s.replace(/ /g,  '<span class="meta space">&nbsp;</span>')
				.replace(/\t/g, '<span class="meta tag">\\t</span>')
				.replace(/\r/g, '<span class="meta cr">\\r</span>')
				.replace(/\n/g, '<span class="meta lf">\\n</span>');
	}
})();
