define([
	require.rxm.PageBase,"RxmLRLayout"],
   /**
	* @param {rxm.Page} PageBase
	*/
   function (PageBase,RxmLRLayout) {
		 var panel001 = new RxmLRLayout({id:"panel001"})
	    //  /**@type  {rxm.RouterMgr} */
	    //  var routers=require(require.rxm.RouterMgr)
	    //  /**@type {rxm.AppTool} */
	    //  var appInfo =require(require.rxm.AppTool)
		  /**@type {rxm.Page} */
		var page = PageBase
		page.init = function () {
			//TODO
		}
		return page
	}
)