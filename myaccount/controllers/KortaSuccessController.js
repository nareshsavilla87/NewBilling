KortaSuccessController = function(rootScope,RequestSender,location,localStorageService,routeParams) {
 
    		
			var formData = {};
			
			//getting routeParams values
			var screenName 			= routeParams.screenName;
			var planId 				= routeParams.planId;
			var priceId 			= routeParams.priceId;
			var secretCode 			= localStorageService.get("secretCode");
			
    		//values getting form constants.js file
    		var kortaServer 		= selfcareModels.kortaServer;
    		var kortaAmountField 	= selfcareModels.kortaAmountField;
   		    var kortaclientId 		= selfcareModels.kortaclientId;
   		    var kortaPaymentMethod 	= selfcareModels.kortaPaymentMethod;
   		    var kortaTokenValue		= selfcareModels.kortaTokenValue;
    		var encrytionKey 		= selfcareModels.encriptionKey;
    		 
    		var downloadmd5		 	= location.search().downloadmd5;         
    		var reference 		  	= location.search().reference;        	
    		var checkvaluemd5 	  	= location.search().checkvaluemd5;
    		var cardbrand	 	  	= location.search().cardbrand;
    		var card4 	  			= location.search().card4;
    		var encryptedData     	= location.search().key;
    		var cardbrand 	  		= location.search().cardbrand;
    		var card4 	  			= location.search().card4;
        	var decryptedData     	= CryptoJS.AES.decrypt(encryptedData, encrytionKey).toString(CryptoJS.enc.Utf8);
        	var	kortaStorageData 	= JSON.parse(decodeURIComponent(decryptedData));
        	formData.total_amount 	= kortaStorageData[kortaAmountField];
        	formData.clientId 		= kortaStorageData[kortaclientId];
        	formData.locale 		= kortaStorageData.locale;
        	formData.emailId 		= kortaStorageData.email;
        	formData.transactionId	= reference;
        	formData.source 		= 'korta';	
        	formData.otherData 		= '{"paymentId":'+reference+'}';
       	 	formData.device 		= '';
       	 	formData.currency 		= selfcareModels.kortaCurrencyType;
       	 	formData.cardType 		= cardbrand;
       	 	formData.cardNumber 	= "XXXX-XXXX-XXXX-"+card4.toString();

        	var PaymentMethod 		= kortaStorageData[kortaPaymentMethod];
        	var kortaToken			= kortaStorageData[kortaTokenValue];
        	
        	var stringData = '';
        	kortaServer == 'TEST' ? stringData = 2 + checkvaluemd5+reference + secretCode + kortaServer :
	      	kortaServer == 'LIVE' ? stringData = 2+checkvaluemd5+reference+secretCode :
	      		(alert("Please Configure the Server Type Properly. Either 'TEST' or 'LIVE'"),stringData = '');
        	
        	var downloadmd5String = md5(stringData);
        	        	
        	if(downloadmd5String == downloadmd5){
	        	
        		if(PaymentMethod == "STNOCAP"){
        			
        			RequestSender.updateKortaToken.update({clientId : formData.clientId},{kortaToken: kortaToken},function(data){
        				location.$$search = {};
        				location.path('/profile');
        			});
        		}else if(PaymentMethod == "STORAGE"){
        				
    				RequestSender.updateKortaToken.update({clientId : formData.clientId},{kortaToken: kortaToken},function(data){
    				  RequestSender.paymentGatewayResource.update({},formData,function(data){
    					  localStorageService.add("paymentgatewayresponse", {data:data,cardType:formData.cardType,cardNumber:formData.cardNumber});
    					  rootScope.iskortaTokenAvailable = true;
						var result = data.Result || "";
						location.$$search = {};
						if(screenName == 'payment'){
							location.path('/paymentgatewayresponse/'+formData.clientId);
						}else if(result == 'SUCCESS'){
							location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
						}else{	 
							location.path('/paymentgatewayresponse/'+formData.clientId);

						}
					  });     	  		
    				});
        			
        			
        		}else{
    				RequestSender.paymentGatewayResource.update({clientId : formData.clientId},formData,function(data){
    					  localStorageService.add("paymentgatewayresponse", {data:data,cardType:formData.cardType,cardNumber:formData.cardNumber});
  						var result = data.Result || "";
  						location.$$search = {};
  						if(screenName == 'payment'){
  							location.path('/paymentgatewayresponse/'+formData.clientId);
  						}else if(result == 'SUCCESS'){
  							location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
  						}else{	 
  							location.path('/paymentgatewayresponse/'+formData.clientId);

  						}
      				});
          		  }
        		
        	}else{
        		alert("calculate md5 String Value : "+ downloadmd5String+",downloadmd5 : "+ downloadmd5);
        		alert("Payment Failure md5 Strings are not comparing each other");
        	}
        	
        	        	
        };
        
selfcareApp.controller('KortaSuccessController', ['$rootScope',
                                                  'RequestSender', 
                                                  '$location', 
                                                  'localStorageService',
                                                  '$routeParams',
                                                  KortaSuccessController]);

