define('rxmJsMain', ['RxmPhone'], function (phone) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		var sms = function(){
			var number = $("#number").val();
            var content = $("#content").val();
            phone.sms(number,content);
        }
		$('sms').rxmBindCmd({fn:sms,hearFrom:'all'})
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})