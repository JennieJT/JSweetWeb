define('rxmJsMain', [], function () {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var number=require('RxmAppTool').unid();
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		
		var sliderRegisted = function(){
			var pageRouter = "home_slidebar"
			rxmPage.slidebar(pageRouter, {
				title: "打开经过注册的页面",
				data: {},
				titleColor: "#ffffff",
				titleBarBg: "#7171C6",
				hiddenTitleBar: false,
				hiddenBackBtn: false,
				afterClose: function (evt, args) {//导航视图 关闭完成后回调
				var   argsObj=args
				if(($.isString(args))&&(args!="")){
					argsObj = JSON.parse(args);
				}
				rxmPage.alert(argsObj.abc)
				}
			})
		}
		
		$('slider_registed').rxmBindCmd({fn:sliderRegisted})

		var sliderUnregisted = function(){
			var loadPageA = {
				//页面id 必填
				pageId: "pageAId",
				//页面名称
				pageName: "添加路由信息",
				//页面序号
				pageOrder: 0,
				//父页面id  
				////pagePid :"",
				//页面类型
				pageType: "10",
				//所在组
				////pageCtrl: "132",
				//页面控制  必填
				pageCtrlUrl: "www/examples/pages/slidebar/slidebar",
				//页面描述
				pageDesc: "添加路由信息",
				//页面路由地址  必填
				pageRouter: "pageARouter",
				//页面地址  必填
				pageUrl: "www/examples/pages/slidebar/view/slidebar.html",
				//打开方式
				pageOpen: "_blank"
			  }
			  rxmPage.slidebar(loadPageA, {
				title: "打开未经过注册的页面"+number,
				data: {},
				titleColor: "#ffffff",
				titleBarBg: "#7171C6",
				hiddenTitleBar: false,
				hiddenBackBtn: false,
				afterClose: function (evt, args) {//导航视图 关闭完成后回调
				  var   argsObj=args
				  if(($.isString(args))&&(args!="")){
					argsObj = JSON.parse(args);
				  }
				  rxmPage.alert(argsObj.abc)
				}
			  })
			  number++;
		}
		
		$('[rxmcmdid=slider_unregisted]').tap(sliderUnregisted)


		var close = function(){
			rxmPage.closePage({ abc: "123" })
		}
		
		$('close').rxmBindCmd({fn:close})
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})