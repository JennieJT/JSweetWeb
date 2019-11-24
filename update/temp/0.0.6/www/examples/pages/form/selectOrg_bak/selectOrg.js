/// <reference path="../../../jslib/examples/examplesImport.js" />
define([
	require.rxm.PageBase,
	require.rxm.BufferGrid
],
/**
 * @param {rxm.Page} PageBase
 */
function (PageBase, BufferGrid) {
	var selOrg = {};
	selOrg.init = function () {
		var selUserGrid;
		var selData = [];
		var treeData = {
			"role": [{
				"dirCode": "333",
				"dirName": "333",
				"extend1": null,
				"extend2": null,
				"extend3": null,
				"hierarchyAuth": null,
				"hierarchyAuthName": null,
				"pDirCode": "RD001",
				"pdirname": "财务相关"
			}, {
				"dirCode": "4444",
				"dirName": "4444",
				"extend1": null,
				"extend2": null,
				"extend3": null,
				"hierarchyAuth": null,
				"hierarchyAuthName": null,
				"pDirCode": "RD001",
				"pdirname": "财务相关"
			}, {
				"dirCode": "444443",
				"dirName": "4444",
				"extend1": null,
				"extend2": null,
				"extend3": null,
				"hierarchyAuth": null,
				"hierarchyAuthName": null,
				"pDirCode": "root",
				"pdirname": "角色类别"
			}, {
				"dirCode": "869699",
				"dirName": "87698",
				"extend1": null,
				"extend2": null,
				"extend3": null,
				"hierarchyAuth": null,
				"hierarchyAuthName": null,
				"pDirCode": "RD001",
				"pdirname": "财务相关"
			}, {
				"dirCode": "999",
				"dirName": "999",
				"extend1": null,
				"extend2": null,
				"extend3": null,
				"hierarchyAuth": null,
				"hierarchyAuthName": null,
				"pDirCode": "333",
				"pdirname": "333"
			}, {
				"dirCode": "lihlohlo",
				"dirName": "giugi",
				"extend1": null,
				"extend2": null,
				"extend3": null,
				"hierarchyAuth": null,
				"hierarchyAuthName": null,
				"pDirCode": "333",
				"pdirname": "333"
			}, {
				"dirCode": "RD001",
				"dirName": "财务相关",
				"extend1": null,
				"extend2": null,
				"extend3": null,
				"hierarchyAuth": null,
				"hierarchyAuthName": null,
				"pDirCode": "root",
				"pdirname": "角色类别"
			}, {
				"dirCode": "RD002",
				"dirName": "公文相关",
				"extend1": null,
				"extend2": null,
				"extend3": null,
				"hierarchyAuth": null,
				"hierarchyAuthName": null,
				"pDirCode": "root",
				"pdirname": "角色类别"
			}, {
				"dirCode": "RD003",
				"dirName": "采购部",
				"extend1": null,
				"extend2": null,
				"extend3": null,
				"hierarchyAuth": null,
				"hierarchyAuthName": null,
				"pDirCode": "root",
				"pdirname": "角色类别"
			}, {
				"dirCode": "RD004",
				"dirName": "销售部",
				"extend1": null,
				"extend2": null,
				"extend3": null,
				"hierarchyAuth": null,
				"hierarchyAuthName": null,
				"pDirCode": "root",
				"pdirname": "角色类别"
			}, {
				"dirCode": "root",
				"dirName": "角色类别",
				"extend1": null,
				"extend2": null,
				"extend3": null,
				"hierarchyAuth": null,
				"hierarchyAuthName": null,
				"pDirCode": null,
				"pdirname": null
			}, {
				"dirCode": "uu",
				"dirName": "uu",
				"extend1": null,
				"extend2": null,
				"extend3": null,
				"hierarchyAuth": null,
				"hierarchyAuthName": null,
				"pDirCode": "root",
				"pdirname": "角色类别"
			}],
			"user": [{
				"deptCode": "D001001",
				"deptName": "行政部",
				"deptTreeId": "D001001",
				"deptUuid": "595ff98e87c84d3fbbcab745ea4fd859",
				"invalid": "N",
				"isParent": null,
				"ou": "XX集团.集团总部.行政部",
				"pDeptTreeId": "D001"
			}, {
				"deptCode": "D001002",
				"deptName": "财务部",
				"deptTreeId": "D001002",
				"deptUuid": "e9d8a4db6df14250bd520bfca350fe34",
				"invalid": "N",
				"isParent": null,
				"ou": "XX集团.集团总部.财务部",
				"pDeptTreeId": "D001"
			}, {
				"deptCode": "D001003",
				"deptName": "产品研发",
				"deptTreeId": "D001003",
				"deptUuid": "c0629375eeb5461a91c789a305ce4e48",
				"invalid": "N",
				"isParent": null,
				"ou": "XX集团.集团总部.产品研发",
				"pDeptTreeId": "D001"
			}, {
				"deptCode": "D001004",
				"deptName": "销售部",
				"deptTreeId": "D001004",
				"deptUuid": "b9e479278d68472aa3bd9a0fb9772bed",
				"invalid": "N",
				"isParent": null,
				"ou": "XX集团.集团总部.销售部",
				"pDeptTreeId": "D001"
			}, {
				"deptCode": "D001005",
				"deptName": "售后服务",
				"deptTreeId": "D001005",
				"deptUuid": "3ad654244cbd4cc7bf2732b6d2bc03d7",
				"invalid": "N",
				"isParent": null,
				"ou": "XX集团.集团总部.售后服务",
				"pDeptTreeId": "D001"
			}, {
				"deptCode": "D001",
				"deptName": "集团总部",
				"deptTreeId": "D001",
				"deptUuid": "e263d55b902f463a8cf46917c89ee8dd",
				"invalid": "N",
				"isParent": "true",
				"ou": "XX集团.集团总部",
				"pDeptTreeId": "root"
			}, {
				"deptCode": "D002",
				"deptName": "北京分公司",
				"deptTreeId": "D002",
				"deptUuid": "ff0a4c5b8e964ff5a6041d03761d3131",
				"invalid": "N",
				"isParent": "true",
				"ou": "XX集团.北京分公司",
				"pDeptTreeId": "root"
			}, {
				"deptCode": "D003",
				"deptName": "上海分公司",
				"deptTreeId": "D003",
				"deptUuid": "5ea1d1f4e84049c89c13155acd6dcacb",
				"invalid": "N",
				"isParent": null,
				"ou": "XX集团.上海分公司",
				"pDeptTreeId": "root"
			}, {
				"deptCode": "D004",
				"deptName": "广州分公司",
				"deptTreeId": "D004",
				"deptUuid": "78a69b6f23774f5bafc7a0499d6cdfeb",
				"invalid": "N",
				"isParent": null,
				"ou": "XX集团.广州分公司",
				"pDeptTreeId": "root"
			}, {
				"deptCode": "D005",
				"deptName": "武汉分公司",
				"deptTreeId": "D005",
				"deptUuid": "44e1059013cd488c80b72a3a5204f4df",
				"invalid": "N",
				"isParent": null,
				"ou": "XX集团.武汉分公司",
				"pDeptTreeId": "root"
			}, {
				"deptCode": "D006",
				"deptName": "重庆分公司",
				"deptTreeId": "D006",
				"deptUuid": "06c62e1917cb4b3dac92f61da118c5c9",
				"invalid": "N",
				"isParent": null,
				"ou": "XX集团.重庆分公司",
				"pDeptTreeId": "root"
			}, {
				"deptCode": "D007",
				"deptName": "深圳分公司",
				"deptTreeId": "D007",
				"deptUuid": "d62767b8e0c04fbb8f974a0d4d3a3e33",
				"invalid": "N",
				"isParent": null,
				"ou": "XX集团.深圳分公司",
				"pDeptTreeId": "root"
			}, {
				"deptCode": "D008",
				"deptName": "西安分公司",
				"deptTreeId": "D008",
				"deptUuid": "b0a97425962543de9cea4530326807fe",
				"invalid": "N",
				"isParent": null,
				"ou": "XX集团.西安分公司",
				"pDeptTreeId": "root"
			}, {
				"deptCode": "root",
				"deptName": "XX集团",
				"deptTreeId": "root",
				"deptUuid": "de4457db545b461bb359d3179adf50b4",
				"isParent": "true",
				"open": "true",
				"pDeptTreeId": null
			}]
		};
		/**
		 * 初始化插件传入参数对象定义
		 */
		var selDataObj = {
			"role": ["bb0d5b3eb761462881a93ce529accbad"],
			"dept": ["06c62e1917cb4b3dac92f61da118c5c9"],
			"user": [{
				"deptUuid": "5ea1d1f4e84049c89c13155acd6dcacb",
				"userUuid": "189a29c81d52408a874cd45740b1cc16"
			}]
		};
		var hideNode = {
			"user": ["D002"]
		};
		var contentH = $("#rxm_content").height();
		$("#selectedListGrid").height(contentH - 90);
		var selGridConfig = {
			id: "selectedListGrid",
			multi: true,
			layout: [{
				name: "部门名称",
				field: "deptName"
			}],
			data: []
		};
		var selCreateRow = function (grid, row, $tr) {
			var _this = grid;
			var $tdIconBtn;
			//生成$tr对象 
			$tdIcon = $('<td class="rxm-td-icon" style="vertical-align:middle;"></td>');
			$IconDiv = $('<div  style="vertical-align:middle;"></div>');
			$td = $('<td></td>');
			$tdCheck = $('<td style="display:none;" class="fix rxm-td-checkbox"></td>');
			rowType(row, $tr);
			//$tr添加内容列
			$tr.append($td);
			//$tr添加checkbox列  默认此列为隐藏状态 长按才会显示
			$tdCheck.append('<input class="rxm-multi-check" type="checkbox">');
			$tr.append($tdCheck);
			return $tr;
		}

		function initSelUserListGrid() {
			selUserGrid = new BufferGrid(selGridConfig);
			//重写函数
			selUserGrid.createRow = selCreateRow;
			selUserGrid.bindTapLineElement({
				selector: ".pre-insert-icon",
				fn: function (e, data) {
					var nowTr = $(e.currentTarget).parent().parent().parent();
					var preTr = nowTr.prev();
					preTr.insertAfter(nowTr);
				}
			});
			selUserGrid.bindTapLineElement({
				selector: ".next-insert-icon",
				fn: function (e, data) {
					var nowTr = $(e.currentTarget).parent().parent().parent();
					var nextTr = nowTr.next();
					nextTr.insertBefore(nowTr);
				}
			});
			selUserGrid.bindTapLineElement({
				selector: ".del-selrow-icon",
				fn: function (e, data) {
					var index = data.index;
					//获取当前行数据
					var row = data.row;
					uncheckUserListRow(row.idx);
					selUserGrid.deleteRow(index);
					updateCount();
				}
			});
			//开始执行
			selUserGrid.reload();
		}

		initSelUserListGrid();
		/**
		 * 点击进行组织选择按钮点击事件绑定
		 */
		$("#selectOrg").tap(function () {
			/**
			 * 调用组织插件
			 */
			PageBase.OrgSelect({
				//multi:false,
				data: selDataObj,
				treeData: treeData,
				hideNode: hideNode,
				tagType: ["user", "roleMember", "gw", "role", "dept"],
				noDataCanSubmit: false,
				callback: function (data) {
					console.log(data)
					reloadSelectGrid(data);
				},
				afterClose: function () {

				}
			});
		});
		var reloadSelectGrid = function (data) {
			if (data) {
				selData = [];
				selDataObj = {};
				if (data.selectedAll.dept) {
					var deptList = [];
					$.each(data.selectedAll.dept, function (index, obj) {
						deptList.push(obj.deptUuid);
					});
					selDataObj.dept = deptList;
					selData = selData.concat(data.selectedAll.dept);
				}
				if (data.selectedAll.user) {
					var userList = [];
					$.each(data.selectedAll.user, function (index, obj) {
						userList.push({
							deptUuid: obj.deptUuid,
							userUuid: obj.userUuid
						});
					});
					selDataObj.user = userList;
					selData = selData.concat(data.selectedAll.user);
				}
				if (data.selectedAll.role) {
					var roleList = [];
					$.each(data.selectedAll.role, function (index, obj) {
						roleList.push(obj.roleUuid);
					});
					selDataObj.role = roleList;

					selData = selData.concat(data.selectedAll.role);
				}
				if (data.selectedAll.roleMember) {
					var roleMemberList = [];
					$.each(data.selectedAll.roleMember, function (index, obj) {
						roleMemberList.push(obj.userUuid);
					});
					selDataObj.roleMember = roleMemberList;

					selData = selData.concat(data.selectedAll.roleMember);
				}
				if (data.selectedAll.gw) {
					var gwList = [];
					$.each(data.selectedAll.gw, function (index, obj) {
						gwList.push({
							deptUuid: obj.deptUuid,
							gwUuid: obj.gwUuid
						});
					});
					selDataObj.gw = gwList;
					selData = selData.concat(data.selectedAll.gw);
				}
				selUserGrid.reload({
					data: selData
				});
			}
		}
		//判断row的类型
		var rowType = function (row, $tr) {
			var typeName = "";
			if (row.categoryType == 1) {
				tdName = row.deptName;
				tdCode = row.deptCode;
				typeName = "部门";
			}
			if (row.categoryType == 2) {
				tdName = row.userName;
				tdCode = row.userCode;
				typeName = "部门人员";
			}
			if (row.categoryType == 3) {
				tdName = row.roleName;
				tdCode = row.roleCode;
				typeName = "角色";
			}
			if (row.categoryType == 4) {
				tdName = row.userName;
				tdCode = row.userCode;
				typeName = "角色人员";
			}
			if (row.categoryType == 5) {
				tdName = row.gwName;
				tdCode = row.gwCode;
				typeName = "岗位";
			}
			tdSpan = "<span class='rxm-col-value'>" + tdName + "/" + tdCode + "</span></br>";
			$td.append(tdSpan + "<span style='font-size: 10px;color: gray;'>" + typeName + "</span>");
			$tr.append($td);
			return $tr;
		}

	}
	return selOrg;
})
