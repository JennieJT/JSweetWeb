
        /// <reference path="../../../../jslib/examples/examplesImport.js" />
        define(['RxmGrid'],
        function (RxmGrid) {
            var grid002 = new RxmGrid({id:"grid002"})
            var onTapLineElement = function(e,data){
                alert("222")
            }


            grid002.bindTapLineElement({callback:onTapLineElement},grid002)
            return grid002
        })
    