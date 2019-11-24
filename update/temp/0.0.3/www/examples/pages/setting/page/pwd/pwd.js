/// <reference path="../../../../../jslib/examples/examplesImport.js" />

define(["OrmPageDir/setting/page/detail/js/form", 
        "OrmPageDir/login/rsa","Date", "DateCN", "css!DateCss"], function (form,rsa) {

    var ret = {};
    ret.init = function () {
        ///<summary></summary>
        ///<param name="form" value="PdwebFormBase"></param>
    	
    
    	
        var f = new form();
        var fpswd = new form();
   
  
        f.formSelector = "#pd_web_userInfo_editor";
        fpswd.formSelector = "#pd_web_password_editor";
        fpswd.btnSubmitSelector = "#pd_web_save_pswd_btn";
        fpswd.keyAl = "";
        fpswd.keyEn = "";
        fpswd.submitUrl = getServer() + "/resoft/login/profile?OriginalControllerName=pdwebprofile";
        fpswd.initValidate(
            {
                rules: {
                    pd_web_old_pswd: {required:true},
                    pd_web_new_pswd_1: {
                        required: true,
                        PD_ZS: true,
                        minlength: 5,
                        maxlength: 15
                    },
                    pd_web_new_pswd_2: {
                        required: true,
                        PD_ZS: true,
                        minlength: 5,
                        maxlength:15
                    }
                },
                messages: {
                    pd_web_old_pswd: "请填写原密码"
                },
                errorPlacement:  function (error, element) { 
                    $(element).after(error);
                },
                Onubmit: false,
                onfocusout: false,
                onkeyup: false,
                onclick: false
            }
            );
        fpswd.init();
        fpswd.getFormDataAfterFilter = function (data) {
            if(data.pd_web_new_pswd_1===data.pd_web_new_pswd_2)
            {
                var d = { opType: 3 };
                var s = data.userUuid;
                s += "_";
                s += data.pd_web_old_pswd + "_";
                s += data.pd_web_new_pswd_1;
                var rsaKey = rsa.getKeyPair(this.keyEn, "",this.keyAl);
                d.pswd = rsa.encryptedString(rsaKey, s.split("").reverse().join(""));
               return  d;
            }else
            {
                
                alert("新密码与新密码校验不一致")
            }
            return undefined;
        };
        //取pulicKey 回调
        fpswd.onInitDataSuccess = function (data) {
            if(data.success)
            {
                var s = data.data;
                var ss = s.split('_');
                this.keyAl = ss[0];
                this.keyEn = ss[1];
            }else
            {
                alert("加密错误");
            }
        };
        fpswd.onInitDataError=function(r,error,thows)
        {
            alert("加密错误");
        }
        fpswd.on
        //-------
        f.btnSubmitSelector = "#pd_web_save_profile_btn";
        f.formSelector = "#pd_web_userInfo_editor";
        var  initUrl = getServer() + "/resoft/login/profile?OriginalControllerName=pdwebprofile";
        f.submitUrl = getServer() + "/resoft/login/profile?OriginalControllerName=pdwebprofile";
        f.setFormDataBefore = function (data) {
            fpswd.setFormData({
                userCode: data.userCode,
                userUuid: data.userUuid,
                userName: data.userName
            });
            fpswd.FetchInitData(getServer() + "/resoft/login/profile?OriginalControllerName=pdwebprofile", {opType:2});
            return data;
        }
        f.init();
        f.FetchInitData(initUrl, { opType: 0 });

        f.getFormDataAfterFilter=function(data)
        {
            data.opType = 1;
            return data;
        }
      
    	
      
    }
    return ret;
})