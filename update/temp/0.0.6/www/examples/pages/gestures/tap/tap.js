/// <reference path="../../../../jslib/examples/examplesImport.js" />
define([require.rxm.PageBase],function (pageBase) {
    var  orm=pageBase
    var  page=pageBase
    //h5 dom已经准备完成,可以进行dom操作
    //采用结构化编程风格
    //tap 事件 相当于 click 但在iphone中由于双击的原因 ，click事件延迟300ms,tap事件没有延迟
    $('body').css("height", window.screen.availHeight+"px");
    var tapCount = 0;
    var divc = '<div class="divcontents"></div>';
    function tapPropagation(e, data) {
        
        $(this).prepend($(divc).html(tapCount++ + ":没有阻止冒泡"));
    };
    var dataforTapStopPropagation = {
        str: " :阻止冒泡"
    };
    //返回false 阻止冒泡 
    function tapStopPropagation(e) {
        //console.info(e);
        //console.info(data);
        var s =""+ tapCount++;
        if (!!e.data)
        {
            s += e.data.str;
        }
        $(this).prepend($(divc).html(s));
        return false;
    };
    //具有委托绑定效果（live）
    function tapDelegated(e, data) {
        var s = tapCount++ + " :委托函数";
        var id = $(this).attr("id");
        if (id == "tap_test_3") {
            s += ":后绑定效果！"
        }
        $(this).prepend($(divc).html(s));
    };
    
    var domId = "";
    //最简单的做法
    $("#tap_test_1").tap(tapPropagation);
    //有数据
    $("#tap_test_2").tap(dataforTapStopPropagation,tapStopPropagation);
    $("#tap_test_wrap").tap('.orm-tap', tapDelegated);
    //有后绑定效果
    
    page.init = function () {
        $('<div id="tap_test_3" class="orm-tap">  </div>').appendTo($("#tap_test_wrap"));
    }
    return page;

})