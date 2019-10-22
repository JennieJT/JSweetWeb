define([], function () {
    /**
         *  @param {TJSweetGridConf} args
         * */
    var factory = function (args) {
        var url
        var param
        var curPage
        var rowNum
        var _gridData=[]
        var _id=args.id
        if(!_id){
            console.warn("id required!!!!!")
        }
        var _templeteId=args.templeteId
        var _success=function (d) {
            //d is an array.
            if (d.success) {
                //convert data to the array
                _gridData=d.data;
                //view
                this.theGridObj.refresh();
            } else {
                alert('fail')
            }
        }

        var JSweetGrid = function () {
        }
        /**
         * @param {TJSweetGridLoad} args
         */
        JSweetGrid.prototype.load = function (args) {
            args&&args.url&&(url=args.url);
            // if(typeof args!="undefined"){
            //     if(typeof args.url!="undefined"){
            //         url=args.url
            //     }
            // }
            args&&args.param&&(param=args.param);
            args&&args.curPage&&(curPage=args.curPage);
            args&&args.rowNum&&(rowNum=args.rowNum);
            var the=this
            $.ajax(
                {
                    theGridObj:the,
                    url: url,
                    data:{
                        param:param,
                        curPage:curPage,
                        rowNum:rowNum
                    },
                    /*送出的数据格式，报文头部   Content-Type*/
                    //contentType  
                    //报文头部的 Method
                    type: "post",
                    /*Accept 字段
                    "xml": 返回 XML 文档，可用 jQuery 处理。
                    "html": 返回纯文本 HTML 信息；包含的 script 标签会在插入 dom 时执行。
                    "script": 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了 "cache" 参数。注意：在远程请求时(不在同一个域下)，所有 POST 请求都将转为 GET 请求。（因为将使用 DOM 的 script标签来加载）
                    "json": 返回 JSON 数据
                    "jsonp": JSONP 格式。使用 JSONP 形式调用函数时，如 "myurl?callback=?" jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
                    "text": 返回纯文本字符串*/
                    //dataType:"json",
                    success: _success, 
                    error: function () {
                        alert('error occur')
                    }
                }
            )
        }
        /**
        * return the number of rows being checked
         * @param {number} rowNum the row to be checked
         * @returns {number}
         */
        JSweetGrid.prototype.checkedRow = function (rowNum) {
            var rowBeingChecked = [];
            var index=0;
            var selected = $("#jsweet_table_example [name=jsweet_td_selected]");
            for (var i = 0; i < selected.length; i++) {
                if (rowNum==undefined&&selected[i].checked) {
                    rowBeingChecked.push($("input").index(selected[i]));
                }
                if(rowNum!=undefined){
                    var toSelect=rowNum[index];
                    if(i==toSelect){
                        $(selected[i]).attr("checked",true)
                        rowBeingChecked.push($("input").index(selected[i]))
                        index=index+1;
                        if(index>=rowNum.length){
                            break;
                        }
                    }
                }
            }
            if(rowBeingChecked==""){
                alert("Nothing selected!!")
                return;
            }
            return rowBeingChecked;
        }
        JSweetGrid.prototype.getDataChecked = function (){
            var dataChecked=[];
            var indices=this.checkedRow();
            if(indices==undefined){
                return dataChecked;
            }
            for(var i=0;i<indices.length;i++){
                dataChecked.push(_gridData[indices[i]]);
            }
            return dataChecked;
        }
        JSweetGrid.prototype.getDataByRow=function(index){
            return _gridData[index];
        }
        /**
         * load finished
         * row was checked
         * @param {TJSweetEvent} args
         */
        JSweetGrid.prototype.addLoadFinishedListener = function (args) { }
        /** 
        * @param {TJSweetEvent} args
        */
        JSweetGrid.prototype.addRowCheckedListener = function (args) { }
        /** 
        * @param {TJSweetEvent} args
        */
        JSweetGrid.prototype.addEventListener = function (args) { }
        JSweetGrid.prototype.refresh = function () {
            $(".jsweet-table-tr").remove();
            for (var i = 0; i < _gridData.length; i++) {
                var person = _gridData[i];
                //must be id!!!
                var tempHTML = $("#"+_templeteId).html();
                // for(var key in person){
                //     tempHTML = tempHTML.replace("{{"+key+"}}", person[key]);
                // }
                $.each(person,function(key,value){
                   
                    tempHTML = tempHTML.replace(RegExp("{{"+key+"}}","g"), value);
                    
                })
                $("#"+_id).append(tempHTML);
            }
         }
         return new JSweetGrid()
    }
    return factory
});