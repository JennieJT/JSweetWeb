/// <reference path="../../../jslib/examples/examplesImport.js" />
define([require.rxm.PageBase, "RxmModuleDir/widget/listView/clsIconView"],
    /**
     * @param {rxm.Page} pagebase
     * @param  {Object}  File
     */
    function (pagebase, ListView) {
        /** @type {rxm.Page} */
        var widget = pagebase
        var page = pagebase
        page.init = function () {

            //    	widget.bindPageActived({
            //            callback: function(){
            //                alert("1111");
            //            },
            //            one:false
            //        });


            ///<param name="auth" type="ClsOriginalAuthBase"></param>
            ///<param name="args" value="clsAppArgs"></param>
            ///<param name="the" type="ClsAuthItem"></param>
            //        var menus = [{
            //            name: "离线",
            //            callback: function () {
            //                auth.load({ target: "_self", pageCtrl: "orm/examples/gestures/tap/tap", pageUrl: "orm/examples/common.html" })
            //            }
            //        }, {
            //            name: "在线",
            //            callback: function () {
            //                // auth.load({ target: "_self", pageCtrl: "www/core/page/work/work", pageUrl: "www/core/page/work/view/work.html" })
            //
            //                window.location.reload();
            //            }
            //        }];
            //        widget.attrMenuAndColor(menus);
            var auth = require(require.rxm.RouterMgr) 
            auth.getSonsGroup("home_work",f);
            //var auths = auth.getSonsByGroup("home_work");//图标数据
            // var $its = $(".example-grourp");
            // for (var i = 0; i < $its.length; i++) {
            //     var it = $($its[i]);
            //     var wrap = auths[it.data("group")];
            //     if (wrap) {
            //         var w = it.find(".listview-wrap");
            //         var listView = new ListView();
            //         listView.wrapSelector = w[0];//外框选择器
            //         listView.serverPath = cssOrm.obj.objAppArgs().getUpdateUrl();//args.getServer();//服务地址
            //         listView._data = wrap;
            //         // listView.imgSize = 60;//图标大小
            //         listView.wordNum = 11;//最大图标描述字数
            //         listView.init();
            //     }
            // }
            
            
        }

        //auths即为"home_work"节点下权限的集合
        function f (auths){
            var $its = $(".example-grourp");
            for (var i = 0; i < $its.length; i++) {
                var it = $($its[i]);
                var wrap = auths[it.data("group")];
                if (wrap) {
                    var w = it.find(".listview-wrap");
                    var listView = new ListView();
                    listView.wrapSelector = w[0];//外框选择器
                    listView.serverPath = cssOrm.obj.objAppArgs().getUpdateUrl();//args.getServer();//服务地址
                    listView._data = wrap;
                    // listView.imgSize = 60;//图标大小
                    listView.wordNum = 11;//最大图标描述字数
                    listView.init();
                }
            }
        }
        return page;
    })