define([], function() {
	//渲染表格搜索框、工具栏
    function initSearchToolBar(operation, task) {
			//搜索框宽度
		    var inputWidth= window.screen.width-135+"px";
		    //清空按钮位置宽度
		    var dw= window.screen.width-155+"px";
			//搜索bar
			var $searchBarContain = $('<div class="searchbar-contain"></div>');
			//搜索图标
		    var searchImg = getServer()+"/www/core/page/common/img/search-gray.png";
		    //搜索框清空图标
		    var cleanImg = getServer()+"/www/core/page/common/img/delete.png";
		    //高级搜索图标
		    var advanceImg = getServer()+"/www/core/page/common/img/adv.png";
		    //编辑图标
		    var editImg = getServer()+"/www/core/page/common/img/editbtn.png";
		    //搜索与高级搜索Content
		    var $searchBtnContent = $('<div class="searchbtn-contain"></div>');
		    
		    if(task=="task"){
		    	 //生成搜索框
		        var searchWidth=window.screen.width-130-30+"px";
		        var $searchInput=$('<div style="margin-top:3px;height:30px;border:1px solid #a7a7a7;border-radius:6px;float:left;width:'+inputWidth+'">'+
		        		'<select style="width:'+inputWidth+';height:30px;border:0px;background: transparent;" type="text" class="form-control" id="planType" name="planType">'+
						'<option value="">--请选择计划类型--</option>'+
						'<option value="1">双随机抽查</option>'+
						'<option value="2">专项检查</option>'+
						'<option value="3">隐患核查</option>'+
					'</select></div>');
		        $searchInput.appendTo($searchBarContain);  
		    }else{
		    	
		    
		    	var $tipDiv = $('<div class="search-tip"><img class="search-icon" src="' + searchImg +'"/></div>');
		    	var $cleanDiv = $('<div class="search-clean" style="margin-left:'+ dw +'"><img class="delete-icon" src="' + cleanImg +'"/></div>');
		    	//生成搜索框
			    //var $searchInput = $('<input class="search-input" style="width:'+inputWidth+'" placeholder="请输入搜索内容" id="searchbar"/>');
		    	
		    	var $searchInput = $('<input  class="search-input" style="width:'+inputWidth+'" placeholder="请输入搜索内容" id="searchbar"/>');
		    	$tipDiv.appendTo($searchBarContain);  
			    $searchInput.appendTo($searchBarContain);  
			    $cleanDiv.appendTo($searchBarContain); 
		    }
		    //编辑按钮
		    var $editBtn = $('<img class="edit-btn" style="margin-top: 4px;" src="' + editImg +'"/>');
		    //高级搜索按钮
		    var $advanceSearchBtn = $('<img class="advance-search-btn" style="margin-top: 4px;"  src="' + advanceImg + '"/>');
		    //工具栏
		    var $toolbar = $('<div class="toolbar-contain"></div>');
		    //退出
		    var $cancelSelectBtn = $('<div class="cancelsel-btn">取消</div>');
		    //取消全选
		    $cancelSelectBtn.appendTo($toolbar);
		    if(operation=="save"){
		    	var $saveBtn = $('<div class="contral-btn"><a class="contral-btn-a"><i class="fa fa-save"></i>&nbsp;保存到本地</a></div>');
		    	var $allSelectBtn = $('<div class="allsel-btn"><input class="multicheck allsel-btn2" type="checkbox"></div>');
			    $saveBtn.appendTo($toolbar);
			    $allSelectBtn.appendTo($toolbar);
		    }else if(operation=="delete"){
		    	 var $delBtn = $('<div class="contral-btn"><a class="contral-btn-a"><i class="fa fa-trash-o"></i>&nbsp;&nbsp;&nbsp;删除</a></div>');
		    	 var $allSelectBtn = $('<div class="allsel-btn"><input class="multicheck allsel-btn2" type="checkbox"></div>');
		    	 $delBtn.appendTo($toolbar);
		    	 $allSelectBtn.appendTo($toolbar);
		    }else if(operation=="upload"){
		    	 var $saveBtn = $('<div class="contral-btn" id="btn-upload"><a class="contral-btn-a"><i class="fa fa-save"></i>&nbsp;&nbsp;&nbsp;上传</a></div>');
		         var $delBtn = $('<div class="contral-btn" id="btn-del"><a class="contral-btn-a"><i class="fa fa-trash-o"></i>&nbsp;&nbsp;&nbsp;删除</a></div>');
		         //全选
		         var $allSelectBtn = $('<div class="allsel-btn" style="width:13% !important"><input class="multicheck" type="checkbox"></div>');
		         $saveBtn.appendTo($toolbar);
		         $delBtn.appendTo($toolbar);
		         $allSelectBtn.appendTo($toolbar);
		    }
		    //添加高级搜索按钮
		    $advanceSearchBtn.appendTo($searchBtnContent);
		    //添加搜索按钮
		    $editBtn.appendTo($searchBtnContent);	
		    $searchBtnContent.appendTo($searchBarContain);
		    $(".s_grid_searchbar").append($searchBarContain);
		    //$(".s_grid_searchbar").append($toolbar);
		    $(".s_grid_toolbar").append($toolbar);
		    //搜索框输入搜索条件触发搜索事件
	        $(".search-input").on("input oninput", function() {
	           	if($(".search-input").val()!=""){
	           		$(".search-clean").css("display","block");
	    			$(".tip-word").hide();
	    		}else{
	    			$(".search-clean").css("display","none");
	    			$(".tip-word").show();
	    		}
	        });   
	}
	
	//获取当前系统时间  格式：yyyy-mm-dd hh:mm:ss
    function getNowDate() {
    	    var date = new Date();
    	    var seperator1 = "-";
    	    var seperator2 = ":";
    	    var month = date.getMonth() + 1;
    	    var strDate = date.getDate();
    	    if (month >= 1 && month <= 9) {
    	        month = "0" + month;
    	    }
    	    if (strDate >= 0 && strDate <= 9) {
    	        strDate = "0" + strDate;
    	    }
    	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    	            + " " + date.getHours() + seperator2 + date.getMinutes()
    	            + seperator2 + date.getSeconds();
    	    return currentdate;
    } 
    
    //将json对象转化的json字符串中的双引号进行转义
    function jsonToStr(jsonObj) {
	   	return JSON.stringify(jsonObj).replace(new RegExp('(["\"])', 'g'),"\\\"");
    }
    
    //去掉内容中的回车符
    function cleanStr(str) {
        if ($.isExist(str)) {
            return str.replace(/[\r\n]/g, "");
        } else {
            return str;
        }
    }

    //四舍五入
    function fomatFloat(src, pos) {
        return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    }

	return {
		initSearchToolBar:initSearchToolBar,
		getNowDate:getNowDate,
		jsonToStr:jsonToStr,
		cleanStr: cleanStr,
		fomatFloat: fomatFloat
	};
});