(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
		PaymentGatewayResponseController: function(scope, rootScope,RequestSender, location, http, dateFilter,webStorage,httpService) {
 
    		scope.formData = {};
    		scope.paymentFormData = {};
    		scope.planFormData = {};
    		scope.PaymentMethod = {};
    		scope.additionalPlanFormData = {};
    		scope.renewalOrderFormData = {};
    		scope.eventData = {};
    		var kortaEncriptionKey = selfcare.models.kortaEncriptionKey;
        	
    		var encryptedKey =location.search().encryptedKey;	
        	var decrypted = CryptoJS.AES.decrypt(encryptedKey, kortaEncriptionKey).toString(CryptoJS.enc.Utf8);	        		
        	var decryptedKey = decodeURIComponent(decrypted);	
        	var obj = JSON.parse(decryptedKey);
        	
        	var kortaAmountField = selfcare.models.kortaAmountField;
        	var kortaclientId = selfcare.models.kortaclientId;
        	var kortaPaymentMethod = selfcare.models.kortaPaymentMethod;
        	var kortaTokenValue = selfcare.models.kortaTokenValue;
       
        	scope.paymentFormData.total_amount = obj[kortaAmountField];
        	scope.paymentFormData.clientId = obj[kortaclientId];
        	scope.PaymentMethod = obj[kortaPaymentMethod];
        	scope.kortaTokenValue = obj[kortaTokenValue];
        	
        	scope.kortaToken = CryptoJS.AES.encrypt(scope.kortaTokenValue, kortaEncriptionKey).toString();
        
        	var downloadmd5 = location.search().downloadmd5;         
        	var reference = location.search().reference;        	
        	var checkvaluemd5 = location.search().checkvaluemd5; 
        	
        	var StringData = 2+checkvaluemd5+reference+selfcare.models.kortaSecretCode + selfcare.models.kortaTestServer;
        	
        	var downloadmd5String = md5(StringData);
        	
        	/*if(webStorage.get("planFormData")){
        		scope.planFormData = webStorage.get("planFormData");
        	 	console.log(webStorage.get("planFormData"));
        	 	scope.pathUrl = "/additionalorderspreviewscreen/"++"/"+scope.formData.clientId;
    		}*/
        	
        	if(downloadmd5String == downloadmd5){
        		
        		//scope.formData.reference = reference;
        		scope.paymentFormData.transactionId = reference;
        		scope.paymentFormData.source = 'korta';
        		scope.paymentFormData.otherData = '{korta payment}';
        		scope.paymentFormData.device = '';
        		
    	  			if(scope.PaymentMethod == "STNOCAP"){	
    	  				httpService.post("/obsplatform/api/v1/authentication?username="+selfcare.models.obs_username+"&password="+selfcare.models.obs_password)	        	  		
	           			.success(function(data){
	        	  			 httpService.setAuthorization(data.base64EncodedAuthenticationKey);	        	  			
	        	  			 rootScope.currentSession= {user :'selfcare'};
	        	  			 RequestSender.updateKortaToken.update({clientId : scope.formData.clientId},{'kortaToken': scope.kortaToken},function(data){
	 	           				rootScope.isActiveScreenPage= false;
	 	           				location.path('/profile');	   
	 	   					 });	
	           			})
	        		    .error(function(errordata){
	        		    	console.log('authentication failure');
	        		    });
    	  	        }
    	  			if(scope.PaymentMethod == "STORAGE"){
	           			           			 
	           			httpService.post("/obsplatform/api/v1/authentication?username="+selfcare.models.obs_username+"&password="+selfcare.models.obs_password)	        	  		
	           			.success(function(data){
	        	  			 httpService.setAuthorization(data.base64EncodedAuthenticationKey);	        	  			
	        	  			 rootScope.currentSession= {user :'selfcare'};
	        	  			 RequestSender.updateKortaToken.update({clientId : scope.paymentFormData.clientId},{'kortaToken': scope.kortaToken},function(data){
	 	           				rootScope.isActiveScreenPage= false;
	 	   					 });	
	        	  			 
	        	  			 RequestSender.kortaPaymentsResource.save({},scope.paymentFormData,function(data){	
	        	  				 webStorage.add("paymentgatewayresponse",data);
	        	  				 alert(data);
	 	           				 location.path('/paymentgatewayresponse');
	        	  				      	  			
	        	  			 });
	           			})
	        		    .error(function(errordata){
	        		    	console.log('authentication failure');
	        		    });
    	  			}
    	  			
           			
        	}else{
        		alert("calculate md5 String Value : "+ downloadmd5String+",downloadmd5 : "+ downloadmd5);
        		alert("Payment Failure md5 Strings are not comparing each other");
        	}
        	
        }
    });
	selfcare.ng.application.controller('PaymentGatewayResponseController', ['$scope', '$rootScope','RequestSender', '$location', '$http', 'dateFilter','webStorage','HttpService', selfcare.controllers.PaymentGatewayResponseController]).run(function($log) {
		$log.info("PaymentGatewayResponseController initialized");
    });
}(selfcare.controllers || {}));

