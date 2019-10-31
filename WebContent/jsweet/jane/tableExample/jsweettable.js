require([/**"JSweetPage",*/"JSweetForm", "JSweetDlg", "JSweetGrid", "text!" + "jsweet/jane/jsweetform2/jsweetContent.html"], function (/*JPage,*/Jform, JSweetDlg, JsweetGrid, dlgText) {
    $(document).ready(function () {
        /**@type {JSweetGrid} */ 
        var grid = JsweetGrid({ id: "jsweet_table_example", templeteId: "jsweet_table_templete" })
        grid.load({
            url: "jswt/jane/fetchTable",
            param: {},
            curPage: 1,
            rowNum: 0
        })
        var clickAtRowItem="clickAtRowItem";
        $("#jsweet_table_example").on(clickAtRowItem, function (e,data) {
            var personData =data;
            $("#jsweet_button_edit").trigger("click",personData);
        });

        $("#jsweet_table_example").on("click", ".jsweet-td-a", { a: "a", b: "b" }, function (e) {
            var imconfused = $(this).closest("tr")
            var rowNum = $(".jsweet-table-tr").index(imconfused);
            var personData = grid.getDataByRow(rowNum);
            $("#jsweet_table_example").trigger(clickAtRowItem,personData);
        });
        // $("#jsweet_table_example").on("click", '[name="jsweet_td_selected"]', { a: "a", b: "b" }, function (e) {
        //     var comeon = grid.checkedRow();
        //     var myDadIsWired = $(this).closest("tr").find("a")
        //     myDadIsWired.trigger("click", { c: 'c', d: 'd' })

            //  event.preventDefault();
        // });
        $("#jsweet_button_insert").click(function () {
            var allText = dlgText;
            var dlg = JSweetDlg({
                id: "dlg",
                content: allText,
                onload: function () {
                    var jform = Jform({
                        id: "jsweet-form2", voptions: {
                            rules: {
                                name: {
                                    required: true,
                                    jsweetFirstNotB: "A?EIOU"
                                },
                                login: "required",
                                checkbox: {
                                    required: true
                                },
                                birthday: "required"
                            },
                            messages: {
                                name: {
                                    required: "please insert your name"
                                },
                                login: "please insert your login account              sdfghjklkjhgzZxcvghjkfghjksdfghj",
                                checkbox: {
                                    required: "please select at least one hobby"
                                }
                            }
                        }
                    });
                    $("#jsweet_submit_button").click(function () {
                        //get all the value from the form
                        //jquery serialize function: get all the data from the form as key and value;
                        jform.submit({
                          //  url: "jswt/jane/paramForm",
                        	url: "jswt/HQL/University",
                            success: function (s) {
                                dlg.close();
                                grid.load();
                            },
                            error: function (e) {
                                alert("noooooo");
                            }
                        });

                    });
                },
                closing: function () {
                    console.info("hihihihi");
                },
                closed: function () {
                    // window.location.reload(true);
                    grid.load();
                }
            });
            dlg.modal();

        });
        $("#jsweet_button_delete").click(function () {
            var personToDelete = grid.getDataChecked();
            if (personToDelete==[]) {
                alert("Nothing selected!!")
                return;
            }
            var nameToDelete=[]
            for(i in personToDelete){
                nameToDelete.push(personToDelete[i]['name']);
            }
            $.ajax(
                {

                    url: "jswt/jane/deleteTable",
                    type: "post",
                    data: { nameToDelete: nameToDelete.join(",") },
                    success: function (d) {
                        if (d.success) {
                            window.location.reload(true);
                        }
                    }
                }
            )

        });
        $("#jsweet_button_edit").click(function (e, data) {
            var nameToEdit
            if (data) {
                nameToEdit = data["name"];
            } else {
                var dataChecked = grid.getDataChecked();
                if (dataChecked.length > 0) {
                    nameToEdit = dataChecked[0]["name"];
                } else {
                    alert("nothing to edit!!!!")
                    return;
                }
            }
            var dlg = JSweetDlg({
                id: "dlg",
                content: dlgText,
                onload: function () {
                    /** @type {JSweetForm} */
                    var jform = Jform({ id: "jsweet-form2" });
                    jform.load({ url: "jswt/jane/editTable", data: { nameToEdit: nameToEdit } })
                    $("#jsweet_submit_button").click(function () {
                        //get all the value from the form
                        //jquery serialize function: get all the data from the form as key and value;
                        jform.submit({
                            url: "jswt/jane/paramForm",
                            success: function (s) {
                                dlg.close();
                            },
                            error: function (e) {
                                alert("noooooo");
                            }
                        });
                    });
                },
                closing: function () {
                    console.info("hihihihi");
                },
                closed: function () {
                    grid.load();
                }
            });
            dlg.modal();
        });

        $("#jsweet_button_refresh").click(function () {
            grid.load();
        });
    });
})