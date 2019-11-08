define("rxmJsMain",[
	'RxmAppTool',
		  'RxmMobileGrid',
		  'RxmBufferGrid',
		  'RxmPageBase'
        ], function (appTool,Grid,BufferGrid,PageBase) {
    	var ret = {};
    	ret.init = function (the ) {
    	//得到上个页面传过来的值
    	var config = appTool.getAppArgs().data;
		var data = config.data;
		
		//var config = the;
    	var treeDataTemp = config.treeData
    	var treeData = typeof(treeDataTemp) != "undefined" ? treeDataTemp : {};//树的初始化数据
    	var hideNode = config.hideNode;//树的隐藏节点
    	var multi = config.multi;
    	var noDataCanSubmit = config.noDataCanSubmit;
    	var tagType = config.tagType;
    	var titleBarBgColor = config.titleBarBgColor;
    	var titleBarFontCololr = config.titleBarFontCololr;
    	var selectedFontColor = config.selectedFontColor;
    	var saveBtnBgColor = config.saveBtnBgColor;
    	var saveBtnFontColor = config.saveBtnFontColor;
    	var imgSrc = config.imgSrc;
    	var pageSize = config.pageSize;
    	//初始化
    	var selData = [];  
    	var categoryType = 1;
    	var tree = {};
    	var url = "/resoft/api/org/selectorg/getAsyncDeptTree";
    	var right= {};  
    	var gridObj = {};
	    var tdName;
	    var tdCode;  	
	    var tdSpan;
    	var userListGrid;
    	var selUserGrid;
    	var gridUrl= "/resoft/api/org/selectorg/getAllChildDeptByDeptTreeIdForGrid";
    	var $td;
    	var flag;
    	var deptFlag=userFlag=roleFlag=roleMemberFlag=gwFlag=false;
    	var deptTree=userTree=roleTree=roleMemberTree=gwTree=[];
    	var firstFlag;
    	//右侧grid初始化
    	var gridConfig ={
    			id:"userListGrid",
	            pageSize:pageSize,
	            multi: true,
	            pagination : true,
	            height: theight,
	            queryParam: right,
	            layout: [{name:"部门名称",field:"deptName"},{name:"部门编号",field:"deptCode"}],   	          
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
	                     	//当前为选中状态
	                	    if(checkType){
	                	    	//取消勾选行
	                	    	if(!multi){//单选
	                	    		userListGrid.uncheckRow();
	                	    		selData = [];
	                	    		$(".specificcode .s_grid_content .table-body .msgTr").css("background-color","#FFFFFF").removeClass("orm-grid-selected-tr");
	                	    		$(".specificcode .s_grid_content .table-body .msgTr").css("color","#000000");
	                	    	}                	    	
	                	    	userListGrid.uncheckRow(index);
	                	    	//去掉已选部分此条数据
	                	    	removeSame(row);
	                	    	selUserGrid.reload({data:selData});
	                	    	//改变背景颜色、选中状态
	                	    	$(e.target).closest('tr').css("background-color","#FFFFFF");
	                  	    	$(e.target).closest('tr').removeClass("orm-grid-selected-tr");
	                  	    	$(e.target).closest('tr').css("color","#000000");
	                  	    	refreshToolIcon();           	    	
	                  	    }
	                	    else{
	                	    	if(!multi){//单选
	                	    		userListGrid.uncheckRow();
	                	    		selData = [];
	                	    		$(".specificcode .s_grid_content .table-body .msgTr").css("background-color","#FFFFFF").removeClass("orm-grid-selected-tr");
	                	    		$(".specificcode .s_grid_content .table-body .msgTr").css("color","#000000");
	                	    	}
	                	    	userListGrid.checkRow(index);
	                	    	//放入不重复数据
	                	    	removeSameAndPush(row);
	                	    	row.idx = index;
	                	    	selUserGrid.reload({data:selData});                 	    	
	                  	    	$(e.target).closest('tr').addClass("orm-grid-selected-tr");	                  	    	
	                  	    	$(e.target).closest('tr').css("color",selectedFontColor);
	                  	    	refreshToolIcon();
	                  	    }
	                	    //更新个数
	                	    updateCount();
	                	    },press:function(e,data){ }
                	    }],
                	    //初始化消息分页数据   ajax调用后台 queryMsgForPageService
                	    data:{
                	    	type: "URL",
                	    	value: getServer() + gridUrl
                	    	}
    	}; 
	    ////下部弹出框Grid
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
	  	 //单选时隐藏全选按钮
	  	 if(!multi){
	  		 $(".check").css("display","none");
	  	 }
    	if(treeData){
    		if(treeData.dept){
    			deptTree = treeData.dept;
    		}
    		if(treeData.user){
    			userTree = treeData.user;
    		}
    		if(treeData.role){
    			roleTree = treeData.role;
    		}
    		if(treeData.roleMember){
    			roleMemberTree = treeData.roleMember;
    		}
    		if(treeData.gw){
    			gwTree = treeData.gw;
    		}
    	}    	
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
    	$(".check").css("color",selectedFontColor);
    	////计算可选角色的位置
    	$('.selectrole').css("left",(($(window).width()-$('.selectrole').width())/2.0));
    	var theight = $(window).height()-80-$(".org-title-bar").innerHeight();
	    $(".content-bottom").height(theight);
	    $(".unselected").width($(window).width()-60);	   
	    $("#mask").height(theight+40);
	    $(".specificcode").height(theight); 
	    $(".list").height(theight); 
	    //初始化已选部门人员
	    function getUserListByUserAndDeptIdArr(user){
	    	$.ajax({
                url: getServer()+"/resoft/api/org/selectorg/getUserListByUserAndDeptIdArr",
                type:"post",
                //包含人员与部门ID
                data:{
                    "uuids":JSON.stringify(user)
                },
                async: false,
                dataType:"json",
                success:function(data){
                	var userData = [];
                	if(data && data.length>0&& data[0]!=null){
                		$.each(data,function(index,obj){
                			obj.categoryType = 2;
                			userData.push(obj);
                		});
                	}
                	userFlag = true;
                	selData= selData.concat(userData);
                	initSelectedUserGrid();
                },
                error:function(data){
                	userFlag = true;
                	initSelectedUserGrid();
                }
            });
	    }
	    //初始化已选部门
	    function getDeptListByDeptUuids(dept){
	    	$.ajax({
	    		url: getServer()+"/resoft/api/org/selectorg/getDeptListByDeptUuids",
	    		type:"post",
	    		//包含人员与部门ID
	    		data:{
	    			"uuids": dept.join(";")
	    		},
	    		async: false,
	    		dataType:"json",
	    		success:function(data){
	    			var deptData = [];
	    			if(data && data.length>0&& data[0]!=null){
	    				$.each(data,function(index,obj){
	    					obj.categoryType = 1;
	    					deptData.push(obj);
	    				});
	    			}
	    			deptFlag = true;
	    			selData= selData.concat(deptData);
	    			initSelectedUserGrid();
	    		},
	    		error:function(data){
	    			deptFlag = true;
	    			initSelectedUserGrid();
	    		}
	    	});
	    }
	    //初始化已选角色
	    function getRoleListByUuids(role){
	    	$.ajax({
	    		url: getServer()+"/resoft/api/org/selectorg/getRoleListByUuids",
	    		type:"post",
	    		//包含人员与部门ID
	    		data:{
	    			"uuids": role.join(";")
	    		},
	    		async: false,
	    		dataType:"json",
	    		success:function(data){
	    			var roleData = [];
	    			if(data && data.length>0&& data[0]!=null){
	    				$.each(data,function(index,obj){
	    					obj.categoryType = 3;
	    					roleData.push(obj);
	    				});
	    			}
	    			roleFlag = true;
	    			selData= selData.concat(roleData);
	    			initSelectedUserGrid();
	    		},
	    		error:function(data){
	    			roleFlag = true;
	    			initSelectedUserGrid();
	    		}
	    	});
	    }
	    //初始化已选角色人员
	    function getUserListByUuids(roleMember){
	    	$.ajax({
	    		url: getServer()+"/resoft/api/org/selectorg/getUserListByUuids",
	    		type:"post",
	    		//包含人员与部门ID
	    		data:{
	    			"uuids": roleMember.join(";")
	    		},
	    		async: false,
	    		dataType:"json",
	    		success:function(data){
	    			var roleMemberData = [];
	    			if(data && data.length>0&& data[0]!=null){
	    				$.each(data,function(index,obj){
	    					obj.categoryType = 4;
	    					roleMemberData.push(obj);
	    				});
	    			}
	    			roleMemberFlag = true;
	    			selData= selData.concat(roleMemberData);
	    			initSelectedUserGrid();
	    		},
	    		error:function(data){
	    			roleMemberFlag = true;
	    			initSelectedUserGrid();
	    		}
	    	});
	    }
	    //初始化已选岗位
	    function getGwListByDeptAndGwUuid(gw){
	    	$.ajax({
                url: getServer()+"/resoft/api/org/selectorg/getGwListByDeptAndGwUuid",
                type:"post",
                //包含人员与部门ID
                data:{
                    "dgwList":JSON.stringify(gw)
                },
                async: false,
                dataType:"json",
                success:function(data){
                	var gwData = [];
                	if(data && data.length>0&& data[0]!=null){
                		$.each(data,function(index,obj){
                			obj.categoryType = 5;
                			gwData.push(obj);
                		});
                	}
                	gwFlag = true;
                	selData= selData.concat(gwData);
                	initSelectedUserGrid();
                },
                error:function(data){
                	gwFlag = true;
                	initSelectedUserGrid();
                }
            });
	    }
    	//对象拼成数组
    	if(data){
    		if(data.dept){
    			getDeptListByDeptUuids(data.dept);
    		}else{
    			deptFlag = true;
    		}
    		if(data.user){
    			getUserListByUserAndDeptIdArr(data.user);
    		}else{
    			userFlag = true;
    		}
    		if(data.role){
    			getRoleListByUuids(data.role);
    		}else{
    			roleFlag = true;
    		}
    		if(data.roleMember){
    			getUserListByUuids(data.roleMember);
    		}else{
    			roleMemberFlag = true;
    		}
    		if(data.gw){
    			getGwListByDeptAndGwUuid(data.gw);
    		}else{
    			gwFlag = true;
    		}
    	}
    	//初始化角色选择
    	function buildCategory(){
    		var html = "";	
    		$.each(tagType,function(index,obj){
    			switch(obj){
        		case "dept":// 部门  			
        			html += "<li><span class='fa fa-cube' aria-hidden='true'></span><span data-categorytype='1'>部门</span></li>";
        			break;
        		case "user"://部门人员        			
        			html += "<li><span class='fa fa-user' aria-hidden='true'></span><span data-categorytype='2'>部门人员</span></li>";
        			break;
        		case "role"://角色       			
        			html += "<li><span class='fa fa-smile-o' aria-hidden='true'></span><span data-categorytype='3'>角色</span></li>";
        			break;
        		case "roleMember"://角色人员        			
        			html += "<li><span class='fa fa-user' aria-hidden='true'></span><span data-categorytype='4'>角色人员</span></li>";
        			break;
        		case "gw"://岗位       			
        			html += "<li><span class='fa fa-bookmark-o' aria-hidden='true'></span><span data-categorytype='5'>岗位</span></li>";
        			break;
        		}
    		});
    		var $dom = $(html);
    		$(".selectrole ul").empty().append($dom);
    		$("span.person").text($(".selectrole ul").find("li:first-child").find("span:last-child").text());
    		$(".selectrole ul").find("li:first-child").css("color",selectedFontColor);
    	}
    	buildCategory();
    	//初始化第一棵树
    	function initFirstTree(){
    		var firstLeftTree = "";
			switch(tagType[0]){
    		case "dept":// 部门  		
    			tree = deptTree;
    			url = "/resoft/api/org/selectorg/getAsyncDeptTree";
    			categoryType = 1;
    			firstLeftTree =  initDeptTree;
    			break;
    		case "user"://部门人员    
    			tree = userTree;
    			url = "/resoft/api/org/selectorg/getAsyncDeptTree";
    			categoryType = 2;
     			firstLeftTree =  initDeptTree;
    			break;
    		case "role"://角色       	
    			tree = roleTree;
    			url = "/resoft/api/org/selectorg/getAllRoleDir";
    			categoryType = 3;
     			firstLeftTree = initRoleTree;
    			break;
    		case "roleMember"://角色人员        
    			tree = roleMemberTree;
    			url = "/resoft/api/org/selectorg/getAllRoleDir";
    			categoryType = 4;
     			firstLeftTree = initRoleMemberTree;
    			break;
    		case "gw"://岗位       			
    			tree = gwTree;
    			url = "/resoft/api/org/selectorg/getAsyncDeptTree";
    			categoryType = 5;
     			firstLeftTree =  initDeptTree;
    			break;
    		}
			if(tree.length){
				firstLeftTree();		
            	//右侧Grid参数初始化
            	initRightTree(gridObj);
            	//右侧Grid表格初始化
            	initUserListGrid();
            	//角色人员时只初始化表格不执行
            	(categoryType == 4) ? 0 : reloadUserListGrid();        
			}else{
				$.ajax({
	                url: window.getServer()+ url,
	                type: "post",
	                success: function (data) {
	                	tree = data;
	                	firstLeftTree();		
	                	//右侧Grid参数初始化
	                	initRightTree(gridObj);
	                	//右侧Grid表格初始化
	                	initUserListGrid(); 
	                	(categoryType == 4) ? 0 : reloadUserListGrid();   
	                }
	            });
			}
    		initSelectedUserGrid();
    	}  	
	 	
	   function initSelectedUserGrid(){
	 		if(deptFlag&&userFlag&&roleFlag&&roleMemberFlag&&gwFlag){
				//已选表格初始化
	    		initSelUserListGrid();  
	    		selUserGrid.reload({data:selData});
	    		//刷新升序降序图标
	    		refreshToolIcon();
	    		//更新已选数字
	    		updateCount();
			}
	 	}
	 	//初始化右侧展示
	 	function initRightTree(gridObj){
	 		switch(categoryType){
	 		case 1:// 部门
	 			right= {deptTreeId:gridObj.deptTreeId};  
	 			gridUrl= "/resoft/api/org/selectorg/getAllChildDeptByDeptTreeIdForGrid";
	 			break;
	 		case 2://部门人员
	 			right= {deptUuid:gridObj.deptUuid};  
	 			gridUrl= "/resoft/api/org/selectorg/getUserByDeptUuidForGrid";
	 			break;
	 		case 3://角色
	 			right= {dirCode:gridObj.dirCode};  
	 			gridUrl= "/resoft/api/org/selectorg/getRoleByRoleDirCodeForGrid";
	 			break;
	 		case 4://角色人员
 				right= {roleUuid:gridObj.roleUuid};  		
	 			gridUrl= "/resoft/api/org/selectorg/getRoleMembersByUuidForGrid";
	 			break;
	 		case 5://岗位
	 			right= {deptUuid:gridObj.deptUuid};  
	 			gridUrl= "/resoft/api/org/selectorg/getGwByDeptUuid";
	 			break;
	 		}
	 	}	  	
    	///search
    	$(".search").tap(function(){
    		var  loadPageA= {
    		        //页面id 必填
    		        pageId: "pageAsearch",
    		        //页面名称
    		        pageName: "添加路由信息",
    		        //页面序号
					pageOrder: 0,
					pageType: "10",
    		        //页面控制  必填
    		        pageCtrlUrl: "www/rxm/widget/org/search",
    		        //页面描述
    		        pageDesc: "添加路由信息",
    		        //页面路由地址  必填
    		        pageRouter: "pageARouter",
    		        //页面地址  必填
    		        pageUrl: "www/rxm/widget/org/views/search.html",
    		        //打开方式
    		        pageOpen  :"_blank"
    		}
    		PageBase.slidebar(loadPageA,{
                title: "侧边栏",
                data: {selData:selData,
                	 	tagType:tagType,
                        titleBarBgColor: titleBarBgColor,
                        titleBarFontCololr: titleBarFontCololr,
                        selectedFontColor: selectedFontColor,
                        saveBtnBgColor: saveBtnBgColor,
                        saveBtnFontColor: saveBtnFontColor,
                        imgSrc: imgSrc,
                        multi:multi,
                        noDataCanSubmit: noDataCanSubmit,
                        pageSize:pageSize
                	 	},
                hiddenTitleBar:  1,
                hiddenBackBtn: false,
                afterClose: function(evt,args){//导航视图 关闭完成后回调    
                	if(args!="null"){
                		selData = JSON.parse(args);   
                	}
                	selUserGrid.reload({data:selData});	 
                	reloadUserListGrid();
                	refreshToolIcon();
            		updateCount();
                }
    		});
    	});
    	//clearAll delete
    	$(".delete").tap(function(){
    		selData = [];
    		selUserGrid.reload({data:selData});
    		refreshToolIcon();
    		updateCount();
    		$(".specificcode .s_grid_content .table-body .msgTr").css("background-color","#FFFFFF").removeClass("orm-grid-selected-tr");
    		$(".specificcode .s_grid_content .table-body .msgTr").css("color","#000000");
    		$(".check").empty().append($("<span data-allCheck=1>全选</span>"));
    	});
    	//全选初始化
    	function initAllCheck(){
    		$(".check").empty().append($("<span data-allCheck=1>全选</span>"));
    	}
    	//checkAll
    	$(".check").tap(function(){
    		var allCheck = $(this).find("span").data("allcheck");
    		if(allCheck == 1){
        		//勾选所有行
    			userListGrid.checkRow();
        		var allD = userListGrid.getAllData();
        		$.each(allD,function(index,row){
        			row.categoryType = categoryType;
        			row.idx = index;
        			removeSameAndPush(row);
        		});
        		///change color
        		$(".specificcode .s_grid_content .table-body .msgTr").css("background-color","#FFFFFF").addClass("orm-grid-selected-tr");
        		$(".specificcode .s_grid_content .table-body .msgTr").css("color",selectedFontColor);
    			selUserGrid.reload({data:selData});	 
    			refreshToolIcon();
    			updateCount();
    			//改变字
    			$(".check").empty().append($("<span data-allCheck=0>全不选</span>"));	
    		}
    		//全不选
    		else{
    			//取消勾选所有行
    			userListGrid.uncheckRow()
        		var allD = userListGrid.getAllData();
        		$.each(allD,function(index,row){
        			row.categoryType = categoryType;
        			removeSame(row);
        		});
    			$(".specificcode .s_grid_content .table-body .msgTr").css("background-color","#FFFFFF").removeClass("orm-grid-selected-tr");
    			$(".specificcode .s_grid_content .table-body .msgTr").css("color","#000000");
    			selUserGrid.reload({data:selData});
    			refreshToolIcon();
    			updateCount();
    			$(".check").empty().append($("<span data-allCheck=1>全选</span>"));
    		}
    	});
    	//如果重复不加入已选
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
        				if(obj.userUuid === row.userUuid && obj.deptUuid===row.deptUuid){
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
    	//去重（去掉已选部分）
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
    	    if(row.categoryType == 2 || row.categoryType == 4){
    	    	  tdName = row.userName;
    	    	  tdCode = row.userCode;
    	    }  		    
    	    if(row.categoryType == 3){
    	    	  tdName = row.roleName;
    	    	  tdCode = row.roleCode;
    	    }
    	    if(row.categoryType == 5){
    	          tdName = row.gwName;
    	    	  tdCode = row.gwCode;      
    	    }
    	    //右侧grid
    	    if(flag == 1){
    	    	tdSpan = "<span>" + tdName + "/" + tdCode +"</span>";	    	 	    	
    	    }
    	    //已选grid
    	    if(flag == 2){
    	    	tdSpan = "<span style='margin-left: 10px;'>" + tdName + "/" + tdCode +"</span>";
    	    	if(row.categoryType ==2){
    	    		tdSpan += "<span style='color:gray;'>" + "/" + row.deptName +"</span>";
    	    	}
    	    }
            $td.append(tdSpan);
            $tr.append($td);
            return $tr;
        }	 
    	//右侧grid的createrow
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
    	//初始化右侧grid   	 
       function initUserListGrid() {
    	   $(".specificcode .s_grid_content tbody").html("");
    	   gridConfig.queryParam =  right;
    	   gridConfig.data.value = getServer() + gridUrl;
    	   userListGrid = new  Grid (gridConfig);
    	   //重写函数
    	   userListGrid.createRow = mycreateRow;
    	   //滑动到顶事件
    	   userListGrid.bindSwipeInTop();
    	   //滑动到顶开始事件
    	   userListGrid.bindSwipeInTopBegin();
    	   //滑动到顶结束事件
    	   userListGrid.bindSwipeInTopEnd();
//    	   userListGrid.bindSwipeInTopEnd({fn:function(){
//    		   $(".check").empty().append($("<span data-allCheck=1>全选</span>"));
//    	   }});
    	   //滑动到底事件
    	   userListGrid.bindSwipeInBottom();
    	   //滑动到底结束事件
    	   userListGrid.bindSwipeInBottomEnd();
    	   //滑动到底事件完成自定义绑定事件
    	   userListGrid.bindSwipeInBottomAfter({fn:function(){
    		   stayStatus();
    	   }});
    	   //滑动到顶结束事件完成绑定自定义事件
     	   userListGrid.bindSwipeInTopEndAfter({fn:function(){
    		   stayStatus();
    	   }});
    	   userListGrid.bindSwipeInBottom({fn:function(){
    		   $("#refresh_tip").css("display","none");
    	   }});
    	   userListGrid.bindSwipeInTop({fn:function(){
    		   $("#refresh_tip").css("display","");
    	   }});
       	}       
       //reload右侧grid
       function reloadUserListGrid() {
    	   $(".specificcode .s_grid_content tbody").html("");
    	   $(".content-right-bottom").css("display","");
            //开始执行
    	   userListGrid.reload({ data: { type: "URL", value: getServer() + gridUrl,queryParam:right}, totalPage: 1,loadComplete:function(data){
   		   //右侧grid有“暂无数据”时，隐藏“加载更多”
       	   if($("#userListGrid .nodataTipTr").length >0){
       		   $("#refresh_tip").css("display","none");		
       	   }else{
       		   $("#refresh_tip").css("display","");	
       	   }
       	   stayStatus();
       	   } });  	   
	   }
       //重新reload右侧gird
       function reloadRightGrid(gridObj){
   			initRightTree(gridObj);
   			reloadUserListGrid();
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
	  	 //已选grid的createrow
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
		      $tr.append($tdIconBtn);	      
		      //$tr添加checkbox列  默认此列为隐藏状态 长按才会显示
		      $tdCheck.append('<input class="multicheck" type="checkbox">');
		      $tr.append($tdCheck);
		      return $tr;
	      }	 		 
	  	//更新图标
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
		 //初始化已选grid
		 function initSelUserListGrid() {
			 selUserGrid = new  BufferGrid (selGridConfig);
		     //重写函数
			 selUserGrid.createRow = selCreateRow;
			 //重新行点击事件
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
	               	 var allDelData = selUserGrid.getAllData();
	               	 if(allDelData.length==0){
	               		$(".check").empty().append($("<span data-allCheck=1>全选</span>"));
	               	 }
	               	 $(".selectedpersons .s_grid_table .table-body .table tbody tr").css("background","#fff");
	               	 $(".del-selrow-icon").css("color","#337ab7");
	   		      }
           });
	        //开始执行
		   selUserGrid.reload();
		} 
    	//点击上边
    	$(".selectcontent").on("tap",".treetop",function(){
    		initAllCheck();
    		switch(categoryType){
	    		case 1:// 部门
	    			tree = deptTree;
	    			break;
	    		case 2://部门人员
	    			tree = userTree;
	    			break;
	    		case 3://角色
	    			tree = roleTree;
	    			break;
	    		case 4://角色人员
	    			tree = roleMemberTree;
	    			break;
	    		case 5://岗位
	    			tree = gwTree;
	    			break;
    		}
    		if(categoryType==1 || categoryType==2 || categoryType==5 ){
	    		var deptTreeId = $(this).data("depttreeid");
	    		var deptUuid = $(this).data("deptuuid");
	    		gridObj.deptTreeId = deptTreeId;
	    		gridObj.deptUuid = deptUuid;
	    		$(this).nextAll().remove();
	    		if(tree.length){
	    			var childData = getChildByDeptTree(deptTreeId);
	    			if(childData.length){
                		generateLeft(childData);//重画
                	}else{
                		generateLeft([]);
                	}
	    		}else{
		    		$.ajax({
		                url: window.getServer()+ url,
		                type: "post",
		                data: {deptTreeId:deptTreeId},
		                success: function (data) {
		                	if(data && data.length){
		                		generateLeft(data);//重画
		                	}else{
		                		generateLeft([]);
		                	}
		                }
		            });
	    		}
	    		reloadRightGrid(gridObj);
    		}
    		else if(categoryType==3){
    			var dirCode = $(this).data("dircode");
    			gridObj.dirCode = dirCode;
    			$(this).nextAll().remove();
    			if(tree.length){
    				var allChild=getChildByRoleTree(dirCode);//找点击角色类别的所有孩子节点
            		roleLeft(allChild);//重画  
	    		}else{
	    			$.ajax({
	                    url: window.getServer()+ url,
	                    type: "post",
	                    data: {},
	                    success: function (data) {
	                    	tree = data;
	                    	var allChild=getChildByRoleTree(dirCode);//找点击角色类别的所有孩子节点
	                		roleLeft(allChild);//重画  
	                    }
	                });
	    		}
    			reloadRightGrid(gridObj);
    		}
    		else{
    			var dirCode = $(this).data("dircode");
    			$(this).nextAll().remove();
    			var roleCode = $(this).data("rolecode");
    			//点击角色类别，重画左边（角色三级）
    			if(roleCode == 1){
    				if(tree.length){
    					var allChild=getChildByRoleTree(dirCode);//找当前点击的角色类别的所有子类别 
                    	roleLeft(allChild);//重画左边的子类别
                    	//查询角色类别下角色并加入左侧
                    	roleCategory(dirCode);
                    	$(".specificcode .s_grid_content tbody").html(""); 
                    	$(".content-right-bottom").css("display","none");
    	    		}else{
    	    			$.ajax({
                            url: window.getServer()+ url,
                            type: "post",
                            data: {},
                            success: function (data) {
                            	tree = data;
                            	//查询角色类别下子类别
                            	var allChild=getChildByRoleTree(dirCode);//找当前点击的角色类别的所有子类别 
                            	roleLeft(allChild);//重画左边的子类别
                            	//查询角色类别下角色并加入左侧
                            	roleCategory(dirCode);
                            	$(".specificcode .s_grid_content tbody").html("");
                            	$(".content-right-bottom").css("display","none");
                            }
                        }); 
    	    		}
    			}
    		}
    	});
    	//点击左边
    	$(".level").on("tap",".treeleft",function(){
    		$(".level").find("ul").find("li").css("color","#000000");
    		$(".level").find("ul").find("li").css("background-color","#EAEAEA");
    		$(this).css("background-color","#ffffff");
    		$(this).css("color",selectedFontColor);
    		$(".selectcontent").css("color",selectedFontColor);
    		initAllCheck();
    		switch(categoryType){
    		case 1:// 部门
    			tree = deptTree;
    			break;
    		case 2://部门人员
    			tree = userTree;
    			break;
    		case 3://角色
    			tree = roleTree;
    			break;
    		case 4://角色人员
    			tree = roleMemberTree;
    			break;
    		case 5://岗位
    			tree = gwTree;
    			break;
    		}  		
    		if(categoryType==1 || categoryType==2 || categoryType==5 ){
    	   		var deptTreeId = $(this).data("depttreeid");
    	   		var deptUuid = $(this).data("deptuuid");
    	   		gridObj.deptTreeId = deptTreeId;
    	   		gridObj.deptUuid = deptUuid;
    	   		var big =  "<span class='big'>"+ ">"+"</span>";
        		var $span = $("<span data-deptUuid='"+ deptUuid +"' data-deptTreeId='"+ deptTreeId +"'>"+ big+$(this).text()+"</span>").addClass("treetop");
        		if(tree.length){
        			var childData = getChildByDeptTree(deptTreeId);
        			if(childData.length == 0){                   		
                	}
                	else{
                		generateLeft(childData);//重画
                		$(".selectcontent").append($span);
                	} 
        		}else{
        			$.ajax({
                        url: window.getServer()+ url,
                        type: "post",
                        data: {deptTreeId:deptTreeId},
                        success: function (data) {
                        	if(data.length == 0){                   		
                        	}
                        	else{
                        		generateLeft(data);//重画
                        		$(".selectcontent").append($span);
                        	}                    	
                        }
                    }); 
        		}
    			reloadRightGrid(gridObj);
    		}else if(categoryType==3){
    			var dirCode =  $(this).data("dircode");
    			var $span = $("<span data-dirCode='"+ dirCode +"'>"+ ">"+$(this).text() +"</span>").addClass("treetop");
    			gridObj.dirCode = dirCode;
    			if(tree.length){
    				var allChild=getChildByRoleTree(dirCode);//找当前点击的角色类别的所有孩子节点                    	
                	if(allChild.length == 0){
                		///显示该角色类别下的所有角色，reload右侧
                		}   
                	//如果有孩子节点，则重画左边、点击节点移上去
                	else{
                		roleLeft(allChild);//重画
                		$(".selectcontent").append($span);
                	} 
        		}else{
        			$.ajax({
                        url: window.getServer()+ url,
                        type: "post",
                        data: {},
                        success: function (data) {
                        	tree = data;
                        	var allChild=getChildByRoleTree(dirCode);//找当前点击的角色类别的所有孩子节点                    	
                        	if(allChild.length == 0){
                        		///显示该角色类别下的所有角色，reload右侧
                        		}   
                        	//如果有孩子节点，则重画左边、点击节点移上去
                        	else{
                        		roleLeft(allChild);//重画
                        		$(".selectcontent").append($span);
                        	}
                        }
                    });
        		}
    			reloadRightGrid(gridObj);
    		}
    		//角色人员
    		else{
        		var dirCode = $(this).data("dircode");
        		var roleCode = $(this).data("rolecode");
        		var $span = $("<span data-dirCode='"+ dirCode +"' data-roleCode='"+ roleCode +"'>"+ ">"+$(this).text()+"</span>").addClass("treetop");
        		//如果点击角色类别
        		if(roleCode == 1){
        			if(tree.length){
        				//查询角色类别下子类别
                    	var allChild=getChildByRoleTree(dirCode);//找当前点击的角色类别的所有子类别 
                    	roleLeft(allChild);//重画左边的子类别
                    	//查询角色类别下角色并加入左侧
                    	roleCategory(dirCode);
                    	$(".selectcontent").append($span); 
                    	$(".specificcode .s_grid_content tbody").html("");
                    	$(".content-right-bottom").css("display","none");
            		}else{
            			$.ajax({
                            url: window.getServer()+ url,
                            type: "post",
                            data: {},
                            success: function (data) {
                            	tree = data;
                            	//查询角色类别下子类别
                            	var allChild=getChildByRoleTree(dirCode);//找当前点击的角色类别的所有子类别 
                            	roleLeft(allChild);//重画左边的子类别
                            	//查询角色类别下角色并加入左侧
                            	roleCategory(dirCode);
                            	$(".selectcontent").append($span); 
                            	$(".specificcode .s_grid_content tbody").html("");
                            	$(".content-right-bottom").css("display","none");
                            }
                        }); 
            		}
        		}
        		//如果点击具体角色
				else{
					var roleUuid = $(this).data("roleuuid");
					gridObj.roleUuid = roleUuid;
					///直接查询角色下的人员
					reloadRightGrid(gridObj);
				}				  					
    		}
    	});
    	//查询具体角色类别下所有角色
    	function roleCategory(dirCode){
    		var roleUrl = "/resoft/api/org/selectorg/getAllRole";
			$.ajax({
				url: window.getServer()+roleUrl,
				type: "post",
				data: {},				
				success:function(data){
					//拿到所有角色
					var allChild = getRoleTree(data,dirCode);//根据dircode拿到对应角色
					//重画左边（具体角色）
					roleLeft3(allChild);
				}
			});
    	}   	
    	//根据dirCode，拿到对应角色
    	function getRoleTree(matchRole,dirCode){
    		var allChild = [];
    		$.each(matchRole,function(index,obj){
    			if(obj.dirCode == dirCode){
    				allChild.push(obj);
    			}
    		});
    		return allChild;
    	}
    	//调用对应的服务得到组织树
    	function initAllTree(){
    		//不同角色调用不同服务
    		switch(categoryType){
    		case 1:// 部门
    			tree = deptTree;
    			url = "/resoft/api/org/selectorg/getAsyncDeptTree";
    			break;
    		case 2://部门人员
    			tree = userTree;
    			url = "/resoft/api/org/selectorg/getAsyncDeptTree";
    			break;
    		case 3://角色
    			tree = roleTree;
    			url = "/resoft/api/org/selectorg/getAllRoleDir";
    			break;
    		case 4://角色人员
    			tree = roleMemberTree;
    			url = "/resoft/api/org/selectorg/getAllRoleDir";
    			break;
    		case 5://岗位
    			tree = gwTree;
    			url = "/resoft/api/org/selectorg/getAsyncDeptTree";
    			break;
    		}
    		if(tree.length){
    			if(categoryType == 1|| categoryType == 2||categoryType == 5){
					initDeptTree();
            		reloadRightGrid(gridObj);
        		}
            	else if(categoryType == 3){
            		initRoleTree();
            		reloadRightGrid(gridObj);
            	}
            	else{
            		initRoleMemberTree();
            	}
    		}else{
    			$.ajax({
                    url: window.getServer()+ url,
                    type: "post",
                    success: function (data) {
                    	tree = data;
                    	if(categoryType == 1|| categoryType == 2||categoryType == 5){
							initDeptTree();
                    		reloadRightGrid(gridObj);
                		}
                    	else if(categoryType == 3){
                    		initRoleTree();
                    		reloadRightGrid(gridObj);
                    		}
                    	else{
                    		initRoleMemberTree();
                    	}               		
                    }
                });
    		}
    	}
    	//得到部门树的节点
    	function getChildByDeptTree(code){
    		var child = [];
    		$.each(tree,function(index,obj){
    			if(obj.pDeptTreeId == code){
    				child.push(obj);
    			}
    		});
    		return child;
    	}
    	//得到角色树的节点
    	function getChildByRoleTree(role){
    		var roleChild = [];
    		$.each(tree,function(index,obj){
    			if(obj.pDirCode == role){
    				roleChild.push(obj);
    			}
    		});
    		return roleChild;
    	}   	
    	//重画左边（部门）
    	function generateLeft(child){
    		$(".level ul").html("");
    		//过滤hideNode
    		var node = [];//要隐藏的节点
    		switch(categoryType){
				case 1:
					node = treeData.dept ? [] : hideNode.dept ? hideNode.dept : [];
					break;
				case 2://部门人员
					node = treeData.user ? [] : hideNode.user ? hideNode.user : [];
					break;
				case 5:
					node = treeData.gw ? [] : hideNode.gw ? hideNode.gw : [];
					break;
			}
    		
    		$.each(child,function(index,obj){
    			if(node.length){
    				$.each(node,function(i,o){
        				if(obj.deptCode == o){
        					return false;
        				}else{
        					$(".level ul").append("<li class='treeleft' data-deptUuid='"+ obj.deptUuid +"' data-deptTreeId='"+ obj.deptTreeId  +"'>"+obj.deptName+"</li>");
        				}
        			});
    			}else{
    				$(".level ul").append("<li class='treeleft' data-deptUuid='"+ obj.deptUuid +"' data-deptTreeId='"+ obj.deptTreeId  +"'>"+obj.deptName+"</li>");
    			}
    			
    		});
    	}
    	//重画左边（角色类别）
    	function roleLeft(roleChild){
    		$(".level ul").html("");
    		//过滤hideNode
    		var node = [];//要隐藏的节点
    		switch(categoryType){
				case 3:
					node = treeData.role ? [] : hideNode.role ? hideNode.role : [];
					break;
				case 4:
					node = treeData.roleMember ? [] : hideNode.roleMember ? hideNode.roleMember : [];
					break;
			}
    		$.each(roleChild,function(index,obj){
    			if(node.length){
    				$.each(node,function(i,o){
        				if(obj.dirCode == o){
        					return false;
        				}else{
        					$(".level ul").append("<li class='treeleft' data-dirCode='"+ obj.dirCode +"' data-roleCode='1' >"+obj.dirName+"</li>");
        		    	}
        			});
    			}else{
    				$(".level ul").append("<li class='treeleft' data-dirCode='"+ obj.dirCode +"' data-roleCode='1' >"+obj.dirName+"</li>");
    			}
    			
    		});
    	}
    	//重画左边（具体角色）
    	function roleLeft3(roleChild3){
    		//角色类别拼接具体角色， 不清空
    		$.each(roleChild3,function(index,obj){
    			$(".level ul").append("<li class='treeleft' data-dirCode='"+ obj.dirCode +"' data-roleUuid='"+ obj.roleUuid +"'  data-roleCode='"+ obj.roleCode +"'>"+obj.roleName+"</li>");
    		});
    	}    	
    	//初始化部门树
    	function initDeptTree(){
			var root
			if(typeof(getChildByDeptTree(null)[0])!== "undefined"){
				root = getChildByDeptTree(null)[0]
			}else if(typeof(getChildByDeptTree("")[0])!== "undefined"){
				root = getChildByDeptTree("")[0]
			}else if(typeof(getChildByDeptTree("null")[0])!== "undefined"){
				root = getChildByDeptTree("null")[0]
			}else if(typeof(getChildByDeptTree("NULL")[0])!== "undefined"){
				root = getChildByDeptTree("NULL")[0]
			}
    		
    		var child = getChildByDeptTree(root.deptTreeId);
    		//显示根节点
    		var $selectcontent = $("<span class='treetop'  data-deptUuid='"+ root.deptUuid +"' data-deptTreeId='"+ root.deptTreeId  +"'>"+ root.deptName +"</span>");
    		//jquery选择class为selectcontent的对象，赋值为selectcontent
    		$(".selectcontent").html($selectcontent);
    		//生成二级目录
    		generateLeft(child);   
    		//生成右侧具体信息
    		gridObj.deptTreeId = root.deptTreeId;
    		gridObj.deptUuid = root.deptUuid;
    	}    	
    	//初始化角色树
    	function initRoleTree(){
    		var roleRoot =  getChildByRoleTree(null)[0];
    		var roleChild = getChildByRoleTree(roleRoot.dirCode);
    		var $selectcontent =  $("<span class='treetop' data-dirCode='"+ roleRoot.dirCode +"'>"+ roleRoot.dirName +"</span>");
    		$(".selectcontent").html($selectcontent);
    		//生成二级目录
    		roleLeft(roleChild);
    		//生成二级目录具体信息
    		gridObj.dirCode = roleRoot.dirCode;			
    	}    	
    	//初始化角色人员树
    	function initRoleMemberTree(){
    		var roleRoot =  getChildByRoleTree(null)[0];
    		var roleChild = getChildByRoleTree(roleRoot.dirCode);
    		var rootChild = [];//定义直属于根下的所有角色数组
    		var $selectcontent =  $("<span class='treetop' data-dirCode='"+ roleRoot.dirCode +"' data-roleCode='1' >"+ roleRoot.dirName +"</span>");
    		$(".selectcontent").html($selectcontent);
    		//生成二级目录——角色类别
    		roleLeft(roleChild);
    		//生成具体角色
    		roleCategory(roleRoot.dirCode);
    		//角色人员不初始化，当点击具体角色时才显示对应人员
			$(".specificcode .s_grid_content tbody").html("");
			$(".content-right-bottom").css("display","none");
    	}   	
    	//点击title时
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
    	//点击角色时
    	$(".selectrole ul li").tap(function () {
    		$(".selectrole ul li").css("color","#000000");
    		$(this).css("color",selectedFontColor);
    		//得到用户选择的角色
    		categoryType = $(this).find("span:last-child").data("categorytype");
    		//标题栏随用户选择而变化
    		$(".people .person").text($(this).find("span:last-child").text());
    		//全选初始化
    		initAllCheck();
    		//调用函数选择对应的服务
    		initAllTree();
    		$(".people").trigger('tap');
    	});
    	//点击底部时弹出框
    	$(".unselected").tap(function () {
    		//弹出框隐藏时，点击底部，弹出框显示，蒙版显示；弹出框显示时，点击底部，弹出框隐藏，蒙版隐藏
    		if($(".footer-top").is(':hidden')){   		
    			$("#mask").show();    			
    			$(".footer-top").slideDown();
    		}else{
    			$("#mask").hide();
    			$(".footer-top").slideUp();
    		}
    		//顶部显示时，点击底部隐藏顶部
    		if(!$(".selectrole").is(":hidden")){
				$(".selectrole").hide();			
				$(".people .arrow").removeClass("fa-angle-up").addClass("fa-angle-down");
			}  		
    	});
    	//点击图片时$(".people .arrow").removeClass("fa-angle-up").addClass("fa-angle-down");
    	$(".selected-img").tap(function () {
    		 $(".unselected").trigger("tap");
    	});
    	//点击返回
    	$("#close").tap(function () {
    		PageBase.closePage({type:"back"});
		});
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
    		PageBase.closePage({type:"submit",selectedAll:selectedAll});
    	});
    	///// 初始数据
    	initFirstTree();
    }
    return ret;
})