/**
 * app-webpack-js:/core.js
 *
 * @creation  2017-06-07
 * @version   1.0
 * @package   app-skeleton
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
/** foreach
 *
 * <pre>
 * obj.foreach(function(key, value, index) {
 *    console.log(index, key, value);
 * });
 * </pre>
 */
Object.defineProperty(Object.prototype, "foreach", {
	value: function(fn, self) {
		self = self || this;
		Object.keys(this).forEach(function(key, index) {
			var value = this[key];
			fn.call(self, key, value, index);
		}, this);
	}
});

//	...
$OP = {};

//	...
$OP.Path = {};
$OP.meta = {};
$OP.meta.root = {};
$OP.meta.path = {};

//...
$OP.meta.root.app = "<?= ConvertURL('app:/') ?>";
