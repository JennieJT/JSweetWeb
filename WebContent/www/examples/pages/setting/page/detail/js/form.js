/// <reference path="../../../../../../jslib/examples/examplesImport.js" />
(function (factory) {
    if (typeof define === "function") {
        define(['./serviceCaller', "./lang",  "OrmUtilDir/tool", "jquery", "JQuery.validate", "JQuery.validate.message", "JQuery.validate.extra"], factory);
    } else {
        this["PdwebFormBase"] = factory(PdwebServiceCaller,PdwebLang);
    }
}
(function (serviceCaller, lang, pdwebTool)
{
    ///<summary></summary>
    ///<param  name="declare" type="PdwebDeclare"> </param>
    ///<param  name="widgetBase" value="PdwebWidgetBase"> </param>
    ///<param  name="serviceCaller" value="PdwebServiceCaller"> </param>
    ///<param  name="lang" value="PdwebLang"> </param>
    ///<param  name="dateTimePicker" value="PdwebDateTimePicker"> </param>
    var form = function () {
        this.formSelector = "";
        this.btnSubmitSelector = "";
        this.submitUrl = "";
        this._initData = undefined;
        this.validator = undefined;
        this._enterSubmit = true;
        this._dataChanged = false;
        this.opTypeDomName = "opType";
    };
    form.prototype.FetchInitData=function(url,data)
    {
         var initCar = new serviceCaller();
         initCar.AddCallBackFuntion(this, this.onInitDataSuccess, this.onInitDataError);
         initCar.Post(url, data);
    }

    //获取表单信息
    form.prototype.getFormData = function () {
        var data=pdwebTool.serialize($(this.formSelector));
        return this.getFormDataAfterFilter(data);
    }
    form.prototype._getFormData = function () {
        var data = pdwebTool.serialize($(this.formSelector));
        return data;
    }
    form.prototype.getFormDataAfterFilter=function(data)
    {
        return data;
    }
    form.prototype.initValidate = function (validateArgs) {
        ///<summary>初始化校验参数 </summary>
        ///<param name=""  value="Object">jquery  validate  参数</param>
        var v;
        if (typeof validateArgs != "undefined")
        {
            v = validateArgs;
            v.Onubmit= false;
            v.onfocusout= false;
            v.onkeyup = false;
            v.onclick = false;
            if(typeof  v.errorPlacement ==="undefined")
            {
                v.errorPlacement=lang.hitch(this,this.onValidatePlacement)
            }
            
        } else
        {

   
        }
        
        this.validator = $(this.formSelector).validate(v);

    };
    form.prototype._formInit = function (arg)
        {
            $(this.formSelector).data("__thisObj", this);
            this._on(this.btnSubmitSelector, "click", this.onSubmit, this);
            this._on(this.formSelector, "keyup", this.onkeyUpEvt, this);
            var sFormItem = this.formSelector + " input";
            this._on(sFormItem, "change", this.onChange);
            $(this.btnSubmitSelector).attr("disabled", "disabled");
     }
    form.prototype.init=function(arg)
    {
        this._formInit();
    }
   form.prototype._onChange = function (evt,d,e) {
       $(this.btnSubmitSelector).removeAttr("disabled");
       this._dataChanged = true;
       var op = $(this.formSelector + " " + [name = this.opTypeDomName])
       if (op)
       {
           var vv = op.val();
           if(op.val!="new")
           {
               op.val("modified");
           }
       }
        if(this.validator)
        this.validator.element($(evt.target));

    };
    form.prototype.onChange = function (evt,d,e)
    {
        this._onChange(evt, d, e);
    }
    form.prototype.onInitDataSuccess = function (d, status)
    {
        ///<summary> 初始化返回</summary>
        ///<param  name="d" value="PdwebResult" >返回消息和数据</param>
        if (d.success)
        {
            this.setFormData(d.data);
            this._initData = this._getFormData();
        } else
        {
            alert(d.message);
        }
        //this.setFormData(data);
    }
    form.prototype.onInitDataError=function(a, b, c)
    {
        console.error(b.toString());
    }
   
    form.prototype.onkeyUpEvt = function (evt, elm) {
        ///<summary>键盘up键事件</summary>
        ///<param name="evt" type='KeyboardEvent'></param>
        if (evt.keyCode == 13) {
            $(this.btnSubmitSelector).trigger("click");
            //var sId = this._getCurFocusId()
        }
    };
 
   
    form.prototype.onValidatePlacement = function (error, element) {

        $(element).closest(".form-group").find(".error").append(error);
    };
    //提交按钮事件
    form.prototype.onSubmit = function (evt)
    {
        if (this._enterSubmit) {
            this._enterSubmit = false;
            if (this._validateEach())
            {
                var d = this.getFormData();
                if (d)
                    {
                    var f = new serviceCaller(this.submitUrl, d, this, this.onSuccessSubmit, this.onErrorSubmit);
                    f.Post();
                }else
                {
                    this._enterSubmit = true;
                    this._setBtnSubmitEnabled(false);
                    //this._dataChanged = false;
                    //this._setFormData({ opType: "" });
                }
            }else
            {
                this._enterSubmit = true;
            }
        }
    }
    //提交成功回调函数
    form.prototype.onSuccessSubmit = function (data, status)
    {
        ///<summary>提交成功叫回函数</summary>
        ///<param  name="data"  value="PdwebResult"> 返回的ServiceResult</param>
        ///<param  name="status"  value="String"></param>
        if (data.success) {
            alert(data.message)
        } else {
            alert(data.message)
        };
        this._onSuccessSubmit();
    }
    form.prototype._onSuccessSubmit = function (data, status) {
        this._enterSubmit = true;
        this._setBtnSubmitEnabled(false);
        this._dataChanged = false;
        this._setFormData({ opType: "" });
        this.onSuccessSubmitAfter(data, status);
    }

    ////提交失败回调函数
    form.prototype.onErrorSubmit = function (request, error, throws)
    {
        alert(error.toString());
        this._enterSubmit = true;
    }
  
    form.prototype.onSuccessSubmitAfter = function (data, status) {
    };
  
 
    //设置表单信息
    form.prototype.setFormData = function (data) {
        var d = this.setFormDataBefore(data);
        if (d) {
            this._setFormData(d);
        }
        return d;
    }
    form.prototype.setFormDataBefore = function (data) {
        return data;
    };
    //
    form.prototype._setFormData = function (data, formSelector) {
        var d = {};
        if (typeof data === "undefined" || data === null) {

        } else {
            var s = this.formSelector;
            if (typeof formSelector != "undefined")
                s = formSelector;
            if (lang.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    lang.mixin(d, data[i]);
                }
            } else {
                d = data;
            }
            pdwebTool.deserialize($(s), d);
        }
    }
    form.prototype._setBtnSubmitEnabled = function (b)
    {
        if (b) {
            $(this.btnSubmitSelector).removeAttr("disabled");
        } else {
            $(this.btnSubmitSelector).attr("disabled", "disabled");
            
        };
    }
    form.prototype._validateEach = function () {
        ///
        if (typeof this.validator === "undefined") return true;//不需要校验
        var s = this.formSelector + " input," + this.formSelector + " select";
        var inputs = $(s);
        var b = true; var bFirstFinded = false;
        for (var i = 0; i < inputs.length; i++) {
            var it = inputs[i];
            b = this.validator.element(it)
            if (!b && !bFirstFinded) {
                $(it).focus();
                bFirstFinded = true;
            }
        }
        return !bFirstFinded;
     }
    ///静态函数产生一个UUID
    form.uuid = function () {

        ///<summary ></summary>
        var UUID = {};
        // INSTANCE SPECIFIC METHODS
        //
        UUID.createUUID = function () {
            //
            // Loose interpretation of the specification DCE 1.1: Remote Procedure Call
            // since JavaScript doesn't allow access to internal systems, the last 48 bits 
            // of the node section is made up using a series of random numbers (6 octets long).
            //  
            var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
            var dc = new Date();
            var t = dc.getTime() - dg.getTime();
            var tl = UUID.getIntegerBits(t, 0, 31);
            var tm = UUID.getIntegerBits(t, 32, 47);
            var thv = UUID.getIntegerBits(t, 48, 59) + '1'; // version 1, security version is 2
            var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
            var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
            // since detection of anything about the machine/browser is far to buggy, 
            // include some more random numbers here
            // if NIC or an IP can be obtained reliably, that should be put in
            // here instead.
            var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7)
                    + UUID.getIntegerBits(UUID.rand(8191), 8, 15)
                    + UUID.getIntegerBits(UUID.rand(8191), 0, 7)
                    + UUID.getIntegerBits(UUID.rand(8191), 8, 15)
                    + UUID.getIntegerBits(UUID.rand(8191), 0, 15); // this last number is two octets long
            return tl + tm + thv + csar + csl + n;
        };

        //Pull out only certain bits from a very large integer, used to get the time
        //code information for the first part of a UUID. Will return zero's if there 
        //aren't enough bits to shift where it needs to.
        UUID.getIntegerBits = function (val, start, end) {
            var base16 = UUID.returnBase(val, 16);
            var quadArray = new Array();
            var quadString = '';
            var i = 0;
            for (i = 0; i < base16.length; i++) {
                quadArray.push(base16.substring(i, i + 1));
            }
            for (i = Math.floor(start / 4) ; i <= Math.floor(end / 4) ; i++) {
                if (!quadArray[i] || quadArray[i] == '')
                    quadString += '0';
                else
                    quadString += quadArray[i];
            }
            return quadString;
        };

        //Replaced from the original function to leverage the built in methods in
        //JavaScript. Thanks to Robert Kieffer for pointing this one out
        UUID.returnBase = function (number, base) {
            return (number).toString(base).toUpperCase();
        };

        //pick a random number within a range of numbers
        //int b rand(int a); where 0 <= b <= a
        UUID.rand = function (max) {
            return Math.floor(Math.random() * (max + 1));
        };
        return UUID.createUUID();
    };
    form.prototype._on = function (selector, eventName, eventFunction, functionScope, data) {
        ///<summary>绑定eventName事件函数（eventfunction）向selector 指定的对象，并指定funttionscope作为函数this，</summary>
        ///<param name="selector" type="String"  > 选择器</param>
        ///<param name="eventName" type="String">事件名称，参见jquery事件</param>
        ///<param name="eventfunction" type="Function">事件回教函数</param>
        ///<param name="functionScope" type="Object">事件this对象，undefined时，原生的this</param>
        var sco = functionScope
        if (typeof functionScope == "undefined") {
            sco = this;
        }
        $(selector).on(eventName, data, lang.hitch(sco, eventFunction));
    }
     return form;
}))