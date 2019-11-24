
        /// <reference path="../../../../jslib/examples/examplesImport.js" />
        define(['RxmGrid'],
        function (RxmGrid) {
            var d = [{
				msgTitle: "测试1",
				msgSentUser: "管理员",
				msgContent: "测试消息内容1",
				msgSentSystem: "财务系统",
				msgLinkAddress: "http://www.baidu.com",
				mailMsg: "邮件消息",
				msgDate: "2099-08-18 17:50:05"
			},
			{
				msgTitle: "测试2",
				msgSentUser: "管理员",
				msgContent: "测试消息内容2",
				msgSentSystem: "财务系统",
				msgLinkAddress: "http://www.baidu.com",
				mailMsg: "邮件消息",
				msgDate: "2099-08-18 17:50:05"
			},
			{
				msgTitle: "测试3",
				msgSentUser: "管理员",
				msgContent: "测试消息内容3",
				msgSentSystem: "财务系统",
				msgLinkAddress: "http://www.baidu.com",
				mailMsg: "邮件消息",
				msgDate: "2099-08-18 17:50:05"
			}
            ]
            var grid001 = new RxmGrid({id:"grid001",data:d})
            return grid001
        })
    