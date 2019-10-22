require([ "JSweetGrid"], function (JsweetGrid) {
    $(document).ready(function () {
        /**@type {JSweetGrid} */ 
        var grid = JsweetGrid({ id: "jsweet_table", templeteId: "each_row" })
        grid.load({
            url: "jswt/updateVersion/fetchTable",
            param: {},
            curPage: 1,
            rowNum: 0
        })
   });
})