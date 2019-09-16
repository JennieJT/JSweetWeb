
require(['JSweetDlg'],function(Dlg){
    /** @type {JSweetDlg} */
    var dlg;
    function popDialog() {
        /**
         * @type {TJsweetDlgAres}
         */
        var templeteContent=document.getElementById("jsweet_example_templete").innerHTML;
        var  args={
            id:'wjt_dlg',
            content:templeteContent,
            onload:function(e){
                $('#wjt_dlg .jsweet-okay').click(function(){
                    alert('closing...')
                    dlg.close()
                })
            }
        }      
       dlg=Dlg(args)
       dlg.modal()
    }
    var onload=function()
    {
        document.getElementById('openbutton').addEventListener("click", popDialog, false);
    }
    onload(); 
 })