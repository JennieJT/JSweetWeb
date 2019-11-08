/// <reference path="../../../../../jslib/examples/examplesImport.js" />
define([require.rxm.PageBase,require.rxm.Scanner], function (pageBase,scanner) {
    ///<param  name="c"  value="clsOrmContact"><param>
	var widget = pageBase
    var ret = pageBase
    ret.init = function ($compile,$scope) {
    	
    	 var menus = [{
             name: "离线",
             callback: function () {
                 //auth.load({ target: "_self", pageCtrl: "orm/examples/gestures/tap/tap", pageUrl: "orm/examples/common.html" })
             }
         }, {
             name: "在线",
             callback: function () {
                 // auth.load({ target: "_self", pageCtrl: "www/core/page/work/work", pageUrl: "www/core/page/work/view/work.html" })

                 window.location.reload();
             }
         }];
         widget.setMenu(menus);
    	
    	
    	
    //打开日期选择器
    $("#begin").tap(function () {
    		var parms={
    			callback:function(e,data){
    				console.log(data);
    			}
    		}
    		scanner.open(parms);

    })

    
    }
    return ret;
})