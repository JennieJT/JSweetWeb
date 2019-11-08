define('rxmJsMain', ['RxmVideo'], function (ormVideo) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		var videoPath="";
		var videoOpen = function(){
			var args = {
				callback: function (e, data) {
					console.log("game  over");
				},
					// src: videoPath,
					src: videoPath,
					startTime: 3,
					autoStart: true,
					forceFullScreen: true,
					showCloseButton: true,
					showScaleButton: true,
					width: 320,
					height: 240,
					x: 10,
					y: 100,
					scrollWithWeb: true,
				data: { id: "videoOpenBtn" }
			}
			ormVideo.openPlayer(args);
		}
		
		$('videoOpenBtn').rxmBindCmd({fn:videoOpen,hearFrom:'all'})

		var videoRecord = function(){
			var args = {
				callback: function (e, data) {
					if(data.result=="0"){
						videoPath = data.path;
						alert(videoPath);
					}
				},
			   param: {
					maxDuration: 15,
					qualityType: 1,
					bitRateType: 2,
					fileType: "mp4"
				}
			}
			ormVideo.record(args);
		}
		
		$('videoRecordBtn').rxmBindCmd({fn:videoRecord,hearFrom:'all'})
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})