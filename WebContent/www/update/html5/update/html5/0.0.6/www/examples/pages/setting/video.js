/// <reference path="../../../jslib/examples/examplesImport.js" />
define([require.rxm.PageBase], function (pageBase) {
    var page= pageBase
    page.init = function () {
        /**@type {rxm.AppTool} */
        var appTool= require(require.rxm.AppTool)
         //消息详情页面数据初始化 如果没有设置,初始化默认设置
         $("#mostLongTime").val(appTool.getSettingData().video.maxDuration/3600)
         $("#resolution").val(appTool.getSettingData().video.qualityType)
         //搜索事件绑定
  		 $("#savebtn").on("tap",function(event){ 
  			 event.stopPropagation();
  			 var args = {
 				"maxDuration" : $("#mostLongTime").val()*3600,
 				"qualityType" : $("#resolution").val(),
 				"fileType" : 'mp4'
 			 }
  			 appTool.setSettingVideo(args)
  			 page.alert("保存成功")
        })
    }
    return page
})