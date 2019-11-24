define([require.rxm.Message
        ,require.rxm.MessageListener
        ,require.rxm.Util], function (Msg,MsgListener,Util) {
    var ret = {};
    ret.init = function ($compile,$scope) {
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

    		$("#btn1").tap(function(){
    			Msg.stopPush();
    		});

    		$("#btn2").tap(function() {
    			Msg.resumePush();
    		});

    		$("#btn3").tap(function() {
    			Msg.setAlias('');
    		});

    		$("#btn4").tap(function(){
    			Msg.clearAllNotifications();
    		});
    		$("#btn5").tap(function(){
    			Msg.getConnectionState(function(data){
    				Util.alert(data);
        			$('#info_Area').val(data);
    			});
    		});
    		
    		$("#btn6").tap(function() {
    			Msg.setBadgeNumber(0);
    		});
    		
    		$("#btn7").tap(function() {
    			var params = {
    				    builderId:0,
    				    title:"这是title",
    				    content:"这是内容",
    				    extras:{"msgType":"1"},
    				    notificationId:3,
    				    broadCastTime:1000
    				};
    			Msg.addLocalNotification(params);
    		});
    		$("#btn8").tap(function() {
    			Msg.removeLocalNotification(3);
    		});
    		$("#btn9").tap(function() {
    			Msg.clearLocalNotifications();
    		});
    		
    		$("#btn10").tap(function() {
    			
    			var msgSender = cssOrm.obj.clsAppArgs().getUserID();
    			var params = {msgSender:msgSender ,msgType:"1",rcver:[msgSender],title:"test",content:"this is a test",extras:{msgType:"1",test:"2"}};
    			
    			$.ajax({
    	            url: getServer() + "/resoft/origianl/message/sendMsgTest",
    	            type: "post",
    	            data: {pushType:0,invalidTime:1,msgSender:params.msgSender,msgType:params.msgType,rcver:JSON.stringify(params.rcver),title:params.title,content:params.content,extras:JSON.stringify(params.extras)},
    	            success: function (data) {
    	            	console.info(data);
    	            }
    	        });
			});
    }
    return ret;
})