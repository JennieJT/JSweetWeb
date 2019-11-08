define(['RxmTree'],
    function (RxmTree) {
        var tree002 = new RxmTree({ 
            id: "tree002",
            callback:{
                onRightClick:function(e,treeId,treeNode){
                    //选中当前节点
                    tree002.selectNode(treeNode)
                    //展开菜单
                    var popMenu = $('#menu004').rxmPopMenu()
                    popMenu.popMenu({
                        data:treeNode,
                        positionIn:'touchPosition'
                    })
                }
            }
        })

        //第一个菜单项执行的回调函数
        function onTreeRightClick1(e,data){
            if(!!data && typeof data.nodeName != 'undefined'){
                alert('当前节点名称为"' + data.nodeName + '"')
            }
            
        }


        //第二个菜单项执行的回调函数
        function onTreeRightClick2(e,data){
            if(!!data && typeof data.level != 'undefined'){
                alert('当前节点层级为"' + data.level + '"')
            }
            
        }


        //绑定菜单项消息
        $('treeTestMenu1').rxmBindCmd({fn:onTreeRightClick1})
        $('treeTestMenu2').rxmBindCmd({fn:onTreeRightClick2})
        return tree002
    })
