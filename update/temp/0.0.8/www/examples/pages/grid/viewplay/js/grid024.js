
        /// <reference path="../../../../jslib/examples/examplesImport.js" />
        define(['RxmGrid'],
        function (RxmGrid) {
            var grid024 = new RxmGrid({id:"grid024"})

            var onTapLineElement = function(e,data){
                alert("222")
            }


            grid024.bindTapLineElement({callback:onTapLineElement},grid024)
            return grid024
        })
    