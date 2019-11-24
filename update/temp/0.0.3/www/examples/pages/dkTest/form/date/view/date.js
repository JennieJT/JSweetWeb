define('rxmJsMain', ["www/examples/pages/dkTest/form/date/view/js/form003.js"], function (form003) {
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