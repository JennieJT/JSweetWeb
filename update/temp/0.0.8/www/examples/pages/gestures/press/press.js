/// <reference path="../../../../jslib/examples/examplesImport.js" />
define([require.rxm.PageBase],
    function (pageBase) {
        /**@type{rxm.Page} */
        var orm = pageBase
        var page = pageBase
        page.init = function () {

        var divc = '<div class="divcontents"></div>';
        function pressFun(e, d) {
            $(this).prepend($(divc).html("长按"));
        };
        
        $("#press_test").press(pressFun);
    }
        return page
    })