define([], function () {
    // global variable
    const defArgs = {
        form_id: ""
    }
    var factory = function (args) {
        var _dirtied = false;
        var config = Object.assign({}, defArgs, args)
        //constructor
        var JSweetForm = function () {
            $("#" + config.id).change(
                $.proxy(function () {
                    this.isDirtied(true);
                }, this));

            //         //validate
            //         jQuery.validator.setDefaults({ "errorElement": "div" })
                   //             return params.indexOf(value.charAt(0)) == -1;
            //         }, jQuery.validator.format("Invalid, First character is {0}"))
            //         // $.validator.addClassRules("name",{jsweetFirstNotB: "A?EIOU"})
            //         var voptions={
            //             errorClass:"jsweet-font-invalid",
            //             success:function(label){
            //                 /** @type {JQuery} */
            //                 var target=label.parent(".jsweet-inner-form");
            //                 target.removeClass("jsweet-invalid");
            //                 label.remove();
            //             },
            //             /** 
            //              * @param {JQuery} element
            //              * @param {JQuery} error
            //              */
            //             errorPlacement:function(error,element){
            //                     var why=element.parent(".jsweet-inner-form")
            //                     why.addClass("jsweet-invalid")
            //                     error.css({
            //                 })
            //                     why.append(error)
            //             },
            //             highlight:function(element,errorClass){

            //             }
            //         };
            //         voptions=$.extend(true,voptions,config.voptions)
            //         var valid = $("#"+config.id).validate(voptions);
        }
        /**
         * @param {TJSweetFormLoad} param
         */
        JSweetForm.prototype.load = function (param) {
            var the = this
            $.ajax(
                {
                    context: the,
                    url: param.url,
                    type: "post",
                    data: param.data,
                    success: function (d) {
                        if (d.success) {
                            if (param.format) {
                                d = param.format(d);
                            }
                            var dataEdit = d.data;
                            this.deserialize(dataEdit);
                            if (param.success) {
                                param.success(d);
                            }
                        } else {
                            if (param.error) {
                                param.error(d);
                            }
                        }
                    },
                    error: function (d) {
                        if (param.error) {
                            param.error(d);
                        } else {
                            alert("error occur");
                        }
                    }
                }
            )
        }

        /** get all the values from a form */
        JSweetForm.prototype.serialize = function () {
            var serializeObj = {};
            var array = $("#" + config.form_id).serializeArray();
            //same name
            var nameArr = [];
            $(array).each(function () {
                if (serializeObj[this.name]) {
                    if ($.isArray(serializeObj[this.name]) && this.value != "") {
                        serializeObj[this.name].push(this.value);
                    } else {
                        if (this.value != "") {
                            serializeObj[this.name] = [serializeObj[this.name], this.value];
                            nameArr.push(this.name);
                        }
                    }
                } else {
                    if (this.value != "") {
                        serializeObj[this.name] = this.value;
                    }
                }
            });
            for (var i = 0; i < nameArr.length; i++) {
                var n = nameArr[i];
                var value = serializeObj[n];
                value = value.join(",");
                serializeObj[n] = value;
            }
            return serializeObj;
        }
        /** get all the values from an object to a form */
        JSweetForm.prototype.deserialize = function (data) {
            for (var i in data) {
                var val = data[i];
                var typeName = $("[name=" + i + "]").attr("type");
                if (typeName != "checkbox") {
                    $("[name=" + i + "]").val(val);
                } else {
                    if (val.length == 0) {
                        continue;
                    }
                    var boxList = val.split(",");
                    for (var w = 0; w < boxList.length; w++) {
                        $("input:checkbox[value=" + boxList[w] + "]").attr('checked', 'true');
                    }
                }
            }
        }
        JSweetForm.prototype.isDirtied = function (dirtied) {
            if (typeof dirtied != "undefined") {
                _dirtied = dirtied;
                if (_dirtied) {
                    $("[submit-formID$=" + config.id + "]").removeAttr("disabled");
                } else {
                    $("[submit-formID$=" + config.id + "]").attr("disabled", "disabled");
                }

            }

            return _dirtied;
        }
        /** @param {TJSweetFormSubmit} args */
        JSweetForm.prototype.submit = function (args) {
            if (!this.isDirtied()) {
                return;
            }
            //for validation
            var d = $("#" + config.id).valid();
            if (!d) {
                return;
            }
            var magicSerialJson = this.serialize();
            magicSerialJson = $.extend(true, magicSerialJson, args.data);
            if (args.format) {
                magicSerialJson = args.format(magicSerialJson);
            }
            var the = this;
            $.ajax(
                {
                    url: args.url,
                    data: magicSerialJson,
                    type: "post",
                    success: function (d) {
                        if (d.success) {
                            the.isDirtied(false);
                            if (args.success) {
                                args.success(d);
                            }
                        } else {
                            if (args.error) {
                                args.error(d);
                            }
                        }
                    }, error: function (a, b, c) {
                        if (args.error) {
                            args.error(a, b, c);
                        }
                    }
                }
            )
        }


        return new JSweetForm()
    }
    return factory
});