define('rxmJsMain', ["RxmDownload", "RxmDownloadA","www/examples/pages/mobile/mobileFunction/fileDownloadTest/view/circleChart.min"], function (multiDownload) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		$(".circleChart").circleChart({
			size: 20,
			color: "#38b3fb",
			onDraw: function(el, circle) {
				circle.text(Math.round(circle.value) + "%");
			}
		});
		$("#fileDown").tap( function () {
			var args = {
				files: [{
					fileId: "C81F679470E00001DE291F40E9903590"
				}],
				completedCallback: function (e, arg) {
					console.log(arg);
					// alert("保存成功");
				},
				progressCallback: function (e, arg) {
					
					$("#fileDown").hide();
					$(".circleChart").show();
					var percentage = arg.totalPercent;
					var num = (percentage * 1).toFixed(2);
					console.log(num)
					$(".circleChart").circleChart({
						value: num
					});

					// $("div").find('div[class="progress-bar"]').css('width', percentage * 1 + '%').html(num + '%');
					// if (percentage == 100) {
					// 	// $(".progress").delay(1000).fadeOut();
					// 	alert("保存成功");
					// }
				},
				openDowned: false
			}
			multiDownload.downFlies(args);
		})
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})