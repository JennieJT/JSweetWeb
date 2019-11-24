define('rxmJsMain', ["RxmContact"], function (contact) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		var contantExample = function(){
            var args = {
				callback: function (e, data) {
					console.log(data);
				},
				multi: true,
				data: {
					id: "contantExampleBtn"
				}
			};
			contact.open(args);
        }
		$('contantExampleBtn').rxmBindCmd({fn:contantExample,hearFrom:'all'})

		var contantSExample = function(){
            var args = {
				callback: function (e, data) {
					console.log(data);
				},
				multi: false,
				data: {
					id: "contantSExampleBtn"
				}
			};
			contact.open(args);
        }
		$('contantSExampleBtn').rxmBindCmd({fn:contantSExample,hearFrom:'all'})


		var contantAdd = function(){
			var args = {
				callback: function (e, data) {
					console.log("这是添加联系人");
				},
				name: $("#name").val(),
				num: $("#num").val(),
				email: $("#email").val(),
				hiddenAlertDialog: 0,
				data: {
					id: "contantAddBtn"
				}
			}
			contact.addItem(args);
	
        }
		$('contantAddBtn').rxmBindCmd({fn:contantAdd,hearFrom:'all'})

		var contantDel = function(){
			var args = {
				callback: function (e, data) {
					console.log("这是删除联系人");
				},
				name: $("#delName").val(),
				data: { id: "contantAddBtn" }
			}
	
			contact.deleteItem(args);
        }
		$('contantDelBtn').rxmBindCmd({fn:contantDel,hearFrom:'all'})

		var contantSearch = function(){
			var args = {
				callback: function (e, data) {
					console.log("这是查询联系人");
				},
				nameKey: $("#searchName").val(),
				pageSize: $("#pageSize").val(),
				data: { id: "contantSearchBtn" }
			}
	  
			contact.searchItem(args);
        }
		$('contantSearchBtn').rxmBindCmd({fn:contantSearch,hearFrom:'all'})

		var contantModify = function(){
			var args = {
				callback: function (e, data) {
					console.log("这是修改联系人");
				},
				name: $("#modifyName").val(),
				num: $("#modifyNum").val(),
				email: $("#modifyEmail").val(),
				data: { id: "contantModifyBtn" }
			}
			contact.modifyItem(args);
        }
		$('contantModifyBtn').rxmBindCmd({fn:contantModify,hearFrom:'all'})

	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})