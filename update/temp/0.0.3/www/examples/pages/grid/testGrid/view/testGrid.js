define('rxmJsMain', ["www/examples/pages/grid/testGrid/view/js/grid002.js"], function (grid002) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})