define([], function () {
    // global variable
    const defArgs = {
        id: "",
        topLeft: { top: 5, left: 5 },
        size: { height: 100, width: 100 },
        smlSize: "middle",
        title: "dialog",
        content: "",
        dialUrl: "JSweetHTMLDir/jswtDialog.html"
    }
    var small={height:400,width:400}
    var middle={height:500,width:500}
    var large={height:600,width:600}
    /**
     * 
     * @param {TJsweetDlgAres} args 
     */
    var factory = function (args) {
        var config = Object.assign({}, defArgs, args)
        //constructor
        var JSweetDlg = function () {
        }
        
        var onClsDlg = function (e) {
            if(config.closing){
                config.closing();
            }
            const dialogBox = document.querySelector("#" + config.id);
            dialogBox.remove();
            if(config.closed){
                config.closed();
            }
        }
        JSweetDlg.prototype.modal = function () {
            require(["text!" + config.dialUrl], function (dialogText) {
                dialogText=dialogText.replace("{{id}}",config.id)
                dialogText=dialogText.replace("{{title}}",config.title)
                var width=small.width
                var height=small.height
                if(config.smlSize=="middle"){
                    width=middle.width;
                    height=middle.height;
                }else if(config.smlSize=="large"){
                    width=large.width;
                    height=large.height;
                }

                dialogText=dialogText.replace("{{width}}",width)
                dialogText=dialogText.replace("{{height}}",height)
                dialogText=dialogText.replace("{{templete-replace}}",config.content)

               var div=document.createElement('div')
                div.innerHTML=dialogText
                div=div.children[0]
                document.body.appendChild(div)
                if (config.id) {
                    $('#' + config.id + ' .jsweet-close').click(onClsDlg);
                }
                if(config.onload){
                    config.onload()
                }

                
            })
        }
        JSweetDlg.prototype.close = function () {
            onClsDlg()
        }
        return new JSweetDlg()
    }
    return factory
});