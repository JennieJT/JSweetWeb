/// <reference path="../../../../../jslib/examples/examplesImport.js" />

define(["OrmPageDir/setting/page/detail/js/form", 
        "Date", "DateCN", "css!DateCss"], function (form) {

    var ret = {};
    ret.init = function () {
        ///<summary></summary>
        ///<param name="form" value="PdwebFormBase"></param>
        var f = new form();
        var fpswd = new form();
   
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
        var v = {
            rules: {
                birthday: {required:false},
                officePhone: {
                    PD_officePhone: true,
                    minlength: 0
                },
                phone: {
                    PD_mobile: true,
                    minlength: 0
                },
                //sex: "required",
                fax: {
                    PD_fax: true,
                    minlength: 0
                },
                email: {
                    //minlength: 0,
                    PD_mail: true, minlength: 0
                }
            },
            messages: {
                birthday: "请填写生日"
            },
            errorPlacement: function (error, element) { 
                $(element).after(error);
            },
            Onubmit: false,
            onfocusout: false,
            onkeyup: false,
            onclick: false
        };
        f.initValidate(v);
        f.getFormDataAfterFilter=function(data)
        {
            data.opType = 1;
            return data;
        }
        var dateTimeConfig = {
            //设置使用语言：cn是自定义的中文版本，还可以扩展其他语言版本
            language: "cn",
            //输出格式化
            format: 'yyyy-mm-dd',
            //直接选择‘今天’
            todayBtn: true,
            //设置最精确的时间选择视图
            minView: 'month',
            //高亮当天日期
            todayHighlight: true,
            //选择完毕后自动关闭
            autoclose: true
        };
       
        $("#birthday").datetimepicker(dateTimeConfig);
    	
    }
    return ret;
})