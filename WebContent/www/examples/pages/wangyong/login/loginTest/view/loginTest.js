define('rxmJsMain', ["RxmModuleLoginDir","www/examples/pages/wangyong/login/loginTest/view/js/form004.js"], function (lgn,form004) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	$('rxmExampleLgnBtn').rxmBindCmd({
		callback:$.proxy(lgn.onLoginSubmit,lgn)
	})
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})