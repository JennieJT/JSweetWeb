define('rxmJsMain', ["RxmInputSearch"], function (RxmInputSearch) {
		 var search004 = new RxmInputSearch({id:"search004"})
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	var onSearchSelected = function(e,data){
      alert("1212")
			}
			search004.bindSearchSelected({callback:onSearchSelected},search004)
			return rxmPage
})