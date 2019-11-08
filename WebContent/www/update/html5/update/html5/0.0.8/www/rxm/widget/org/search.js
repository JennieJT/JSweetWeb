define("rxmJsMain",[
	'RxmAppTool',
		  'RxmMobileGrid',
		  'RxmBufferGrid',
		  'RxmPageBase'
        ], function (appTool,Grid,BufferGrid,PageBase) {
    var ret = {};
    ret.init = function (the ) {  	
    	var categoryType = 1;
    	////得到上个页面传过来的值
		
		var bring =require(require.rxm.AppTool).getAppArgs().data;    
    	var titleBarBgColor = bring.titleBarBgColor;
    	var titleBarFontCololr = bring.titleBarFontCololr;
    	var selectedFontColor = bring.selectedFontColor;
    	var saveBtnBgColor = bring.saveBtnBgColor;
    	var saveBtnFontColor = bring.saveBtnFontColor;
    	var imgSrc = bring.imgSrc;
    	var data = bring.selData;
    	var multi = bring.multi;
    	var noDataCanSubmit = bring.noDataCanSubmit; 	
    	var pageSize = bring.pageSize;
    	var selData = data;
    	var tagType = bring.tagType;
    	var keyword="";
    	var gridObj = {};
	    var tdName;
	    var tdCode;  	
	    var tdSpan;
    	var userListGrid;
    	var selUserGrid;
    	var gridUrl= "/resoft/api/org/selectorg/getDeptMhForGrid";
    	var theight = $(window).height()-40-$(".org-title-bar").innerHeight();
    	var flag;
    	//下部已选grid配置
    	var selGridConfig = {
            id:"selectedListGrid",
            multi: true,
            pagination : true,
            layout:[
                {name:"部门名称",field:"deptName"}
            ],
            //初始化消息分页数据   ajax调用后台 queryMsgForPageService
            data:[]
        };	     	
    	//查询结果 grid初始化
    	var gridConfig ={
            id:"userListGrid",
            pageSize:pageSize,
            multi: true,
            pagination : true,
            height: theight,
            queryParam: {param: keyword},
            layout:  [{name:"部门名称",field:"deptName"},{name:"部门编号",field:"deptCode"}],   	          
            //每一行数据点击事件配置
            rowevent:[
                 {field:"msgTr",click:function(e,data){
                	    //获取行中复选框的选中状态 测试
                	    var checkType =  $(e.target).closest('tr').find(".multicheck").is(':checked');
                	  	//获取当前行index
                     	var index = data.index;
                      	//获取当前行数据
                     	var row = data.row;
                     	row.categoryType = categoryType;
                     	row.idx = index;
                	    if(checkType){
                	    	if(!multi){//单选
                	    		userListGrid.uncheckRow();
                	    		selData = [];
                	    		$(".specificcode .s_grid_content .table-body .msgTr").css("background-color","#FFFFFF").removeClass("orm-grid-selected-tr");
                	    		$(".specificcode .s_grid_content .table-body .msgTr").css("color","#000000");
                	    	}                 	    	
                	    	userListGrid.uncheckRow(index);
                	    	removeSame(row);
                	    	selUserGrid.reload({data:selData});	     
                	    	$(e.target).closest('tr').css("background-color","#FFFFFF");
                  	    	$(e.target).closest('tr').removeClass("orm-grid-selected-tr");
                  	    	$(e.target).closest('tr').css("color","#000000");
                  	    	refreshToolIcon();           	    	
                	    }else{
                	    	if(!multi){//单选
                	    		userListGrid.uncheckRow();
                	    		selData = [];
                	    		$(".specificcode .s_grid_content .table-body .msgTr").css("background-color","#FFFFFF").removeClass("orm-grid-selected-tr");
                	    		$(".specificcode .s_grid_content .table-body .msgTr").css("color","#000000");
                	    	}
                	    	userListGrid.checkRow(index);
                	    	removeSameAndPush(row);
                	    	row.idx = index;
                	    	selUserGrid.reload({data:selData});         	    	
                	    	$(e.target).closest('tr').css("background-color","#FFFFFF");
                  	    	$(e.target).closest('tr').addClass("orm-grid-selected-tr");
                  	    	$(e.target).closest('tr').css("color",selectedFontColor);
                  	    	refreshToolIcon();    
                	    }
                	    updateCount();
                     },press:function(e,data){
                      }
             	 }
            ],
            //初始化消息分页数据   ajax调用后台 queryMsgForPageService
            data:{
            	type: "URL",
            	value: getServer() + gridUrl
        	}
    	}; 
    	if(imgSrc == ""){
    		$(".selected-img").remove();
    	}else{
        	//添加图片
        	$(".selected-img").attr("src",imgSrc);
    	}
    	if(appTool.isIOS()){
    		$(".org-title-bar").css({"height":"60px","paddingTop":"20px"});
    		$(".selectrole").css({"top":"60px"});
    		$("#mask").css({"top":"61px"});
    	}
    	$(".org-title-bar").css("background-color",titleBarBgColor);
    	$(".org-title-bar").css("color",titleBarFontCololr);
 	    $(".content-bottom").height(theight);
 	    $(".unselected").width($(window).width()-60);	   
 	    $("#mask").height(theight+40);
 	    $(".specificcode").height(theight);
    	$('.keywordArea').css("width",$(window).width()-$('.back').width()-$('.people').width()-$('.search').width());
    	function buildCategory(){
    		var html = "";	
    		$.each(tagType,function(index,obj){
    			switch(obj){
        		case "dept":// 部门  			
        			html += "<li><span class='fa fa-cube' aria-hidden='true'></span><span data-categorytype='1'>部门</span></li>";
        			break;
        		case "user"://部门人员        			
        			html += "<li><span class='fa fa-user' aria-hidden='true'></span><span data-categorytype='2'>人员</span></li>";
        			break;
        		case "role"://角色       			
        			html += "<li><span class='fa fa-smile-o' aria-hidden='true'></span><span data-categorytype='3'>角色</span></li>";
        			break;
        		case "roleMember"://角色人员        			
        			//html += "<li><span class='fa fa-user' aria-hidden='true'></span><span data-categorytype='4'>角色人员</span></li>";
        			break;
        		case "gw"://岗位       			
        			break;
        		}
    		});
    		var $dom = $(html);
    		$(".selectrole ul").empty().append($dom);
    		$("span.person").text($(".selectrole ul").find("li:first-child").find("span:last-child").text());
    		$(".selectrole ul").find("li:first-child").css("color",selectedFontColor);
    	}
    	//初始化第一个表格
    	function initFirstGrid(){
			switch(tagType[0]){
    		case "dept":// 部门  			
    			gridUrl= "/resoft/api/org/selectorg/getDeptMhForGrid";
    			categoryType = 1;
    			break;
    		case "user"://部门人员        			
    			gridUrl= "/resoft/api/org/selectorg/getUserMhForGrid";
    			categoryType = 2;
    			break;
    		case "role"://角色       			
    			gridUrl= "/resoft/api/org/selectorg/getRoleMhForGrid";
    			categoryType = 3;
    			break;
    		case "roleMember"://角色人员        			
    			tagType[0] = tagType[1];
    			tagType[1] = tagType[2];
    			initFirstGrid();
    			break;
    		case "gw"://岗位 
    			tagType[0] = tagType[1];
    			tagType[1] = tagType[2];
    			initFirstGrid();
    			break;
    		}		
    	} 	
       	buildCategory(); 	
    	//去重
       	function removeSameAndPush(row){
    		var same = false;
    		$.each(selData,function(index,obj){
    			if(obj.categoryType==row.categoryType){
    				switch(row.categoryType){
        			case 1:
        				if(obj.deptUuid === row.deptUuid){
            				same=true;
            			}
        				break;
        			case 2:
        				if(obj.userUuid === row.userUuid  && obj.deptUuid===row.deptUuid){
            				same=true;
            			}
        				break;
        			case 3:
        				if(obj.roleUuid === row.roleUuid){
            				same=true;
            			}
        				break;
        			case 4:
        				if(obj.userUuid === row.userUuid){
            				same=true;
            			}
        				break;
        			case 5:
        				if(obj.gwUuid === row.gwUuid){
            				same=true;
            			}
        				break;
        			}
    			}			
    		});
    		!same && selData.push(row);
    	}
       	function removeSame(row){
    		$.each(selData,function(index,obj){
    			if(obj.categoryType==row.categoryType){
        			switch(row.categoryType){
        			case 1:
        				if(obj.deptUuid === row.deptUuid){
        					selData.splice(index, 1);
        					return false;
            			}
        				break;
        			case 2:
        				if(obj.userUuid === row.userUuid  && obj.deptUuid===row.deptUuid){
        					selData.splice(index, 1);
        					return false;
            			}
        				break;
        			case 3:
        				if(obj.roleUuid === row.roleUuid){
        					selData.splice(index, 1);
        					return false;
            			}
        				break;
        			case 4:
        				if(obj.userUuid === row.userUuid){
        					selData.splice(index, 1);
        					return false;
            			}
        				break;
        			case 5:
        				if(obj.gwUuid === row.gwUuid){
        					selData.splice(index, 1);
        					return false;
            			}
        				break;
        			}
    			}
    		});    		
    	}
    	//更新已选个数
       	function updateCount(){
    		var allSelD = selUserGrid.getAllData().length;
    	    if(allSelD>0){
    	    	var $count = $("<span>已选择数量：</span><span style='margin-left:5px;font-size: 18px;color:"+ selectedFontColor +";'>"+ allSelD +"</span>")
    	    	$(".unselected").empty().append($count);
    	    	$("#submit").attr("disabled", false);
    	    	$("#submit").css("background-color",saveBtnBgColor);
    	    	$("#submit").css("color",saveBtnFontColor);
    	    }else{
    	    	$(".unselected").empty().append($("<span>未选择人员/组织</span>"));
    	    	if(noDataCanSubmit){
    	    		$("#submit").attr("disabled", false);
        	    	$("#submit").css("background-color",saveBtnBgColor);
        	    	$("#submit").css("color",saveBtnFontColor);
    	    	}else{
    	    		$("#submit").attr("disabled", true);
        	    	$("#submit").css("background-color","#717171");
        	    	$("#submit").css("color","#ccc");
    	    	}
    	    }
    	}
    	///search
    	$(".search").tap(function(){
    		keyword = $("#keyword").val();
    		/// go to search 给grid的参数赋值
    		gridConfig.queryParam.param=keyword;
    		reloadUserListGrid();
    	});
    	//clearAll delete
    	$(".delete").tap(function(){
    		selData = [];
    		selUserGrid.reload({data:selData});	 
    		refreshToolIcon();
    		updateCount();
    		$(".specificcode .s_grid_content .table-body .msgTr").css("background-color","#FFFFFF").removeClass("orm-grid-selected-tr");
    		$(".specificcode .s_grid_content .table-body .msgTr").css("color","#000000");
    	});
    	//蒙版
    	$('#mask').tap(function(e){
    		$(".selectrole").hide();
    		$(".footer-top").slideUp();
			$("#mask").hide();
			$(".people .arrow").removeClass("fa-angle-up").addClass("fa-angle-down");
    	});    	
        //判断row的类型
    	function rowType(row,$tr,flag){
            if(row.categoryType ==1){
  	    	  tdName = row.deptName;
  	          tdCode = row.deptCode;
            }  	      
	  	    if(row.categoryType == 2){
	  	    	  tdName = row.userName;
	  	    	  tdCode = row.userCode;
	  	    }  		    
	  	    if(row.categoryType == 3){
	  	    	  tdName = row.roleName;
	  	    	  tdCode = row.roleCode;
	  	    }
	  	    if(row.categoryType == 4){
		    	  tdName = row.userName;
		    	  tdCode = row.userCode;
	  	    }
	  	    if(row.categoryType == 5){
	  	          tdName = row.gwName;
	  	    	  tdCode = row.gwCode;    
	  	    }
    	    if(flag == 1){
    	    	tdSpan = "<span>" + tdName + "/" + tdCode +"</span>";	  
    	    	if(row.categoryType ==2){
    	    		tdSpan += "<span style='color:gray;'>" + "/" + row.deptName +"</span>";
    	    	}
    	    	$td.append(tdSpan);
    	    }
    	    if(flag == 2){
    	    	tdSpan = "<span style='margin-left: 10px;'>" + tdName + "/" + tdCode +"</span>"; 
    	    	if(row.categoryType ==2){
    	    		tdSpan += "<span style='color:gray;'>" + "/" + row.deptName +"</span>";
    	    	}
    	    	$td.append(tdSpan);
    	    }           
            $tr.append($td);
            return $tr;
        }
    	//查询Grid的createrow
    	function mycreateRow(grid, row, $tr) {
        	var _this = grid;
	         //生成$tr对象 
	        $tdIcon = $('<td class="td-icon" style="vertical-align:middle;"></td>');
	        $IconDiv = $('<div  style="vertical-align:middle;"></div>');
	        $td = $('<td></td>');
	        $tdCheck = $('<td style="display:none;" class="fix td_checkbox"></td>');
	        row.categoryType = categoryType;
	        flag = 1;
	        rowType(row,$tr,flag);             
	        //$tr添加checkbox列  默认此列为隐藏状态 
	        $tdCheck.append('<input name="s_gird_multi_userListGrid" class="multicheck" type="checkbox">');
	        $tr.append($tdCheck);
	        return $tr;
	     }
    	//保持选中时勾选框、背景色、字体色
        function keepSelected(num){
			$("#userListGrid").find("tbody").find("tr:eq("+ num +")").css("color",selectedFontColor);
			$("#userListGrid").find("tbody").find("tr:eq("+ num +")").addClass("orm-grid-selected-tr");
			userListGrid.checkRow(num);  		
    	}
    	//保持已选数据的选中状态
        function stayStatus(){
        	var allData = userListGrid.getAllData();
        	if(allData.length && selData.length){
        		$.each(allData,function(index1,obj1){
    				var num = index1;
    	    		$.each(selData,function(index,obj){
    	    			if(obj.categoryType==obj1.categoryType){
    		    			switch(obj1.categoryType){
    		    			case 1:
    		    				if(obj.deptUuid === obj1.deptUuid){	  
    		    					//更改字体背景颜色、选中状态
    		    					keepSelected(num);
    		    					return false; 
    		        			}
    		    				break;
    		    			case 2:
    		    				if(obj.userUuid === obj1.userUuid  && obj.deptUuid===obj1.deptUuid){
    		    					keepSelected(num);
    		    					return false; 
    		        			}
    		    				break;
    		    			case 3:
    		    				if(obj.roleUuid === obj1.roleUuid){
    		    					keepSelected(num);
    		    					return false; 
    		        			}
    		    				break;
    		    			case 4:
    		    				if(obj.userUuid === obj1.userUuid){
    		    					keepSelected(num);
    		    					return false; 
    		        			}
    		    				break;
    		    			case 5:
    		    				if(obj.gwUuid === obj1.gwUuid){
    		    					keepSelected(num);
    		    					return false; 
    		        			}
    		    				break;
    		    			}
    	    			}
    	    		});
    			});
        	}
    	}
    	//查询grid初始化   	 
        function initUserListGrid() {
    	    $(".specificcode .s_grid_content tbody").html("");
    	    gridConfig.data.value = getServer() + gridUrl;
    	    userListGrid = new  Grid (gridConfig);
    	   //重写函数
    	    userListGrid.createRow = mycreateRow;
    	    userListGrid.bindSwipeInTop();
    	    userListGrid.bindSwipeInTopBegin();
    	    userListGrid.bindSwipeInTopEnd();
    	    userListGrid.bindSwipeInBottom();
    	    userListGrid.bindSwipeInBottomEnd();
     	    userListGrid.bindSwipeInBottomAfter({fn:function(){
     	    	stayStatus();
    	   }});
      	   userListGrid.bindSwipeInTopEndAfter({fn:function(){
    		   stayStatus();
    	   }});
     	   userListGrid.bindSwipeInBottom({fn:function(){
    		   $("#refresh_tip").css("display","none");
    	   }});
    	   userListGrid.bindSwipeInTop({fn:function(){
    		   $("#refresh_tip").css("display","");
    	   }});
             //开始执行
    	    userListGrid.reload({loadComplete:function(e,data){
	   		   //右侧grid有“暂无数据”时，隐藏“加载更多”
	       	   if($("#userListGrid .nodataTipTr").length >0){
	       		   $("#refresh_tip").css("display","none");		
	       	   }else{
	       		   $("#refresh_tip").css("display","");	
	       	   } 
	       	   stayStatus();
    	   }});
       	}
       //查询grid reload
       function reloadUserListGrid() {
    	   $(".specificcode .s_grid_content tbody").html("");
    	   //重写函数
    	   userListGrid.createRow = mycreateRow;
           //开始执行
    	   userListGrid.reload({ data: { type: "URL", value: getServer() + gridUrl,queryParam:{param: keyword}}, totalPage: 1,loadComplete:function(data){
   		   //右侧grid有“暂无数据”时，隐藏“加载更多”
       	   if($("#userListGrid .nodataTipTr").length >0){
       		   $("#refresh_tip").css("display","none");		
       	   }else{
       		   $("#refresh_tip").css("display","");	
       	   } 
       	   stayStatus();
    	   }});
       	}  
	    //下部弹出框Grid 
       function selCreateRow(grid, row, $tr) {
    	   var _this = grid;
	       var $tdIconBtn;
	       //生成$tr对象 
	       $tdIcon = $('<td class="td-icon" style="vertical-align:middle;"></td>');
	       $IconDiv = $('<div  style="vertical-align:middle;"></div>');
	       $td = $('<td style="width: 70%;"></td>');
	       $tdCheck = $('<td style="display:none;" class="fix td_checkbox"></td>');
	       $tdIconBtn = $('<td class="fix" style="width: 30%;"></td>');
           $tdIconBtn.append("<div style='font-size:19px;text-align:right;'><a class = 'pre-insert-icon'><i class='fa fa-arrow-circle-o-up'></i></a><a class = 'next-insert-icon'><i class = 'fa fa-arrow-circle-o-down'></i></a><a class = 'del-selrow-icon'><i class = 'fa fa-minus-circle'></i></a></div>");
           flag = 2;
           rowType(row,$tr,flag);
           //$tr添加内容列
           $tr.append($td);
	       $tr.append($tdIconBtn);	      
	       //$tr添加checkbox列  默认此列为隐藏状态 长按才会显示
	       $tdCheck.append('<input class="multicheck" type="checkbox">');
	       $tr.append($tdCheck);
	       return $tr;
	      }	 
         //更新升序降序图标
		 function refreshToolIcon(){
        	//获取表格对象
        	var trLen =$("#selectedListGrid").find("tbody").find("tr:not(.nodataTipTr)").length;
        	if(trLen>0){
        		if(trLen==1){
        			$("#selectedListGrid").find("tbody").find("tr:first").find("a:eq(0)").css("display","none");
        			$("#selectedListGrid").find("tbody").find("tr:first").find("a:eq(1)").css("display","none");
        		}else{
        			$("#selectedListGrid").find("tbody").find("tr:not(first)").find("a:eq(0)").css("display","");
        			$("#selectedListGrid").find("tbody").find("tr:not(last)").find("a:eq(1)").css("display","");
        			$("#selectedListGrid").find("tbody").find("tr:first").find("a:eq(0)").css("display","none");
        			$("#selectedListGrid").find("tbody").find("tr:first").find("a:eq(1)").css("display","");
        			$("#selectedListGrid").find("tbody").find("tr:last").find("a:eq(1)").css("display","none");
        			$("#selectedListGrid").find("tbody").find("tr:last").find("a:eq(0)").css("display","");		
        		}
        	}
         }
	       //取消勾选
		 function cancelCheck(num){
			 //取消勾选
			 userListGrid.uncheckRow(num);
			 //更改字体背景颜色、选中状态
			 $("#userListGrid").find("tbody").find("tr:eq("+ num +")").css("background-color","#FFFFFF");
			 //更改字体颜色
			 $("#userListGrid").find("tbody").find("tr:eq("+ num +")").css("color","#000000");
			 $("#userListGrid").find("tbody").find("tr:eq("+ num +")").removeClass("orm-grid-selected-tr");
        }
         //删除已选时，右侧grid该数据状态变化
		 function uncheckUserListRow(row){
			 var allData = userListGrid.getAllData();
			 $.each(allData,function(index,obj){
				 var num=index;
				 if(obj.categoryType==row.categoryType){
					 switch(row.categoryType){
					 case 1:
						 if(obj.deptUuid === row.deptUuid){
							 cancelCheck(num);
							 return false; 
							 }
						 break;
					 case 2:
						 if(obj.userUuid === row.userUuid  && obj.deptUuid===row.deptUuid){
							 cancelCheck(num);
							 return false; 
			    			}
						 break;
					 case 3:
						 if(obj.roleUuid === row.roleUuid){
							 cancelCheck(num);
							 return false; 
			    			}
						 break;
					 case 4:
						 if(obj.userUuid === row.userUuid){
							 cancelCheck(num);
							 return false; 
			    			}
						 break;
					  case 5:
						  if(obj.gwUuid === row.gwUuid){
							  cancelCheck(num);
							  return false; 
			    			}
						  break;
						}
		    		}
		    	});		
			}    
		 //已选grid初始化
		 function initSelUserListGrid() {
			 selUserGrid = new  BufferGrid (selGridConfig);
		     //重写函数
			 selUserGrid.createRow = selCreateRow;
			 selUserGrid.bindTapLineElement({
                 selector: ".pre-insert-icon",
   		      fn:function(e,data){
   		    	  var nowTr=$(e.currentTarget).parent().parent().parent(); 
   		    	  var preTr=nowTr.prev(); 
   		    	  preTr.insertAfter(nowTr); 
   		    	  refreshToolIcon();
               	 $(".selectedpersons .s_grid_table .table-body .table tbody tr").css("background","#fff");
               	 $(".pre-insert-icon").css("color","#337ab7");
   		      }
            });
			 selUserGrid.bindTapLineElement({
                 selector: ".next-insert-icon",
	   		      fn:function(e,data){
	   		    	  var nowTr=$(e.currentTarget).parent().parent().parent(); 
			    	  var nextTr=nowTr.next(); 
			    	  nextTr.insertBefore(nowTr); 
			    	  refreshToolIcon();
	               	 $(".selectedpersons .s_grid_table .table-body .table tbody tr").css("background","#fff");
	               	 $(".next-insert-icon").css("color","#337ab7");
	   		      }
            });
            selUserGrid.bindTapLineElement({
                 selector: ".del-selrow-icon",
	   		      fn:function(e,data){
	                 var index = data.index;
	                 //获取当前行数据
	               	 var row = data.row;	 
	               	 uncheckUserListRow(row);
	               	 selUserGrid.deleteRow(index); 
	               	 updateCount();
	               	 refreshToolIcon();
	               	 $(".selectedpersons .s_grid_table .table-body .table tbody tr").css("background","#fff");
	               	 $(".del-selrow-icon").css("color","#337ab7");
	   		      }
           });
	        //开始执行
			 selUserGrid.reload();
		}      
	 	//改变查询URL
		 function changeUrl(){
	 		switch(categoryType){
	 		case 1:// 部门
	 			gridUrl= "/resoft/api/org/selectorg/getDeptMhForGrid";
	 			break;
	 		case 2://部门人员
	 			gridUrl= "/resoft/api/org/selectorg/getUserMhForGrid";
	 			break;
	 		case 3://角色
	 			gridUrl= "/resoft/api/org/selectorg/getRoleMhForGrid";
	 			break;
	 		}
	 	}	
    	//点击title时 change mask
    	$(".people").tap(function () {
    		$(".selectrole").toggle();
    		//箭头变化
    		if($(".selectrole").is(':hidden')){
    			$(".people .arrow").removeClass("fa-angle-up").addClass("fa-angle-down");
    			$("#mask").hide();
    		}else{
    			$(".people .arrow").removeClass("fa-angle-down").addClass("fa-angle-up");
    			$("#mask").show();
    		}
    		if(!$(".footer-top").is(":hidden")){
    			$(".footer-top").slideUp();
			}
    	});
    	//点击不同角色
    	$(".selectrole ul li").tap(function () {
    		//对勾随点击移动而移动
    		$(".selectrole ul li").css("color","#000000");
    		$(this).css("color",selectedFontColor);
    		//得到用户选择的角色
    		categoryType = $(this).find("span:last-child").data("categorytype");
    		//标题栏随用户选择而变化
    		$(".people .person").text($(this).find("span:last-child").text());
    		$(".people").trigger('tap');
    		/// change url
    		changeUrl();
    		$(".search").trigger('tap');
    	});
    	//点击底部时弹出框
    	$(".unselected").tap(function () {
    		if($(".footer-top").is(':hidden')){   		
    			$("#mask").show();    			
    			$(".footer-top").slideDown();
    		}else{
    			$("#mask").hide();
    			$(".footer-top").slideUp();
    		}
    		if(!$(".selectrole").is(":hidden")){
				$(".selectrole").hide();
				$(".people .arrow").removeClass("fa-angle-up").addClass("fa-angle-down");
			}
    	});
    	//点击图片时
    	$(".selected-img").tap(function () {
    		 $(".unselected").trigger("tap");
    	});
    	//点击提交按钮返回首页
    	$("#submit").click(function () {
    		var selectedAll = {};
    		$.each(selData,function(index,obj){
    			var type="";
    			switch(obj.categoryType){
    			case 1:
    				type= "dept";
    				break;
    			case 2://部门人员
    				type= "user";
    				break;
    			case 3:
    				type= "role";
    				break;
    			case 4:
    				type= "roleMember";
    				break;
    			case 5:
    				type= "gw";
    				break;
    			}
    			obj.selectType  = type;   			
    			if(selectedAll[obj.selectType]==undefined){
    				selectedAll[obj.selectType] = [];
    			}
    			selectedAll[obj.selectType].push(obj);
    		});
    		PageBase.closePage({type:"submit",selectedAll:selectedAll},2);
    	});
    	//点击关闭按钮，返回上一页   	
    	$("#close").click(function (){   		
    		PageBase.closePage(selData);
    	});
    	///// 初始数据
    	initFirstGrid();
		initUserListGrid();
		initSelUserListGrid();  		
		selUserGrid.reload({data:selData});
		refreshToolIcon();
		updateCount();
    }
    return ret;
})