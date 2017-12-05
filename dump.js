/**
 * app-webpack-js:/dump.js
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
	$OP.Dump = function(div){
		var json = JSON.parse(div.innerText);
		var dump = table(json);
		div.innerText = '';
		div.appendChild(dump);
	}

	//	...
	function table(json){
		var dump = document.createElement('table');
		for(var index in json){
			var value =  json[index];
			dump.appendChild(tr(index, value));
		}
		return dump;
	}

	//	...
	function tr(index, value){
		var temp = document.createElement('tr');

		//	...
		tags = {};
		tags.th = document.createElement('th');
		tags.td = document.createElement('td');

		//	...
		temp.appendChild(tags.th);
		temp.appendChild(tags.td);

		//	...
		tags.th.innerText = index;
		if( typeof value !== 'object' ){
			var span = document.createElement('span');
				span.innerHTML = value;
			//	span.classList.add('value');
			tags.td.appendChild(span);
		}else{
			tags.td.appendChild(table(value));
		}

		//	...
		return temp;
	}

	//	...
	document.addEventListener('DOMContentLoaded', function(){
		var divs = document.querySelectorAll('div.OP_DUMP');
		for(var i=0; i<divs.length; i++){
			$OP.Dump(divs[i]);
		}
	});
})();
