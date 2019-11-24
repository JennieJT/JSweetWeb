//declare let rxmc_webroot:Function
/**
 * 全局函数，用于为ajax 请求url 计算绝对路径
 *
 * @param url
 * @param prefix
 */
//cssOrm.getServer=(a:string):string=>{return ''}
function rxm_webroot(url, prefix) {
    url && (typeof prefix == 'undefined') && (prefix = 'resoft/');
    if (rxm_webroot._cnxtPth == '----') {
        var bshrfs = document.getElementsByTagName('base');
        var bshrf = void 0;
        var num = 0;
        for (var i_1 = 0; i_1 < bshrfs.length; i_1++) {
            //为了兼容 ie 6、7、8
            bshrf = bshrfs[i_1].getAttribute('href');
            if (bshrf) {
                var r = bshrf.match(/..\//g);
                r !== null && (num = r.length);
                break;
            }
        }
        rxm_webroot._cnxtPth = '';
        if (num > 0) {
            var path = window.location.pathname;
            var temp = path.match(/\S*?\/\b/g);
            var nu = 0;
            if (temp !== null) {
                nu = temp.length;
                for (var i = 0; i < nu - num; i++) {
                    rxm_webroot._cnxtPth += temp[i];
                }
            }
        }
    }
    var ret = rxm_webroot._cnxtPth;
    if (url) {
        url.indexOf('/') == 0 && (url = url.substr(1));
        ret = ret + prefix + url;
    }
    else {
        //适应老的getserver 的要求，末位不能有/
        if (ret.lastIndexOf('/') == ret.length - 1) {
            ret = ret.substr(0, ret.length - 1);
        }
    }
    return ret;
}
rxm_webroot._cnxtPth = '----';
function rxmc_chksys(sm) {
    //cssOrm._global_.__ormglobal.main=""
    var o = 3;
    var smk;
    var morps = ["rxm-desktop", "rxm-mobile"];
    document.body.classList.remove("rxm-desktop", "rxm-mobile");
    var morp = 0;
    var sops = ["rxm-android", "rxm-iphone", "rxm-ipad", "rxm-win", "rxm-mac", "rxm-linux"];
    document.body.classList.remove("rxm-desktop", "rxm-mobile", "rxm-android", "rxm-iphone", "rxm-ipad", "rxm-win", "rxm-mac", "rxm-linux");
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var scode = self.frameElement.getAttribute('rxmdksmlr');
        if (scode) {
            scode = parseInt(scode);
            sm.isRxmdk = scode;
        }
    }
    if (sm && sm.isRxmdk && (smk = sm.isRxmdk)) {
        o = Math.floor(smk / 100);
        morp = Math.floor(smk / 10) % 10;
    }
    else {
        var sop = navigator.platform.toLowerCase();
        if (sop.indexOf("win") >= 0) {
            o = 3;
        }
        else if (sop.indexOf("mac") >= 0) {
            o = 4;
        }
        else if (sop.indexOf("linux") >= 0) {
            o = 5;
            var u = navigator.userAgent.toLowerCase();
            (u.indexOf("android") >= 0) && (o = 0, morp = 1);
        }
        else if (sop.indexOf("iphone") >= 0) {
            o = 1;
            morp = 1;
        }
        else if (sop.indexOf("android") >= 0) {
            o = 0;
            morp = 1;
        }
        else if (sop.indexOf("ipad") >= 0) {
            o = 1;
            morp = 1;
        }
    }
    document.body.classList.add(morps[morp]);
    sm && (sm[morps[morp]] = morps[morp]);
    document.body.classList.add(sops[o]);
    document.body.classList.add('rxm-loading-show');
}

(typeof cssOrm == "undefined") && (cssOrm = function () { },
    cssOrm._global_ = {
        __ormglobal: {}
    },
    cssOrm.default = {},
    cssOrm.obj = {},
    cssOrm.cls = {});
!window.getServer && (window.getServer = rxm_webroot);
(function () {
    var version = "2.1.1";
    var mblsn = 'rxmwidget';
    var dsktpsn = 'rxmdwidget';
    var rootPth = getServer();
    cssOrm._global_.__ormglobal.version = {
        v: version,
        /**项目唯一短名称 */
        mblsn: mblsn,
        dsktpsn: dsktpsn,
        //jquery 路径
        jqry: rootPth + '/www/rxm/jquery/jquery-2.1.3.min.js',
        rqr: rootPth + '/www/rxm/requirejs/require.js',
        rqrcss: rootPth + '/www/res',
        /**链接js */
        mbplgns: 'www/rxm/plgns/' + mblsn + '_' + version,
        dsktplgns: 'static/original/plgns/' + dsktpsn + '_' + version,
        mbllnkjs: [
            rootPth + '/www/rxm/plgns/' + mblsn + '_' + version + '.js'
        ],
        dsktplnkjs: [
            rootPth + '/static/original/plgns/' + dsktpsn + '_' + version + '.js'
        ],
        entry: 'rxmJsMain',
        plgnPath: function (isMobile) {
            require.config({
                paths: {
                    RXMPlgns: isMobile ? this.mbplgns : this.dsktplgns
                }
            });
            return 'RXMPlgns';
        }
    };
}());

