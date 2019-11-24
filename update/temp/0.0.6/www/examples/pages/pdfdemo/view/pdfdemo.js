define('rxmJsMain', ["static/examples/template/formTemplate/view/js/form009.js"], function (form009) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
    alert(83454);
	var renderPDF = function( printConfig ){
		var configDefault = {
			printWord : 'user001',
			color: '000',
			fontSize: '20',
			degree: -9,
			opacity: 0.2
		}
		var config = $.extend( configDefault, printConfig )
		rxmPage.slidebar({
		    pageUrl : '/www/urcb/pages/pdfjs-dist/web/viewer.html?file=http://192.168.0.107/www/examples/pages/pdfjs-dist/web/test.pdf&printWord=' + config.printWord + '&color=' + config.color + '&fontSize=' + config.fontSize + '&degree=' + config.degree + '&opacity=' + config.opacity ,
			pageRouter: 'pageWidget',
			pageId: 'pageWidget',
			pageType:'10'
		},{
		    data:{
				row: {}
		    },
			form: {},
			afterClose: function( e, data ){
			}
		});
	}

	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		$('#btn010').tap(function(){
			renderPDF({
				printWord : 'user00312',
				color: '00ff00',
				fontSize: '20',
				degree: -9,
				opacity: 0.2
			});
		});
        // $('#btn010').click(function(){
       	// 	renderPDF({
        //        printWord : 'user00312',
        //        color: '00ff00',
        //        fontSize: '20',
        //        degree: -9,
        //        opacity: 0.2
        //     });
        // });
	}

	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})