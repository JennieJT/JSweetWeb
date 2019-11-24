/////<reference path="../../../typings/index.d.ts"/>
(typeof cssOrm == "undefined") && (cssOrm = function () { },
    cssOrm._global_ = {
        __ormglobal: {}
    },
    cssOrm.default = {},
    cssOrm.obj = {},
    cssOrm.cls = {});
cssOrm.getServer = getServer;
cssOrm._setInitArgs = function (args) {
    var tmp;
    for (var i in args) {
        tmp = cssOrm._global_.__ormglobal;
        tmp[i] = args[i];
    }
};
cssOrm.hitch = function (method, scope) {
    var it = scope || window;
    if ((typeof method === 'string' || method instanceof String)) {
        if (!it[method]) {
            throw (['lang.hitch: scope["', method, '"] is null (scope="', it, '")'].join(''));
        }
        return function () { return it[method].apply(it, arguments || []); }; // Function
    }
    return !it ? method : function () { return method.apply(it, arguments || []); }; // Function
};
cssOrm.evt = {
    enumAppMsg: {
        netMsg: 'netMsg'
    }
};
cssOrm.getCSRFToken = function () {
};
(function () {
    var mjs, sorm;
    (sorm = document.getElementById('rxm__ctrl_js')) && sorm && (mjs = sorm.title) && (cssOrm._setInitArgs({ main: mjs }));
}());

//# sourceMappingURL=cssOrm.js.map