(function () {
    var rxmwin = window;
    rxmwin.pageLoadBlock = function (actionId, args, serverUrl) {
        var _g = rxmwin.cssOrm._global_.__ormglobal;
        _g.url = serverUrl || _g.url;
        if (args && args.length > 0) {
            args = JSON.parse(args);
            if (typeof args.hash !== 'undefined') {
                if (navigator.userAgent.toLowerCase().indexOf('android') == -1 && rxmwin.location.hash.length == 0) {
                    // console.info(args.hash);
                    var usrHash = args.hash;
                    var href = rxmwin.location.pathname;
                    if (usrHash.substr(0, 1) !== '#') {
                        usrHash = '#' + usrHash;
                    }
                    ;
                    rxmwin.history.replaceState({}, '', href + usrHash);
                }
                else {
                    rxmwin.location.hash = args.hash;
                }
                ;
            }
            ;
        }
        _g.args = args || {};
        _g.actionId = actionId;
        if (typeof rxmwin.rxm_page !== 'undefined') {
            // console.warn("warn for cssom cipNetData");
            _g.isAppOpen = true;
            _g.isLocalLoad = rxmwin.location.protocol.indexOf('file') === 0;
            // 通讯
            rxmwin.rxm_request.fetchDataBlock = function (url, uniqueId, status, data) {
                var d = {
                    url: url,
                    uniqueId: uniqueId,
                    status: status === 1 ? 200 : status,
                    data: data
                };
                var ajxMsg = 'netMsg' + '_' + uniqueId;
                $(document).trigger(ajxMsg, d);
            };
            //
            rxmwin.pageResumeBlock = function () {
                rxmwin.cssOrm.trigger('pageActived', '', {});
            };
            rxmwin.cbError = function (type, args) {
                console.info(type + '|' + args.toString());
            };
            rxmwin.keyDownBlock = function (type) {
            };
            rxmwin.onMemoryWarning = function (type) {
            };
            rxmwin.keyboardChangeBlock = function (type) { };
        }
        else {
            var ags;
            (rxmwin.history.state != null) && (ags = rxmwin.history.state._args) && (_g.args = ags, _g.isRxmdk = ags.isRxmdk);
        }
        if (typeof rxmwin.rxm_msg_jpush !== 'undefined') {
            rxmwin.rxm_msg_jpush.onReceiveConnectionChange = function () { };
        }
        rqrRxm(true);
    };
    rxmwin.cssOrm.declare = function (clsName, cls, isGlobal) {
        //if (typeof __sword !== 'undefined') rxmwin[clsName] = cls
        if (typeof isGlobal === 'undefined')
            return;
        var tmpglb = rxmwin.cssOrm._global_;
        if (isGlobal) {
            if ((typeof cls === 'object') && (cls.constructor) && (cls.constructor.wdgtType)) {
                tmpglb._w = tmpglb._w || {};
                tmpglb._w[clsName] = cls;
                return;
            }
            {
                tmpglb[clsName] = tmpglb[clsName] || (typeof cls === 'function') ? new cls() : cls;
            }
        }
        else {
            rxmwin.cssOrm.cls[clsName] = cls;
        }
        rxmwin.cssOrm.obj[clsName] = function (option) {
            return isGlobal ? tmpglb[clsName] : (typeof cls === 'function') ? new cls(option) : cls;
        };
    };
    rxmwin.cssOrm.on = function (option) {
        /// <summary>加载命令响应函数</summary>
        /// <param  name="option"  value=" cssArgs.cssOrm.on"></param>
        if (typeof option.callback === 'undefined')
            return;
        var type = option.msgType + (option.id ? '_' + option.id : '');
        if (option.one) {
            $(document).off(type);
            $(document).one(type, option.data, option.callback);
        }
        else {
            $(document).on(type, option.data, option.callback);
        }
    };
    rxmwin.cssOrm.trigger = function (type, id, data) {
        var d = id;
        if (!(typeof id === 'string' || id instanceof String)) {
            data = id;
            d = '';
        }
        type = type + (d.length > 0 ? ('_' + d) : '');
        $(document).trigger(type, data);
    };
    var _gv = rxmwin.cssOrm._global_.__ormglobal;
    //确定  getserver 函数
    var stateH = function () {
        var ags;
        (rxmwin.history.state != null) && (ags = rxmwin.history.state._args) && (_gv.args = ags, _gv.isRxmdk = ags.isRxmdk);
    };
    (rxmwin.history.state == null) && rxmwin.addEventListener('message', function _onmsg(e) {
        if (e.data.msgName != 'orm_init_args')
            return;
        rxmwin.removeEventListener('message', _onmsg);
        var d = e.data || {};
        if (d.msgName == 'orm_init_args') {
            var state = {
                _router: d.router,
                _args: d.args,
                iframesid: d.iframesid
            };
            state._args.router = d.router;
            var au;
            (!(au = state._args._auth)) && (au = {}) && (au[state._router.pageRouter] = state._router) && (state._args._auth = au);
            rxmwin.history.replaceState(state, '', rxmwin.location.href);
            stateH();
        }
        ;
    }, false);
    (rxmwin.history.state !== null) && stateH();
    rxmc_chksys(_gv);
    var isdesktop = _gv.isRxmdk || _gv['rxm-desktop'];
    var rxmload = function () {
        /**
        * @type {HTMLElement}
        */
        var rxmMain;
        (rxmMain = document.getElementsByName('rxmJsMain')) && (rxmMain.length == 1) && (_gv.main = "rxmJsMain");
        var re = [];
        if (typeof rxmwin.jQuery === 'undefined') {
            re.push(_gv.version.jqry);
        }
        rxmwin.require(re, function (v) {
            var r2 = [
                'RxmDefaultv', 'rxmGstr', "RxmAppTool", 'RxmUtil', 'RxmCmdMgr', 'RxmPageBase'
            ];
            var r22 = [
                'RxmDefaultv', 'rxmGstr', "RxmAppTool", 'RxmUtil', 'RxmCmdMgr', "RxmAjax", 'RxmPageBase', 'RxmRouterMgr'
            ];
            !!_gv.main && (r2 = r22);
            /**
             * @type {HTMLElement}
             */
            var form = document.getElementsByTagName('form');
            (form !== null) && (form = form[0]) && (form.classList.contains('rxm-form-horizontal')) && (r2.push('JQuery.validate'));
            rxmwin.require(r2, function () {
                !!_gv.main && rxmwin.require([_gv.main], function (page) {
                    var f = false;
                    f = page ? ($.isFunction(page) ? page() : (page.__rxmbgn ? page.__rxmbgn() : page.init())) : false;
                    if (!f) {
                        document.body.classList.remove('rxm-loading-show');
                    }
                    $('#rxm_content').css('visibility', 'visible');
                });
            });
        });
    };
    var isNeedRqrRxm = true;
    var rqrRxm = function (ismobile) {
        if (!isNeedRqrRxm)
            return;
        isNeedRqrRxm = false;
        var rpth = _gv.version.plgnPath(ismobile);
        rxmwin.require([rpth], function () { rxmload(); });
    };
    //桌面onbody 回叫 
    var checkRqr = function () {
        // if (typeof rxmwin.require === 'undefined') {
        //   //没啥用
        //   var rqrscript = document.createElement('script')
        //   rqrscript.type = 'text/javascript'
        //   rqrscript.src = _gv.version.rqr
        //   rqrscript.onload = function () {
        //     rqrRxm()
        //   }
        //   document.body.appendChild(rqrscript)
        // } else {
        rqrRxm();
        //  }
    };
    rxmwin.getCSRFToken = function () { };
    var isNeedLoad = true;
    var onbodyload = function () {
        if (!isNeedLoad)
            return;
        isNeedLoad = false;
        if (document.all) {
            rxmwin.attachEvent("onload", checkRqr); //对于IE
        }
        else {
            rxmwin.addEventListener("load", checkRqr, false); //对于FireFox
        }
    };
    /**老的遗留 */
    rxmwin.rxm_begin = function (jsmain, waitbodyload) {
        jsmain && (_gv.main = jsmain);
        waitbodyload && onbodyload();
        !waitbodyload && checkRqr();
    };
    isdesktop && onbodyload();
}());

