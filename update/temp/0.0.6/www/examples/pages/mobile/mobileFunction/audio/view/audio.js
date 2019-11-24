define('rxmJsMain', ['RxmAudio'], function (audio) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		var path
		var audioRecord = function(){
			//录制音频
			var args = {
				callback : function(e, data) {
					console.info("data=======" + data);
					alert(data);
					path = data;
					
				},
				
				mode : 2,
				fileName : "20153343443",
				
				data : {
					id : "audioRecordBtn"
				}
			}
			audio.record(args);
		}
		var audioOpen = function(){
			var args = {
				callback : function(e,data) {
					console.log("打开音频");
				},
				paths: path,
				index : "0",
				
				data : {
					id : "audioOpenBtn"
				}

		}
	 	audio.openPlayer(args);
		}
		$('audioRecordBtn').rxmBindCmd({fn:audioRecord,hearFrom:'all'})
		$('audioOpenBtn').rxmBindCmd({fn:audioOpen,hearFrom:'all'})
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})