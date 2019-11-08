define('rxmJsMain', ["RxmMessage","RxmMessageListener"], function (Msg,MsgListener) {
	//  /**@type {rxm.AppTool} */
	//  var appInfo =require(require.rxm.AppTool)
	/**@type {RxmPage} */
	var rxmPage = require('RxmPageBase')
	var onPageLoad = function (e, data) {
		//todo html、插件加载完毕
		var callb = function(e,d){
			Msg.clearLocalNotifications();
			alert("11");
	   };
	   var callb2 = function(e,d){
		   alert("22");
		  };
		  
	   var msgListener=new MsgListener();
	   //收到了通知
	   msgListener.callbackMsg({
			  when:"receiveMsg",
			  msgType:"1", 
			  callback:callb
	   });
	   
	   //用户点击了通知
	   msgListener.callbackMsg({
			   when:"openMsg",
			   msgType: "1",
			   callback:callb2
	   });


		var btn1 = function(){
			Msg.stopPush();
        }
		$('btn1').rxmBindCmd({fn:btn1,hearFrom:'all'})
		var btn2 = function(){
			Msg.resumePush();
        }
		$('btn2').rxmBindCmd({fn:btn2,hearFrom:'all'})
		var btn3 = function(){
			Msg.setAlias('');
        }
		$('btn3').rxmBindCmd({fn:btn3,hearFrom:'all'})

		var btn4 = function(){
			Msg.clearAllNotifications();
        }
		$('btn4').rxmBindCmd({fn:btn4,hearFrom:'all'})

		var btn5 = function(){
			Msg.getConnectionState(function(data){
				alert(data);
				$('#info_Area').val(data);
			});
        }
		$('btn5').rxmBindCmd({fn:btn5,hearFrom:'all'})

		var btn6 = function(){
			Msg.setBadgeNumber(0);
        }
		$('btn6').rxmBindCmd({fn:btn6,hearFrom:'all'})

		var btn7 = function(){
			var params = {
				builderId:0,
				title:"这是title",
				content:"这是内容",
				extras:{"msgType":"1"},
				notificationId:3,
				broadCastTime:1000
			};
			Msg.addLocalNotification(params);
        }
		$('btn7').rxmBindCmd({fn:btn7,hearFrom:'all'})

		var btn8 = function(){
			Msg.removeLocalNotification(3);
        }
		$('btn8').rxmBindCmd({fn:btn8,hearFrom:'all'})

		var btn9 = function(){
			Msg.clearLocalNotifications();
        }
		$('btn9').rxmBindCmd({fn:btn9,hearFrom:'all'})

		var btn10 = function(){
			var msgSender = require('RxmAppTool').getUserID();
    			var params = {msgSender:msgSender ,msgType:"1",rcver:[msgSender],title:"test",content:"this is a test",extras:{msgType:"1",test:"2"}};
    			
    			$.ajax({
    	            url: getServer() + "/resoft/origianl/message/sendMsgTest",
    	            type: "post",
    	            data: {pushType:0,invalidTime:1,msgSender:params.msgSender,msgType:params.msgType,rcver:JSON.stringify(params.rcver),title:params.title,content:params.content,extras:JSON.stringify(params.extras)},
    	            success: function (data) {
    	            	console.info(data);
    	            }
    	        });
        }
		$('btn10').rxmBindCmd({fn:btn10,hearFrom:'all'})
	}
	rxmPage.bindPageReady({ callback: onPageLoad })
	return rxmPage
})