//处理 主题
//处理 图片 用于image load 函数 和img onload 函数
rxm_resize_load = function (a, b) {
    //rxmimg scale(保持宽高比) ,full（充满包裹器 div）, original（原图） 三种形式
    //包裹器宽度和高度的设
    var _htch = function (method, scope) {
        var it = scope || window;
        if ((typeof method == "string" || method instanceof String)) {
            if (!it[method]) {
                throw 'm is null';
            }
            return function () { return it[method].apply(it, arguments || []); }; // Function
        }
        return !it ? method : function () { return method.apply(it, arguments || []); }; // Function
    };
    /**@type {HTMLElement} */
    var e = event.target;
    e.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
    e.contentDocument.defaultView.addEventListener('resize', _htch(function () {
        /**@type {HTMLElement} */
        var me = this;
        $ && $.prototype.rxmTriggerCmd && function () {
            var alle = me.querySelectorAll('[rxmresizeid]');
            for (var i = 0; i < alle.length; i++) {
                var $item = $(alle[i]);
                /**@type {JQuery} */
                var r = $item.parents('.rxm-resize-panel');
                if (r.length > 0 && (r = $(r[0])) && r.is(me)) {
                    var ev = {};
                    ev.currentTarget = me;
                    ev.target = $item[0];
                    $($item.attr('rxmresizeid')).rxmTriggerCmd({ originalEvent: ev, sayTo: 'self' });
                }
            }
        }();
    }, e.parentElement));
};
//图片404时，触发此方法
rxm_image_onerror = function (image) {
    image.src = "www/res/img/noimage.jpg";
    image.parentElement.setAttribute("style", "");
    image.parentElement.setAttribute("style", "text-align: center;line-height: " + image.parentElement.offsetHeight + "px;");
    image.setAttribute("style", "visibility:visible;vertical-align:middle;padding:20px;");
    image.nextElementSibling.setAttribute("style", "");
};
rxm_iconlist_image_onerror = function (image) {
    image.src = "www/res/img/noimage.jpg";
};
rmx_image_resize = function (image, type) {
    //缩放图片
    var _scaleImage = function (imageElment) {
        //初始清空容器属性，解决原图尺寸切换其他尺寸的bug
        imageElment.parentElement.setAttribute("style", "height:" + imageElment.getAttribute('rxmheight'));
        //容器宽度，高度
        var containerWidth = imageElment.parentElement.offsetWidth;
        var containerHeight = imageElment.parentElement.offsetHeight;
        var ratio = imageElment.naturalWidth / imageElment.naturalHeight;
        var pratio = containerWidth / containerHeight;
        //第一种情况：小尺寸图标，宽高都小于容器时，都水平垂直居中
        if (imageElment.naturalWidth < containerWidth && imageElment.naturalHeight < containerHeight) {
            imageElment.parentElement.setAttribute("style", "text-align: center;line-height: " + containerHeight + "px; height:" + imageElment.getAttribute('rxmheight'));
            imageElment.setAttribute("style", "visibility:visible;vertical-align:middle");
            _restoreTitlePosition(imageElment);
        }
        else {
            //第二种情况：图片过高
            if (ratio < pratio) {
                imageElment.setAttribute("style", "visibility:visible;height:100%;");
                imageElment.parentElement.setAttribute("style", "text-align: center; height:" + imageElment.getAttribute('rxmheight'));
                _restoreTitlePosition(imageElment);
            }
            //第三种情况：图片过宽
            else {
                imageElment.setAttribute("style", "visibility:visible;width:100%; vertical-align:middle");
                imageElment.parentElement.setAttribute("style", "line-height: " + containerHeight + "px; height: " + imageElment.getAttribute('rxmheight'));
                //标题根据图片移位
                var offset = (containerHeight - imageElment.clientHeight) / 2;
                _resizeTitlePosition(imageElment, offset);
            }
        }
    };
    var _fullImage = function (imageElment) {
        imageElment.parentElement.setAttribute("style", "height:" + imageElment.getAttribute('rxmheight'));
        imageElment.setAttribute("style", "width:100%;height:100%;");
        _restoreTitlePosition(imageElment);
        return false;
    };
    var _originalImage = function (imageElment) {
        imageElment.parentElement.setAttribute("style", "width:auto; height:auto;");
        imageElment.setAttribute("style", "");
        _restoreTitlePosition(imageElment);
        return false;
    };
    var _resizeTitlePosition = function (imageElment, offset) {
        if (imageElment.getAttribute('rxmisdisplaytitle') == "true") {
            imageElment.nextElementSibling.setAttribute("style", "bottom:" + (offset - 3) + "px;");
        }
    };
    var _restoreTitlePosition = function (imageElment) {
        if (imageElment.getAttribute('rxmisdisplaytitle') == "true") {
            imageElment.nextElementSibling.setAttribute("style", "");
        }
    };
    if (type == 'scale') {
        _scaleImage(image);
    }
    else if (type == 'full') {
        _fullImage(image);
    }
    else if (type == 'original') {
        _originalImage(image);
    }
};
//自动调整image比例，适应父级容器
rxm_image_load = function (image) {
    //onerror时已经在onerror内加载错误图片,onload不执行直接退出，防止死循环
    if (event.target.src.indexOf('noimage') > 0) {
        return;
    }
    //onload入口
    if (event.target.getAttribute("rxmurl")) {
        //设置图片路径
        // if( !image ){
        //    event.target.setAttribute("src" , event.target.getAttribute("rxmurl"));
        // }
        //矫正图片宽高比
        rmx_image_resize(event.target, event.target.getAttribute("rxmfill"));
    }
};

//# sourceMappingURL=cssOriginal.js.map
