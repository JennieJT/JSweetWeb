define(['RxmRouterMgr'], function (auth) {
    ///<param name="auth" value="ObjOriginalAuth"></param>
    var ret = {
        init: function () {
            auth.load();
        }
    };
    return ret;
})