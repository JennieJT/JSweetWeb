define('rxmJsMain', [], function () {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		$("#selectOrg").on("click", function(){
			rxmPage.OrgSelect({
				 multi: true,
				 title: "参加人员选择",
				 treeData:{},
				 noDataCanSubmit: true,
				 tagType: ["user","role","gw","dept"],
				 callback: function(data){
					var users = '';
					if(data.selectedAll){
						 users = data.selectedAll.user;
					}
					if(users){
						   var names = "";
						   var codes = "";
						   for (var i = 0; i < users.length; i++) {  		
							   names = names + users[i].userName+",";
							   codes = codes + users[i].userUuid+",";
						   }
						   names = names.substring(0,names.length-1);
						   codes = codes.substring(0,codes.length-1);
						 $("#selectOrg").val(names);
						 $("#joinUserIds").val(codes);
						 $("#selectOrg").keyup();
					}else{
						 $("#selectOrg").val("");
						 $("#joinUserIds").val("");
					}
				}
			});
		});
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})
