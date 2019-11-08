define(["RxmModuleLoginDir",require.rxm.Util], (function (lgn,util) {
    ///<param name="lgn" value="objLoginBase"></param>
    lgn._oldSuccess = lgn.onPostCheckPwdSuccess;

	    lgn.onPostCheckPwdSuccess = function (data) {
	        ///<summary>重载登录成功函数</summary>
	        if (!data.success) {
	        	page.alert(cssOrm.default.prompt.userError);//你们自己 写一下，密码错误的提示
	            //this.onRefreshCaptcha();
	            $(this.btnSubmitSelector).html("登录").removeClass("disabled");
	            this._enterSubmit = true;
	        }else
	        {
	            lgn._oldSuccess(data);
	        }
		};
		
		var  s 
	    lgn.init();
}))
