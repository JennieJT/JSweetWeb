define('rxmJsMain', ["RxmLoaction"], function (location) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		var locationOpen = function(){
			var args = {
				onChange:true,
				callbackOpen: function (e, data) {
					console.log(data);
				},
				callback: function (e, data) {
					console.log(data);
				},
				data: {
					id: "locationOpenBtn"
				}
			};
		
			location.openLocation(args);
        }
		$('locationOpenBtn').rxmBindCmd({fn:locationOpen,hearFrom:'all'})

		var locationClose = function(){
			location.closeLocation();
        }
		$('locationCloseBtn').rxmBindCmd({fn:locationClose,hearFrom:'all'})

		var locationGetAddress = function(){
			var args = {
				callback: function (e, data) {
					console.log(data);
				},
				lat: "39.9582872433",
				log: "116.3337606534",
				flag:1,
				data: {
					id: "locationGetAddressBtn"
				}
			};
			
			location.getAddress(args);
        }
		$('locationGetAddressBtn').rxmBindCmd({fn:locationGetAddress,hearFrom:'all'})

	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})