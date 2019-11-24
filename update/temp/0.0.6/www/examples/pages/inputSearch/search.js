/// <reference path="../../../jslib/examples/examplesImport.js" />
/**
 * @name  test 
 * @description  111页面控制器
 * @author  originaladmin 2018-12-04 16:27:01
 */
define([
	require.rxm.PageBase,"RxmInputSearch"],
   /**
	* @param {rxm.page} PageBase
	*/
   function (PageBase,RxmInputSearch) {
		 var search001 = new RxmInputSearch({id:"search001"})
	    //  /**@type  {rxm.RouterMgr} */
	    //  var routers=require(require.rxm.RouterMgr)
	    //  /**@type {rxm.AppTool} */
	    //  var appInfo =require(require.rxm.AppTool)
        /**@type {rxm.Page} */
		var orm = PageBase
        var page = orm
		page.init = function () {
			//TODO
		}
		return page
	}
)