/// <reference path="../../../jslib/examples/examplesImport.js" />
define([require.rxm.PageBase], function (page) {
  
    page.init = function (the, homeArgs) {
         ///<param  name="homeArgs" type="clsAppArgs"></param>
        cipWidget.getAppInfo();
        cipWidget.cbGetAppInfo = function(data){
            var appVersion = JSON.parse(data).appVersion;
            var appBuildCode = JSON.parse(data).appBuildCode;
            var versionInfo = "v"+appVersion+"   " + "Build" + appBuildCode;
            var top = "260px";
            var left = $(window).width()/2 - 40 + "px";
            var style ="position:absolute;color:#fff;top:"+ top +";left:"+left;
            var $versonInfoDom = $("<div style="+style+"><span>" + versionInfo + "</span></div>");
            $(".appinfo").append($versonInfoDom);
        }
       
    };
    return page;
})