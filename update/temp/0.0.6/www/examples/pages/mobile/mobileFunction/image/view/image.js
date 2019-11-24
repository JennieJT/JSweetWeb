define('rxmJsMain', ["RxmImage"], function (image) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		var path
		var openPicker = function(){
			var args = {
				callback: function (e, data) {
					if(data.status=="1"){
						var fileArray = [];
						fileArray = JSON.parse(data.data);
						alert(fileArray[0]);
						path = fileArray[0];
						
						
						var argss={
								url:path,
								needPrefix:1,
								width:100,
								hight:100,
								quality:100,
								callback: function(a,data){
									var img = new Image();//创建img容器
									img.src=data.base64
									$("#rxm_content").append(img);
								}
						
						}
						image.getThumbnailBase64(argss);
						
					}
					
				},
				min: "",
				max: "",
				quality: "",
				usePng:"",
				detailedInfo:"",
				data: { id: "openPickerBtn" }
			}
	
			image.openPicker(args);
        }
		$('openPickerBtn').rxmBindCmd({fn:openPicker,hearFrom:'all'})

		var openBrowser = function(){
			var data = [
				{
					src: path
				}];
			   
				var args = {
					data: data,
					startIndex: "",
					displayActionButton: "",
					enableGrid: "",
					startOnGrid: "",
					displayNavArrows:""
				}
		
				image.openBrowser(args);
        }
		$('openBrowserBtn').rxmBindCmd({fn:openBrowser,hearFrom:'all'})

		var openVideoPicker = function(){
			var args = {
				callback: function (e, data) {
					console.log(data);
					if (data.videoPath) {
						console.log(data.videoPath);
						alert(data.videoPath);
						path=data.videoPath;
					}
	
				},
				needBase64: 1,
				data: {
					id: "openVideobtn"
				}
			}
	
			image.openVideoPicker(args);
        }
		$('openVideoPicker').rxmBindCmd({fn:openVideoPicker,hearFrom:'all'})
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})