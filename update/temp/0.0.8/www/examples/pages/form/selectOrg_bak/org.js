/// <reference path="../../../jslib/examples/examplesImport.js" />
define([
	require.rxm.PageBase,
	"www/examples/pages/form/selectOrg/selectOrg",
   ],
   function (PageBase, selectOrg) {
	   /**@type  {rxm.Page} */
		var orm = PageBase
		var page = orm
		page.init = function () {
			selectOrg.init()
		}
		return page
	}
)