define('rxmJsMain', ["RxmCamera"], function (camera) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		var cameraOpen = function(){
            var args = {
                callback: function (e, data) {
                    alert(data);
                },
                // comtextareass: 1,
                // quality: 1,
                // width: "100",
                // height: "50" 
                 /*,
                data: { id: "cameraOpenBtn" }*/
            }

            camera.open(args);
        }
		$('cameraOpen').rxmBindCmd({fn:cameraOpen,hearFrom:'all'})
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})