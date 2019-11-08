define('rxmJsMain', ["RxmTab","www/examples/pages/dkTest/tab/view/js/grid012.js","www/examples/pages/dkTest/tab/view/js/form019.js"], function (RxmTab,grid012,form019) {
		 var tab002 = new RxmTab({id:"tab002"})
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