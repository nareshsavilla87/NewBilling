(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
    	KortaSuccessController: function(scope, rootScope,RequestSender, location, http, dateFilter,webStorage,httpService) {
 
    		scope.formData = {};
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
       
        	scope.formData.amount = obj[kortaAmountField];
        	scope.formData.clientId = obj[kortaclientId];
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
        		
        		scope.formData.reference = reference;
        		
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
	        	  			 RequestSender.updateKortaToken.update({clientId : scope.formData.clientId},{'kortaToken': scope.kortaToken},function(data){
	 	           				rootScope.isActiveScreenPage= false;
	 	   					 });	
	        	  			 
	        	  			 RequestSender.kortaPaymentsResource.save({},scope.formData,function(data){	        	  				
	        	  				 location.path('/profile');	        	  			
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
	selfcare.ng.application.controller('KortaSuccessController', ['$scope', '$rootScope','RequestSender', '$location', '$http', 'dateFilter','webStorage','HttpService', selfcare.controllers.KortaSuccessController]).run(function($log) {
		$log.info("KortaSuccessController initialized");
    });
}(selfcare.controllers || {}));

