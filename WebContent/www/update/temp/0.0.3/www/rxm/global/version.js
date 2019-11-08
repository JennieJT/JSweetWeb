(typeof cssOrm == "undefined") && (cssOrm = function () { },
    cssOrm._global_ = {
        __ormglobal: {
        }
    },
    cssOrm.default = {},
    cssOrm.obj = {},
    cssOrm.cls = {})
!window.getServer && (window.getServer = rxm_webroot);
(function () {
    var version = "2.1.1"
    var mblsn = 'rxmwidget'
    var dsktpsn = 'rxmdwidget'
    var rootPth = getServer()
    cssOrm._global_.__ormglobal.version = {
        v: version,
        /**项目唯一短名称 */
        mblsn: mblsn,
        dsktpsn: dsktpsn,
        //jquery 路径
        jqry: rootPth + '/www/rxm/jquery/jquery-2.1.3.min.js',
        rqr: rootPth + '/www/rxm/requirejs/require.js',
        rqrcss:rootPth+'/www/res',
        /**链接js */
        mbplgns:'www/rxm/plgns/' + mblsn + '_' + version,
        dsktplgns:'static/original/plgns/' + dsktpsn + '_' + version,
        mbllnkjs: [
            rootPth + '/www/rxm/plgns/' + mblsn + '_' + version + '.js'],
        dsktplnkjs: [
            rootPth + '/static/original/plgns/' + dsktpsn + '_' + version + '.js'],
        entry: 'rxmJsMain',
        plgnPath:function(isMobile)
        {
            require.config(
                {
                  paths:{
                     RXMPlgns:isMobile ? this.mbplgns :this.dsktplgns  
                  }
                }
              )
              return 'RXMPlgns'
        }
    }
}())