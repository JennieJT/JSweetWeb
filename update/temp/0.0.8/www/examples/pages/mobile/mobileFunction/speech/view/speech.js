define('rxmJsMain', ['RxmSpeech'], function (speech) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		var speechOpen = function(){
			speech.start({
				callback:function(e, data) {
					alert(data.data);
				}
			});
		}
		
		$('speechOpen').rxmBindCmd({fn:speechOpen,hearFrom:'all'})
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})