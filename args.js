/**
 * app-skeleton-3:/html/js/op/args.js
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
	 * @param
	 * @return
	 */
	$OP.Args = function(json){
		var args = document.createElement('span');
			args.classList.add('args');
		if( json ){
			for(var i=0; i<json.length; i++ ){
				var arg = document.createElement('span');
					arg.classList.add('arg');
					arg.appendChild( __arg(json[i]) );
				args.appendChild( arg );
			}
		}
		return args;
	}

	/** Create each argument span.
	 *
	 * @param
	 * @return
	 */
	function __arg(val){
		var span = document.createElement('span');
		var type = val === null ? 'null': typeof val;

		//	...
		span.classList.add(type);

		//	...
		if( type === 'string' ){
			val = $OP.Path.Compress(val);
			val = show_meta_character(val);
			span.innerHTML = val;
		}else{
			//	...
			if( type === 'null' ){
				val = 'null';
			}

			//	...
			if( type === 'boolean' ){
				span.classList.add( val ? 'true':'false' );
			}

			//	...
			span.innerText = val;
		}

		//	...
		return span;
	}

	/** Show meta character.
	 *
	 */
	function show_meta_character(t){
		return	 t.replace(/ /g,  '<span class="meta space">&nbsp;</span>')
				.replace(/\t/g, '<span class="meta tag">\\t</span>')
				.replace(/\r/g, '<span class="meta lf">\\r</span>')
				.replace(/\n/g, '<span class="meta cr">\\n</span>');
	}
})();
