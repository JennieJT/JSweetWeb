define('rxmJsMain', [], function () {
    //  /**@type {rxm.AppTool} */
    //  var appInfo =require(require.rxm.AppTool)
    /**@type {RxmPage} */
    var rxmPage = require('RxmPageBase')
    var onPageLoad = function (e, data) {
        //todo html、插件加载完毕
        let marginTop = $('.watermark-line:eq(0)').css('margin-top')
        let topNum = parseInt(marginTop.substring(0,marginTop.indexOf('px')))
        let divHeight = $('.watermark-line:eq(0)').height()
        divHeight = divHeight + topNum
        let num = $(window).height() / divHeight
        for(let i = 0 ; i < num - 1 ; i++){
        let appendDom = $('.watermark-line:eq(0)').clone(true)
        $('#watermark-div').append(appendDom)
        }
    }

    rxmPage.bindPageReady({ callback: onPageLoad })
    return rxmPage
})