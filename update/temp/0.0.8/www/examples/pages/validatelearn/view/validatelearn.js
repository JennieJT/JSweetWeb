define('rxmJsMain', ["static/examples/template/formTemplate/view/js/form009.js"], function (form009) {
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