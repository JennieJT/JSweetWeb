/// <reference path="../../../jslib/examples/examplesImport.js" />
/**
 * @name  test155 
 * @description  test155页面控制器
 * @author  originaladmin 2018-12-03 11:15:01
 */
define([
	require.rxm.PageBase],
   /**
	* @param {rxm.page} PageBase
	*/
   function (PageBase) {
	    //  /**@type  {rxm.RouterMgr} */
	    //  var routers=require(require.rxm.RouterMgr)
	    //  /**@type {rxm.AppTool} */
	    //  var appInfo =require(require.rxm.AppTool)
        /**@type {rxm.Page} */
		var orm = PageBase
		var page = orm
		page.init = function () {
			//TODO
        }
        function onTestDialogAlert(){
            var param = {
                modal: 1,
               title: "提示",
               content: "提示内容...",
               btnTitle:"确定",
               callback:function() {
                   //console.error("dialog提示框")
                   alert('确定按钮被点击')
               }
            };
            page.alert(param);
            return false;
        }
        function onTestDialogConfirm(){
            var param ={ 
                modal:1,//0:系统级别的confirm；1:封装的confirm
                title: "确定对话框标题" ,
                content: "欢迎光临确定对话框~~",
                okBT: "确定" ,    //确定按钮标题
                cancelBT: "取消" ,    //取消按钮标题
                okCb: function(){//确定回调函数
                    //$("#result1").html("您点击了<strong>确定</strong>按钮！");
                    alert('确定按钮被点击')
                }, 
                cancelCb: function(){//取消回调函数
                    //$("#result1").html("您点击了<strong>取消</strong>按钮！");
                    alert('取消按钮被点击')
                } 
            };
            
            page.confirm(param);
        }
        function onTestDialogLoading(){
            var loading = page.loading({
                id : "loadingId",
                text : "正在加载"
            });
            loading.show();
            setTimeout(function(){
                loading.close();
            }, 5000);
        }


        function onTestDialog(){
            var bodyHtml = 
			'<div class="rxm-form-padding-l" style="margin:12px 0;">'
			+ '<label style="width:30%;text-align:center;">用户名</label>'
			+ '<div style="width:64%;display:inline-block;">'
			+ '<input type="text" name="username" id="username" class="rxm-form-control">'
			+ '</div>'
			+ '</div>'
			+ '<div class="rxm-form-padding-l" style="margin:12px 0;">'
			+ '<label style="width:30%;text-align:center;">密码</label>'
			+ '<div style="width:64%;display:inline-block">'
			+ '<input type="password" name="pwd" id="pwd" class="rxm-form-control">'
			+ '</div>'
			+ '</div>'

			var param = {
				title:'dialog标题',//标题
				//body:bodyHtml,//内容html（与template填入一个即可）
				template:'www/examples/testDialog/view/test.html',//内容模板地址（与body填入一个即可）
				posCls:'rxm-dlg-xs-center',//dialog框的大小rxm-dlg-lg-center rxm-dlg-md-center rxm-dlg-sm-center rxm-dlg-xs-center
				showBtn:false,//是否显示默认的确定和取消按钮，false：不显示；true或没有该字段表示显示
				okBT:'确认按钮',//确认按钮的文字
				cancelBT:'取消按钮',//取消按钮的文字
				okCb:function(){//确认按钮被点击的回调函数
					var username = $('#username').val()
					var pwd = $('#pwd').val()
					console.log('username==' + username + ',pwd==' + pwd);
				},
				cancelCb:function(){//取消按钮被点击的回调函数
					alert('取消按钮被点击')
                },
                afterLoad:function(){//dialog加载完成时执行的回调
                    console.log('完成加载')
                    //dialog.close()关闭dialog方法
                },
				
				buttons:[{//扩展按钮
					rxmcmdid:'test',//按钮的命令id
					btnText:'扩展按钮',//按钮的文字
					callback:function(){//按钮点击的回调函数
						console.log('扩展按钮点击')
					}
				}]
				
            }
            
            page.contentDialog(param)

        }
        $('testDialogAlert').rxmBindCmd({fn:onTestDialogAlert,hearFrom:'all'})
        $('testDialogConfirm').rxmBindCmd({fn:onTestDialogConfirm,hearFrom:'all'})
        $('testDialogLoading').rxmBindCmd({fn:onTestDialogLoading,hearFrom:'all'})
        $('testDialog').rxmBindCmd({fn:onTestDialog,hearFrom:'all'})
		return page
	}
)