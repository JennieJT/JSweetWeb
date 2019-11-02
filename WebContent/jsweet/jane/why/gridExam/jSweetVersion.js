require(["JSweetGrid", "JSweetDlg", "JSweetForm", "text!jsweet/jane/why/gridExam/update/jSweetUpdateForm.html"], function (JsweetGrid, Dlg, Jform, templeteContent) {
    $(document).ready(function () {
        /**@type {JSweetGrid} */
        var grid = JsweetGrid({ id: "jsweet_table", templeteId: "each_row" })
        grid.compare=function(a,b){
            if(a.number1>b.number1){
                return -1;
            }else if(a.number1<b.number1){
                return 1;
            }
            if(a.number2>b.number2){
                return -1;
            }
            else if(a.number2<b.number2){
                return 1;
            }
            if(a.number3>b.number3){
                return -1;
            }else if(a.number3<b.number3){
                return 1;
            }
                return 0;    
        }
        grid.format=function(data){
            for(var i=0;i<data.length;i++){
                var curData=data[i];
                var curVal=curData["publishType"]
                curVal=="0"&&(curData["publishType"]="no publish")
                curVal=="1"&&(curData["publishType"]="test publish")
                curVal=="2"&&(curData["publishType"]="official publish")
            }
        }
        var jform = Jform({ form_id: "version-form" });
        grid.load({
            url: "jswt/updateVersion/paginationFetchTable",
            curPage:grid.getParam['curPage'],
            rowNum:grid.getParam['rowNum']
        })
        var dlg;
        function popDialog() {
            var args = {
                id: "save_version_dlg",
                content: templeteContent,
                smlSize: "large",
                title: "version information",
                onload: function (e) {
                    /** @type {JSweetForm} */
//                     var jform = Jform({ id: "version-form" });
                     jform.load({url:"jswt/updateVersion/maxVersionNumber"})

                    $('#save_version_dlg .jsweet-okay').click(function () {
                        //get all the value from the form
                        //jquery serialize function: get all the data from the form as key and value;
                        
                        var x = jform.serialize();
                        var magicSerialJson = x;
                        var why = new Date(2019, 10, 24, 1, 1, 1, 1);
                        var hei = why.getTime();
                        var uuid = Math.floor(Math.random() * 100000).toString();
                        var beExtended = { uuid: uuid, userName: "jSweet", }
                        $.extend(magicSerialJson, beExtended);
                        $.ajax(
                            {
                                url: "jswt/updateVersion/paramForm",
                                data: magicSerialJson,
                                type: "post",
                                success: function (d) {
                                    if (d.success) {
                                        alert('success')
                                        dlg.close();
                                            grid.load();
                                            grid.refresh();
                                     
                                    } else {
                                        alert('fail')
                                    }
                                }, error: function () {
                                    alert('error occur')
                                }
                            }
                        )
                    });

                }
            }
            dlg = Dlg(args)
            dlg.modal()
        }
            $("#test_publish_button").click(popDialog);
            grid.addRowClickedListener({callback:function (e,data) {
                var args = {
                    id: "save_version_dlg",
                    content: templeteContent,
                    smlSize: "large",
                    title: "version information",
                    onload: function (e) {
                    	jform.load({url:"jswt/updateVersion/currentVersion",
                    		data: data.data[data.curNum-1]
                    	})   	 
                        $('#save_version_dlg .jsweet-okay').click(function () {
                            //get all the value from the form
                            //jquery serialize function: get all the data from the form as key and value;
                            var x = jform.serialize();
                            var magicSerialJson = x;
                            var result=$.extend(data.data[data.curNum-1],magicSerialJson)
                            $.ajax(
                                {
                                    url: "jswt/updateVersion/paramForm",
                                    data: result,
                                    success: function (d) {
                                        if (d.success) {
                                            alert('success')
                                            dlg.close()
                                            grid.refresh();
                                        } else {
                                            alert('fail')
                                        }
                                    }, 
                                    error: function () {
                                        alert('error occur')
                                    }
                                }
                            )
                        });
                    }
                }
                dlg = Dlg(args)
                dlg.modal()
            }});
            
            $("#official_publish_button").click(function(e,data){
                var dataChecked = grid.getDataChecked();
                var dcl=dataChecked.length;
                dcl!=1&&alert("choose only one row for official publish")
                if(dcl==1){
                    var magicSerialJson=dataChecked[0];
                    $.ajax(
                        {
                            url: "jswt/updateVersion/toOfficialType",
                            data: magicSerialJson,
                            success: function (d) {
                                if (d.success) {
                                    alert('success')
                                    grid.load({
                                        url: "jswt/updateVersion/paginationFetchTable"});
                                    grid.refresh();
                                } else {
                                    alert('fail')
                                }
                            }, error: function () {
                                alert('error occur')
                            }
                        }
                    )
                }
            });
            
    })
    });




