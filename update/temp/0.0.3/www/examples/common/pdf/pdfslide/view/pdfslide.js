define('rxmJsMain', [], function () {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		console.log('页面加载成功')
		
		$('#slidecallback').on('click', function(){
			rxmPage.slidebar({
				pageUrl: 'www/rxm/pdfjs-dist/web/viewer.html',
				pageRouter: 'pageWidget',
				pageId: 'pageWidget',
				pageType: '10'
			  }, {
				  data: {
					row: {}
				  },
				  form: {},
				  afterClose: function (e, data) {
		  
				  }
			})
		});
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})