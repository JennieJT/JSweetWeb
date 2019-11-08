define('rxmJsMain', ['RxmScanner'], function (scanner) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		var begin = function(){
			var parms={
    			callback:function(e,data){
    				console.log(data);
    			}
    		}
    		scanner.open(parms);
        }
		$('begin').rxmBindCmd({fn:begin,hearFrom:'all'})
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})