/// <reference path="lang.js" />
/// <reference path="../../../../../../jslib/examples/examplesImport.js" />
(function (factory) {
     
    if(typeof  define==="function")
    {
        define(["./lang", "jquery"], factory)
    }else
    {
        this["PdwebServiceCaller"] = factory(PdwebLang);
    }

}
(function (lang) {
     
    ///<summary></summary>
    ///<param name="lang" value="PdwebLang"></param>
  
    function ServiceCaller(url, data, thisObj, sucsessCallBack, errorCallBack)
    {
        this.url = url;
        this.data = data;
        this.url= this.url;
        this.async= true;
        this.dataType="json";
        timeout: 6000;
        this.AddCallBackFuntion(thisObj, sucsessCallBack, errorCallBack);
    }
    ServiceCaller.prototype.AddCallBackFuntion = function (thisObj, sucsessCallBack, errorCallBack)
    {
        ///
        if (typeof thisObj != "undefined" && typeof  sucsessCallBack !="undefined")
        {
            this._success = lang.hitch(thisObj, sucsessCallBack);
        }
        if (typeof thisObj != "undefined" && typeof errorCallBack != "undefined")
        {
            this._error = lang.hitch(thisObj, errorCallBack);
        }
       
    }
    ServiceCaller.prototype.success =function (data, status) {
        this._success(data, status);
    }; 
    ServiceCaller.prototype.error = function (request, error, throws) {

        this._error(request, error, throws)
    } 
    ServiceCaller.prototype.Post = function (url, data) {
        if (typeof url != "undefined") { this.url = url; };
        if (typeof data != "undefined") this.data = data;
        $.ajax(
           this
         );
    }
    return ServiceCaller;
}))