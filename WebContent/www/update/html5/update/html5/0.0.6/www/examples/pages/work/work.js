define([require.rxm.PageBase, "RxmIconList",'RxmRouterMgr', "RxmSlider"],
    /**
     * @param {rxm.Page} pagebase
     * @param  {Object}  File
     */
    function (pagebase, RxmIconList,auth, RxmSlider) {
        /** @type {rxm.Page} */
        var page = pagebase
        auth.getSonsByGroup("home_work",f);
        //auths即为"home_work"节点下权限的集合

        function f (auths){
            var iconData = [];
            for (const key in auths) {
                var iconObj = {
                    categoryTitle : key,
                    listData : []
                }

                $.each( auths[key] , function( index, element ){
                    iconObj.listData.push({
                        title : element.pageName,
                        imageUrl : element.pageIcon,
                        id : element.pageId,
                        categoryTitle : element.i,
                        href : element.pageUrl,
                        pageUrl: element.pageUrl,
                        pageCtrl : key,
                        pageCtrlUrl : element.pageCtrlUrl,
                        pageId: element.pageId,
                        pageRouter: element.pageRouter
                    });
                });

                iconData.push( iconObj );
            }
            //});


            var list009 = new RxmIconList({
                id:'rxmdk_home',
                data : iconData
            });

            list009.init();

            // var a = {
            //     pageCtrl: "home_work_ctrl",
            //     pageCtrlUrl: "www/examples/tutorial/work",
            //     pageDesc: "工作",
            //     pageIcon: "www/examples/tutorial/view/work.png",
            //     pageId: "9649a526516d45118061fe02e356316c",
            //     pageName: "工作",
            //     pageOpen: "_self",
            //     pageOrder: 1,
            //     pagePid: "root",
            //     pageRouter: "home_work",
            //     pageTemplate: "2661277",
            //     pageType: "10",
            //     pageUrl: "www/examples/tutorial/view/work.html"
            // }

            //选中icon激活事件
            list009.bindTapIcon({ fn:function( e , data ){
                var sliderbar = pagebase.slidebar({
	    			title: data.title,
    	    		pageUrl: data.pageUrl,
					pageCtrl: data.pageCtrl,
					pageType: "10" ,
					pageId: data.pageId,
                    pageRouter: data.pageRouter
                })
            }});
        }

        page.init = function () {

        }


        return page;
    })