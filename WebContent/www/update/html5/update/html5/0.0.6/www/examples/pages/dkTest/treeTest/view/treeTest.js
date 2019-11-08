define('rxmJsMain', ["www/examples/pages/dkTest/treeTest/view/js/tree002.js","RxmPopMenu"], function (tree002,RxmPopMenu) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		rxmPage.alert('页面加载成功')
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})