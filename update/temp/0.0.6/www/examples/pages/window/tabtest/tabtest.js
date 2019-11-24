define([
	require.rxm.PageBase
   ,"RxmTab"],
   /**
	* @param {rxm.Page} PageBase
	*/
   function (PageBase,RxmTab) {
	    //  /**@type  {rxm.RouterMgr} */
	    //  var routers=require(require.rxm.RouterMgr)
	    //  /**@type {rxm.AppTool} */
	    //  var appInfo =require(require.rxm.AppTool)
        /**@type {rxm.Page} */
         var tab001 = new RxmTab({id:"tab003"})
         var arg = {
               "tabId":"example_tab",
               "tabItem":"<a><span>创建tab</span>&nbsp;&nbsp;<i class='cs-nav-btn-close fa fa-times-circle deleteTabbtn'></i></a>",
               "tabPanel":"<div>5555555</div>"
         }
         var arg2 = "example_tab"
         
         var arg3 = ["tab003_def1","tab003_def2"]
         
       
         //tab001.bindRxmTabClose({fn:function(e,data){alert(222)}})
         
         //tab001.bindRxmTabClosed({fn:function(e,data){alert(2)}})

        tab001.bindRxmTabShown({fn:function(e,data){

           var ttt =    $("#"+data.tabId)
           
           ttt.find("span").after("<i class='fa fa-refresh'></i>")
          

           
          }})
         
         
         tab001.bindRxmTabHidden({fn:function(e,data){
        
           var ttt =    $("#"+data.tabId)
             
           ttt.find(".fa-refresh").remove()
 
         }})
         
        
         var  addTab= function(){
            tab001.addTabItem()
            tab001.openTabItem(arg2)
         }
        
         var  delTab= function(){
            tab001.deleteTabItem()
         }
        
        $(".deleteTabbtn").tap(delTab)

        $(".addTabbtn").tap(addTab)
        
		var page = PageBase
		page.init = function () {
			//TODO
		}
		return page
	}
)