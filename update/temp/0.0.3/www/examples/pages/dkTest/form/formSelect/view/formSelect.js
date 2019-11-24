define('rxmJsMain', ["www/examples/pages/dkTest/form/formSelect/view/js/form006.js"], function (form006) {
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