/**
 * @name  数据选择 
 * @description  页面控制器
 * @author  swordadmin 2018-05-29 13:42:45
 */
/**@type {rxm.AppTool} */
var  appTool =require(require.rxm.AppTool)
var  path
if(!!appTool.getAppArgs()&&(!!appTool.getAppArgs().data)){
  path=appTool.getAppArgs().data.myPath
}
path=path||require.rxm.SearchGrid
define([
	path
   ],
  function (SearchGrid) {
    var config=appTool.getAppArgs().data
    var search=new SearchGrid(config)
    search.init();


  })