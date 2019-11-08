/// <reference path="../../../../../jslib/examples/examplesImport.js" />
define([require.rxm.PageBase,require.rxm.Speech], function (pageBase,speech) {
    ///<param  name="c"  value="clsOrmContact"><param>
	var widget = pageBase
    var ret = pageBase
    ret.init = function ($compile,$scope) {
    
    //打开语音识别
    $("#begin").tap(function () {
    		
        speech.start({
            callback:function(e, data) {
                alert(data.data);
            }
        });

    })
  
    
    }
    return ret;
})