/// <reference path="../../../jslib/examples/examplesImport.js" />
define([require.rxm.PageBase], function (pageBase) {
	/**@type  {rxm.Page} */
	var page=pageBase
    page.init = function () {
		/**@type {rxm.AppTool} */
      var appTool= require(require.rxm.AppTool)
 	   if(appTool.getSettingData().image.comtextareass=="1"){
		   $(".move").attr("data-state", "on"); 
		   $(".btn_fath").removeClass("off").addClass("on"); 
	   }else{
		   $(".move").attr("data-state", "off"); 
		   $(".btn_fath").removeClass("on").addClass("off"); 
	   }
    	
         //消息详情页面数据初始化
         var statusType = appTool.getSettingData().image.comtextareass;
         $("#tpquality").val(appTool.getSettingData().image.quality);
         $("#tpwidth").val(appTool.getSettingData().image.imgWidth);
         $("#tpheight").val(appTool.getSettingData().image.imgHeight);
         
         $(".btn_fath").tap(function(){ 
			 var ele = $(this).children(".move"); 
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
		 });
         
         //搜索事件绑定
  		 $("#savebtn").tap(function(event){ 
  			 event.stopPropagation();
  			 var args = {
 				"comtextareass" : statusType,
 				"quality" : $("#tpquality").val(),
 				"imgWidth" : $("#tpwidth").val(),
 				"imgHeight": $("#tpheight").val()
 			 }
  			appTool.setSettingImage(args);
  			page.alert("保存成功");
        }); 		   		 
    };
    return page
})