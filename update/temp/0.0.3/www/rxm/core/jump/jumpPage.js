
define(['RxmRouterMgr'], function (auth) {
     /// <param name="auth" value="ObjOriginalAuth"></param>
  var ret = {
      init: function () {
          if (window.location.hash.length > 0) {
              auth.load()
            }
        }
    }

  return ret
    })
