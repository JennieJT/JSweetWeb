define([], function () {
    /**
         *  @param {TJSweetGridConf} args
         * */
    var factory = function (args) {
        var url
        var param
        var curPage
        var rowNum
        var _curNum
        var _gridData=[]
        var _id=args.id
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
                _gridData=d.data;
                //view
                this.theGridObj.refresh();
            } else {
                alert('fail')
            }
        }
        //constructor. no function actually.
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
                    rowBeingChecked.push($("input").index(selected[i])-1);
                }
                if(rowNum!=undefined){
                    var toSelect=rowNum[index];
                    if(i==toSelect){
                        $(selected[i]).attr("checked",true)
                        rowBeingChecked.push($("input").index(selected[i])-1)
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
        JSweetGrid.prototype.refresh = function () {
        	  function compare(num1,num2,num3){
     	         return function(obj1,obj2){
     	             var value1 = obj1[num1]*99*999+obj1[num2]*999+obj1[num3];
     	             var value2 = obj2[num1]*99*999+obj2[num2]*999+obj2[num3];
     	             return value2 - value1;  
     	         }
        	    }
        	    var sortObj = _gridData.sort(compare("number1","number2","number3"));
            $("#"+_id+" #table_line").remove();
            $("#"+_id+" td").remove();
            var template=$("#"+_id+" #each_row");
     
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
            $("#"+_id+" .update-a").click(trclick)      
         }
         JSweetGrid.prototype.addRowClickedListener=function(args){
           
             $("#"+_id).on("jsweetClickRow",args.data,$.proxy(args.callback,this)) 
         }
         
        
        
        var trclick=function(){
            var awhat=$(event.target).closest("tr");
            var bwhat=awhat[0]
            _curNum=$("tr" ).index(bwhat);
            _curNum>0&&$("#"+_id).trigger("jsweetClickRow",{curNum:_curNum,data:_gridData});
        }
         //why??
         var thisObj=new JSweetGrid();
         
         return thisObj
    }
    return factory
});