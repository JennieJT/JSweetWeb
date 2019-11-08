define('rxmJsMain', ['RxmActionSheet'], function (actionSheet) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		var openListSheet=function(){
			var data={"cancel":{"title":"取消","color":"#aaaaaa"},"item":[{"title":"选项一","color":"#333333"},{"title":"选项二","color":"#333333"}],"canceledOnTouchOutside":"0"};
			var parms={
				json:data,
				callback:function(e,data){
					console.log(data);
				}
			}
			actionSheet.openListSheet(parms);
		}
		var openGridSheet = function(){
			var data={"cancel":{"title":"取消","color":"#aaaaaa"},"item":[{"title":"首页","img":"citp://www/demo/img/tab_home.png","color":"#333333"},{"title":"个人中心","img":"citp://www/demo/img/tab_my.png","color":"#333333"}],"canceledOnTouchOutside":"0"};
			var parms={
				json:data,
				callback:function(e,data){
					console.log(data);
				}
			}
			actionSheet.openGridSheet(parms);
		}
		$('openListSheet').rxmBindCmd({fn:openListSheet,hearFrom:'all'})
		$('openGridSheet').rxmBindCmd({fn:openGridSheet,hearFrom:'all'})
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})
