/// <reference path="../../../../jslib/examples/examplesImport.js" />
/**
 * @name  form 
 * @description  form表单测试页面控制器
 * @author  originaladmin 2019-01-10 10:39:13
 */
define([
	require.rxm.PageBase,"./js/form001.js"],
   /**
	* @param {rxm.page} PageBase
	*/
   function (PageBase,form001) {
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