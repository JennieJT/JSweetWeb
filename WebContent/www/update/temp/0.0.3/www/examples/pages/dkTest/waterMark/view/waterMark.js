define('rxmJsMain', ["www/examples/pages/dkTest/waterMark/view/js/form009.js"], function (form009) {
		 
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	
	var rxmPage = require('RxmPageBase')

	// var marginTop = $('.water-div:eq(0)').css('margin-top')
	// marginTop = parseInt(marginTop.substring(0,marginTop.indexOf('px')))
	// var divHeight = $('.water-div:eq(0)').height()
	// divHeight += marginTop
	// var num = $(window).height() / divHeight
	
	// for(var i = 0 ; i < num - 1 ; i++){
	// 	var appendDom = $('.water-div:eq(0)').clone(true)
	// 	$('.bg').append(appendDom)
	// }

	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		//rxmPage.alert('页面加载成功')
		// $('.watermark-line').find('span').text('涉密文件-检验员-20190702')
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})