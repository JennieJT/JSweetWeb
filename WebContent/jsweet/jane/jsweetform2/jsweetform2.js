require(["JSweetForm"], function (Jform) {

    $(document).ready(function () {
        jQuery.validator.setDefaults({ "errorElement": "span" })
        $.validator.addMethod("jsweetFirstNotB", function (value, element, params) {
            return params.indexOf(value.charAt(0)) == -1;
        }, jQuery.validator.format("Invalid, First character is {0}"))
        // $.validator.addClassRules("name",{jsweetFirstNotB: "A?EIOU"})
        var valid = $("#jsweet-form2").validate({
            debug:true,
            errorClass:"jsweet-font-invalid",
            success:function(label){
                /** @type {JQuery} */
                var target=label.parent(".jsweet-inner-form");
                target.removeClass("jsweet-invalid");
                label.remove();
            },
            rules: {
                name: {
                    required: true,
                    jsweetFirstNotB: "A?EIOU"
                },
                login:"required",
                checkbox:{
                    required:true
                },
                birthday:"required"
            },
            messages: {
                name: {
                   required: "please insert your name"
                },
                login:"please insert your login account              sdfghjklkjhgzZxcvghjkfghjksdfghj",
                checkbox:{
                    required:"please select at least one hobby"
                }
            },
            /** 
             * @param {JQuery} element
             * @param {JQuery} error
             */
            errorPlacement:function(error,element){
                    var why=element.parent(".jsweet-inner-form")
                    why.addClass("jsweet-invalid")
                    error.css({"margin-left":"2rem"})
                    why.append(error)
            },
            highlight:function(element,errorClass){

            }
        });

        
        $("#jsweet_submit_button").click(function () {
            //get all the value from the form
            //jquery serialize function: get all the data from the form as key and value;
            var jform = Jform({ id: "jsweet-form2" });
            var x = jform.serialize();
            var magicSerialJson = x;
            var d = $("#jsweet-form2").valid();
            if(d){
                return;
            }
            // valid.resetForm();
            // valid.showErrors({ "name": "noooooo" });
            $.ajax(
                {
                    url: "jswt/jane/paramForm",
                    //url:"jswt/jane/sortFormByDate",
                    data: magicSerialJson,
                    /*送出的数据格式，报文头部   Content-Type*/
                    //contentType  
                    //报文头部的 Method
                    type: "post",
                    /*Accept 字段
                    "xml": 返回 XML 文档，可用 jQuery 处理。
					"html": 返回纯文本 HTML 信息；包含的 script 标签会在插入 dom 时执行。
					"script": 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了 "cache" 参数。注意：在远程请求时(不在同一个域下)，所有 POST 请求都将转为 GET 请求。（因为将使用 DOM 的 script标签来加载）
					"json": 返回 JSON 数据 。
					"jsonp": JSONP 格式。使用 JSONP 形式调用函数时，如 "myurl?callback=?" jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
					"text": 返回纯文本字符串*/
                    //dataType:"json",
                    success: function (d) {
                        if (d.success) {
                            alert('success')
                        } else {
                            alert('fail')
                        }
                    }, error: function () {
                        alert('error ocuor')
                    }
                }
            )
            console.info(magicSerialJson);
        });
        $("#jsweet_sort_button").click(function () {
            //get all the value from the form
            //jquery serialize function: get all the data from the form as key and value;
            var jform = Jform({ id: "jsweet-form2" });

            var x = jform.serialize();
            var magicSerialJson = x;
            $.ajax(
                {
                    url: "jswt/jane/paramForm",
                    data: magicSerialJson,
                    type: "post",
                    success: function (d) {
                        if (d.success) {
                            alert('success')
                        } else {
                            alert('fail')
                        }
                    }, error: function () {
                        alert('error occur')
                    }
                }
            )
            console.info(magicSerialJson);
        });
    });
})