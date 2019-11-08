define([], function () {
    /**
         *  @param {TJSweetGridConf} args
         * */
    var factory = function (args) {
        var thisObj
        var _url
        var _curPage=0
        var _rowNum=1
        var _curNum
        var _gridData=[]
        var _id=args.id
        var _param
        //id is necessary
        if(!_id){
            console.warn("id required!!!!!")
        }
        var _templeteId=args.templeteId
        //gridData has to be an array.
        var _success=function (d) {
            //d is an array.
            if (d.success) {
                //convert data to the array
                var data=d.data;
                _gridData=data["data"];
                _allNum=data["countRow"];
                //view
                this.theGridObj.refresh();
            } else {
                alert('fail')
            }
        }
        //constructor. no function actually.
        var JSweetGrid = function () {
            _curPage=$(".cur-page-input").val();
            _rowNum=$(".row-num-span>select").val();
        }
        /**
         * @param {TJSweetGridLoad} args
         */
        JSweetGrid.prototype.load = function (args) {
            args&&args.url&&(_url=args.url);
            // if(typeof args!="undefined"){
            //     if(typeof args.url!="undefined"){
            //         url=args.url
            //     }
            // }
            args&&args.param&&(_param=args.param);
            args&&args.curPage&&(_curPage=args.curPage);
            args&&args.rowNum&&(_rowNum=args.rowNum);
            var the=this
            $.ajax(
                {
                    theGridObj:the,
                    url: _url,
                    data:$.extend(true,{},{
                        curPage:_curPage,
                        rowNum:_rowNum,
                    },_param),
                    /*送出的数据格式，报文头部   Content-Type*/
                    //contentType  
                    //报文头部的 Method
                    type: "post",           
                    success: _success, 
                    error: function () {
                        alert('error occur')
                    }
                }
            )
        }
        /**
        * return the number of rows being checked
        **/
        JSweetGrid.prototype.checkedRow = function (rowNum) {
            var rowBeingChecked = [];
            var index=0;
            var selected = $("#"+_id+" [type=checkbox]");
            for (var i = 0; i < selected.length; i++) {
                if (rowNum==undefined&&selected[i].checked) {
                    rowBeingChecked.push($("#"+_id+" input").index(selected[i]));
                }
                if(rowNum!=undefined){
                    var toSelect=rowNum[index];
                    if(i==toSelect){
                        $(selected[i]).attr("checked",true)
                        rowBeingChecked.push($("#"+_id+" input").index(selected[i]))
                        index=index+1;
                        if(index>=rowNum.length){
                            break;
                        }
                    }
                }
            }
            return rowBeingChecked;
        }
         /**
     * get the data being checked
     * return an array 
     */
        JSweetGrid.prototype.getDataChecked = function (){
            var dataChecked=[];
            var indices=this.checkedRow();
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
        JSweetGrid.prototype.refresh = function () {
        	//   function compare(num1,num2,num3){
     	    //      return function(obj1,obj2){
     	    //          var value1 = obj1[num1]*99*999+obj1[num2]*999+obj1[num3];
     	    //          var value2 = obj2[num1]*99*999+obj2[num2]*999+obj2[num3];
     	    //          return value2 - value1;  
     	    //      }
            //     }
            
                // var sortObj = _gridData.sort(compare("number1","number2","number3"));
                var sortObj=_gridData
                if($.isFunction(this.compare)){
                    sortObj.sort(this.compare);
                }
                var c=sortObj.slice(0)
                this.format(c);
                // var a="5"
                // var b={number:"5"}
                // var what=function(c){
                //     c="6"
                // }
                // var what2=function(c){
                //     c.number="6";
                // }
                // what(a)
                // what2(b)
            $("#"+_id+" .table-line").remove();
            $("#"+_id+" td").remove();
            var template=$("#"+_id+" #each_row");
     
            for (var i = 0; i < c.length; i++) {
                var person = c[i];
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
            $("#"+_id+" .update-a").click(trclick)  
            $("#total_rows").text(_allNum)                
         }
         JSweetGrid.prototype.addRowClickedListener=function(args){
           
             $("#"+_id).on("jsweetClickRow",args.data,$.proxy(args.callback,this)) 
         }
        var trclick=function(){
            var awhat=$(event.target).closest(".table-line");
            var bwhat=awhat[0]
            _curNum=$(".table-line" ).index(bwhat);
           $("#"+_id).trigger("jsweetClickRow",{curNum:_curNum,data:_gridData});
        }
         //why??
         $("#jsweet_sorted_search").click(function(){
             var content=$("#jsweet_sorted_search_content").val();
             var sort=$(".jsweet-sorted-search-sort").val();
             if(content.length==0){
                 _curPage=1;
                 _rowNum=10;
                 pageShow.val(_curPage)
                 rowNumShow.val(_rowNum)
                 _param=null;
                 thisObj.load();
             }else{
                 _curPage=1;
                 _rowNum=10;
                 pageShow.val(_curPage)
                 rowNumShow.val(_rowNum)
                 thisObj.load({param:{name:sort,value:content}});
                    // {param[sort]:content}
             }
         });
         thisObj=new JSweetGrid();
         var pageShow=$(" .cur-page-input")
         var rowNumShow=$(".row-num-span>select")
         $(".refresh-a").click(function(){
            thisObj.load()
        });
         $(" .cur-page-input").change(function(){
             var pageData=$(this).val();
             _curPage=pageData;
             thisObj.load();

         });
         $(".next-page-a i").click(function(){
             //testify if its the last one.
             //if it is.
             if(_curPage*_rowNum<_allNum){
             _curPage=_curPage+1;
             pageShow.val(_curPage);
             thisObj.load()
             }
         });
         $(".prev-page-a i").click(function(){
            //testify if its the last one.
            //if it is.
            if(_curPage>1){
            _curPage=_curPage-1;
            pageShow.val(_curPage);
            thisObj.load()
            }
        });
         $(".first-page-a i").click(function(){
             _curPage=1;
             pageShow.val(_curPage);
             thisObj.load();
         });
         $(".last-page-a i").click(function(){
            _curPage=Math.ceil(_allNum/_rowNum);
            pageShow.val(_curPage);
            thisObj.load();
        });
        $(" .row-num-span>select").change(function(){
            var rowNum=$(this).val();
            _rowNum=rowNum;
            _curPage=1;
            thisObj.load()
        });
         return thisObj
    }
    return factory
});