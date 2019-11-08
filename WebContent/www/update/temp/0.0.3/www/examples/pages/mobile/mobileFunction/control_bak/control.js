/// <reference path="../../../../../jslib/examples/examplesImport.js" />
define([require.rxm.PageBase,require.rxm.Control],
/**
* @param {rxm.Page} pagebase
* @param  {Object}  File
*/
function (pageBase,control) {

    var page = pageBase
    page.init = function (the, homeArgs) {
    //打开日期选择器
    $("#openDatePicker").tap(function () {
    		var parms={
    			callback:function(e,data){
    				alert(JSON.stringify(data));
    			}
    		}
    		control.openDatePicker(parms);
//    	console.log("openDatePicker");
//    	 rxm_control.openDatePicker("1233",1,2016,8,1,2010,2050);
    })

//    function cbOpenDatePicker(year,month,day) {
//        alert(parseInt(month)+1);//month需要+1处理
//    }
//
//    	rxm_control.cbOpenDatePicker = cbOpenDatePicker;
    
    
    
    //打开时间选择器
    $("#openTimePicker").tap(function () {
    		var parms={
    			callback:function(e,data){
    				alert(JSON.stringify(data));
    			}
    		}
    		control.openTimePicker(parms)

    })


    //打开年月日时分选择器
    $("#openDateAndTimePicker").tap(function () {
    		var parms={
    			callback:function(e,data){
    				alert(JSON.stringify(data));
    			}
    		}
    		control. openDateAndTimePicker (parms)

    })
    
    //打开时间选择器含秒
    $("#openTimeAndSecondPicker").tap(function () {
    		var parms={
    			callback:function(e,data){
    				alert(JSON.stringify(data));
    			}
    		}
    		control.openTimeAndSecondPicker(parms)

    })
    
    //打开输入对话框
    $("#openInputDialog").tap(function () {
    		var parms={
    			callback:function(e,data){
    				alert(JSON.stringify(data));
    			}
    		}
    		control.openInputDialog(parms);
//    	rxm_control.openInputDialog("1",0, "", "");

    })
    
    }
    return page;
})