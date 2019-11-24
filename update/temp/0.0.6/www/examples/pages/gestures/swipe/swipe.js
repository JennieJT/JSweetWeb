/// <reference path="../../../../jslib/examples/examplesImport.js" />
define([require.rxm.PageBase],
    function (pageBase) {
        var orm = pageBase
        var page = pageBase
        page.init = function () {

        var divc = '<div class="divcontents"></div>';
        //========================左滑=========================
        function swipeLeftStart(e, d) {
            $(this).prepend($(divc).html("左滑开始"));
        };
        var leftcount = 0;
        function swipeLeftMove(e, d) {
            $(this).prepend($(divc).html(leftcount++ + ":左滑"));
        };
        function swipeLeftEnd(e, d) {
            $(this).prepend($(divc).html("左滑结束"));
        };
        $("#swipe_test").on("swipeLeftStart", swipeLeftStart);
        $("#swipe_test").on("swipeLeftMove", swipeLeftMove);
        $("#swipe_test").on("swipeLeftEnd", swipeLeftEnd);
        ///========================下滑=========================
        var downcount = 0;
        function swipeDownStart(e, d) {
            ///============

            $(this).append($(divc).html("下滑开始"));
        };
        function swipeDownMove(e, d) {
            console.info(d);
            $(this).append($(divc).html(downcount++ + ":下滑"));
        };
        function swipeDownEnd(e, d) {
            $(this).append($(divc).html("下滑结束"));
        };
        $("#swipe_test_down").swipeUpStart(swipeDownStart);
        $("#swipe_test_down").swipeUpMove(swipeDownMove);
        $("#swipe_test_down").swipeUpEnd(swipeDownEnd);
        //=============== 用于代替 touchstart  touchmove  touchend================================
        var downcount = 0;
        function touch(e, d) {
            $(this).prepend($(divc).html(downcount++ + "" + e.type));
        };
        $("#swipe_test_touch").touchStart(touch);
        $("#swipe_test_touch").touchEnd(touch);
        $("#swipe_test_touch").touchMove(touch);
    }
        return page
    })