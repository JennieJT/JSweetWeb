/// <reference path="../../../jslib/examples/examplesImport.js" />
define([require.rxm.PageBase,"www/examples/common/common",
        require.rxm.NativeFile],
	/**
     * @param {rxm.Page} pagebase
     * @param  {Object}  File
     */
	function (pageBase,Common, file) {
		/**@type {rxm.Page} */
		var page=pageBase
	var btnonTap = function(){
       //localStorage.clear();
	   var homeArgs=require(require.rxm.AppTool)
	   //初始化wifi状态	
	   if(homeArgs.getSettingData().wifi.status=="1"){
		   $(".move").attr("data-state", "on"); 
		   $(".btn_fath").removeClass("off").addClass("on"); 
	   }else{
		   $(".move").attr("data-state", "off"); 
		   $(".btn_fath").removeClass("on").addClass("off"); 
	   }
	   //初始化缓存大小数值  M
	   if( typeof rxm_file !=='undefined')
		{

		rxm_file.getSystemCacheSize(3);
		rxm_file.getSystemCacheSize(4);
		rxm_file.getSystemCacheSizeBlock = function (type, size) {
				if(type==3){
					$(".cachsize").append(Common.fomatFloat(size, 2) + "M");  
				}else{
					$(".browserCachsize").append(Common.fomatFloat(size, 2) + "M");  
				} 
		}
		}
//	   file.getSystemCacheSize({
//	          type: 0,
//	          callback: function (evt, data) {
//	        	  $(".cachsize").append(Common.fomatFloat(data.size, 2) + "M"); 
//	          }
//	    });
//	   
//	   file.getSystemCacheSize({
//	          type: 1,
//	          callback: function (evt, data) {
//	        	  $(".browserCachsize").append(Common.fomatFloat(data.size, 2) + "M"); 
//	          }
//	    });
	   
	   
	   
		$(".btn_fath").on("tap",function(){ 
			 var ele = $(this).children(".move"); 
			 var statusType;
			 if(ele.attr("data-state") == "on"){ 
				statusType = "0";
				ele.animate({left: "0"}, 300, function(){ 
					ele.attr("data-state", "off"); 
		    	}); 
		        $(this).removeClass("on").addClass("off"); 
		     }else if(ele.attr("data-state") == "off"){ 
		    	statusType = "1"; 
				ele.animate({left: '25px'}, 300, function(){ 
					$(this).attr("data-state", "on"); 
				}); 
		        $(this).removeClass("off").addClass("on"); 
		     } 
			 var args = {
 				 "status" :statusType
			 }
			 setLocalStorage(args);
			 
//			 homeArgs.getSettingData().wifi.status;
//			 homeArgs.getSettingData().wifi.status;
			 
		});
		
		
		function setLocalStorage(args){
			 var _s_d_name = "_s_d_" + homeArgs.getUserID();
			 var storageArgs ={"wifi":JSON.stringify(args),"video":JSON.stringify(homeArgs.getSettingData().video),"voice":JSON.stringify(homeArgs.getSettingData().voice),"image":JSON.stringify(homeArgs.getSettingData().image)};
			 localStorage.setItem(_s_d_name,JSON.stringify(storageArgs));
		}
	    //清除缓存方法  空或0 获取所有缓存大小，1 视频，2音频，3图片，4浏览器缓存
	     $(".file-list").on("tap",function(){
	        event.stopPropagation();
	    	var btnType = $(this).attr('data');
	    	//清除缓存
	    	if(btnType=="1"){
	    		
	    		
	    	}
	    	//音频设置
	    	if(btnType=="2"){
	    		 var sliderbar = page.slidebar({
	    			title:"音频设置",
    	    		pageUrl: "www/examples/pages/setting/view/voice.html",
					pageCtrl: "www/examples/pages/setting/voice",
					pageType: "10" ,
					pageId: "voiceSetting",
                   pageRouter: 'voiceSetting',
			   	 })
	    	}
	    	//视频设置
	    	if(btnType=="3"){
	    		 var sliderbar = page.slidebar({
	    			title:"视频设置",
    	    		pageUrl: "www/examples/pages/setting/view/video.html",
					pageCtrl: "www/examples/pages/setting/video",
					pageType: "10" ,
					pageId: "videoSetting",
                  	pageRouter: 'videoSetting',
			   	 })
	    	}
	    	//图片设置
	    	if(btnType=="4"){
	    		 var sliderbar = page.slidebar({
		    			title:"图片设置",
	    	    		pageUrl: "www/examples/pages/setting/view/image.html",
						pageCtrl: "www/examples/pages/setting/image",
						pageType: "10",
						pageId: "imageSetting",
                  		pageRouter: 'imageSetting', 
			   	 })
	    	}
	    	//注销
	    	if(btnType=="5"){
	    		page.confirm("您是否要退出应用",function(){
	    			var widget=require(require.rxm.PageBase);
	    			widget.logout(1);
	    		},function(){
	    			return false;
	    		});
	    	}
	    	//清除浏览器历史记录
	    	if (btnType == "6") {
	    		page.confirm("您否要清除缓存数据",function(){
	    			file.cleanSystemCache({
	    		          type: 0,
	    		          callback: function (evt, data) {
	    		              if (data.stauts == "1") {
	      		            	    page.alert("缓存清除成功");
	      		            	    $(".browserCachsize").html("");
	      		            	    rxm_file.getSystemCacheSize(4);
	      		            	    rxm_file.getSystemCacheSizeBlock = function (type, size) {
		      		         		    $(".browserCachsize").append(Common.fomatFloat(size, 2) + "M");
		      		                }
		      		            }else{
		      		            	page.alert("缓存清除失败");
		      		            }
	    		          }
	    		    });
	             },function(){
	    			return false;
	    		});
	    		
	    		
	    		
    			file.cleanSystemCache({
  		          type: 3,
  		          callback: function (evt,data){
  		        	  if(data.stauts=="1"){
    		            	    page.alert("浏览器历史清除成功");
	      		            }else{
	      		            	page.alert("浏览器历史清除成功");
	      		            }
  		          }
    			});
	    	}
	    	//关于
	    	if (btnType == '7') {
	    		var sliderbar = page.slidebar({
	    			title:"关于",
    	    		pageUrl: "www/examples/pages/setting/view/appinfo.html",
					pageCtrl: "www/examples/pages/setting/appinfo",
					pageType: "10" ,
					pageId: "appinfoSetting",
                  	pageRouter: 'appinfoSetting', 
		   	 	});
	    	}
	     })
	};
	
	 /** @type {rxm.Page} */
	var page = pageBase
	//页面初始化方法入口
	page.init = btnonTap
    return page

})