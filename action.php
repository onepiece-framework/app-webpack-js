<?php
/**
 * op-skeleton-3:/html/js/op/index.php
 *
 * @creation  2017-06-29
 * @version   1.0
 * @package   op-skeleton
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
//	...
$extension = 'js';

//	...
$files = [];
$files[] = 'core';
$files[] = 'path';
$files[] = 'd';
$files[] = 'args';
$files[] = 'mark';
$files[] = 'dump';
$files[] = 'notice';
$files[] = 'ajax';
$files[] = 'url';
$files[] = 'i18n';
$files[] = 'math';

//	...
Webpack::Run(__DIR__, $files, $extension);

?>
<?php if( Env::isAdmin() ): ?>
$OP.meta.path.op  = "<?= ConvertPath('op:/')  ?>";
$OP.meta.path.app = "<?= ConvertPath('app:/') ?>";
$OP.meta.path.doc = "<?= ConvertPath('doc:/') ?>";

/** Check if admin.
 *
 * <pre>
 * $OP.isAdmin(); --> true / false
 * </pre>
 */
$OP.isAdmin = function(){
	return <?= Env::isAdmin() ? 'true': 'false'; ?>;
}
<?php endif; ?>
