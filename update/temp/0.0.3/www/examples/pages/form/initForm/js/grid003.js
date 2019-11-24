/// <reference path="../../../../jslib/examples/examplesImport.js" />
define(['RxmGrid'],
function (RxmGrid) {
    var grid003 = new RxmGrid({id:"grid003"})
    var page=require(require.rxm.PageBase)
    var onTapLineElement = function(e,data){
      var row=data.row
          edit = true
        var type = ''
        var form = {
            optype: '',
            initLoad: '',
            initData: ''
        }
        if (edit) {
            type = 'edit'
            form.optype = type
            row.aaa="d"
            row.bbb="a,b"
            row.ccc="1"
            row.ddd="1,2"
            form.initData = row
            //form.initLoad = {
            //	url: getServer() + '/resoft/originalm/grid/getById',
            //	data: {
            //		pageId: row.pageId
            //	}
            //}
            
        } else {
            type = 'add'
            row.pageId = cssOrm.uuid()
            form.optype = type
        }
        page.slidebar({
            pageUrl: 'www/examples/pages/form/form/view/form.html',
            pageCtrlUrl: 'www/examples/pages/form/form/form.js',
            pageRouter: 'pageWidget',
            pageId: 'pageWidget',
            pageType: '10'
        }, {
                data: {
                    row: row
                },
                form: form,
                 afterClose: function (e, data) {
                   grid003.reload()
                 }
            })
    }
    grid003.bindTapLineElement({callback:onTapLineElement},grid003)
    return grid003
})

