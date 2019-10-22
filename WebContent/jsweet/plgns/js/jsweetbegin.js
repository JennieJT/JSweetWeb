window.jsweetGetRoot=function () {
    var path = document.location.pathname
    var deletePath = document.getElementsByTagName("base")[0].getAttribute("href")
    var numberOfSlash = function (pathName) {
        var num = 0;
        for (var i = 0; i < pathName.length; i++) {
            if (pathName.charAt(i) == '/') {
                num = num + 1;
            }
        }
        return num;

    }
    //get the number of "/" and  delete.
    var validSlash = numberOfSlash(path) - numberOfSlash(deletePath) - 1
    //a method that find the valid length of the virtual path. 
    var virtualPath = function (validSlash, path) {
        var len = 0;
        var traversedSlash = 0;
        for (var i = 0; i < path.length; i++) {
            if (traversedSlash == validSlash && path.charAt(i) == '/') {
                len = i;
            }
            if (path.charAt(i) == '/') {
                traversedSlash = traversedSlash + 1;
            }
        }
        return len;
    }
    var ans = path.substring(0, virtualPath(validSlash, path));
     return ans
}

require.config(
    {
        baseUrl:jsweetGetRoot(),
        paths: {
           // basic modal 
           JSweetDlg:'jsweet/plgns/src/common/JSWTDialog',
           JSweetHTMLDir:'jsweet/plgns/html',
           JSweetForm:'jsweet/plgns/src/common/JSweetForm',
           JSweetGrid:'jsweet/plgns/src/common/JSweetGrid',
           JSweetPage:'jsweet/plgns/src/common/JSWTPage'
         },
        waitSeconds: 0,
        shim: {
          
        },
        map: {
          '*': {
            'css': 'jsweet/plgns/deps/require/plugin/require-css/css.min',
            'text': 'jsweet/plgns/deps/require/plugin/text'
          }
        }
    }
)