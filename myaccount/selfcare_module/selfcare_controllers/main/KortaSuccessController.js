(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
    	KortaSuccessController: function(scope, rootScope,RequestSender, location, http, dateFilter,webStorage,httpService) {
 
    		scope.formData = {};
    		scope.planFormData = {};
    		var kortaEncriptionKey = selfcare.models.kortaEncriptionKey;
        	var encryptedKey = decodeURIComponent(location.search().encryptedKey);	
        	var decrypted = CryptoJS.AES.decrypt(encryptedKey, kortaEncriptionKey).toString(CryptoJS.enc.Utf8);
        	var obj = JSON.parse(decrypted);
        	
        	var kortaAmountField = selfcare.models.kortaAmountField;
        	var kortaclientId = selfcare.models.kortaclientId;
        	
        	scope.formData.amount = obj[kortaAmountField];
        	scope.formData.clientId = obj[kortaclientId];
        
        	var downloadmd5 = location.search().downloadmd5;         
        	var reference = location.search().reference;        	
        	var checkvaluemd5 = location.search().checkvaluemd5; 
        	
        	var StringData = 2+checkvaluemd5+reference+selfcare.models.kortaSecretCode + selfcare.models.kortaTestServer;
        	
        	
        	 webStorage.remove('selfcare_sessionData');
        	 rootScope.isSignInProcess = false;
        	 if( webStorage.get("planFormData")){
        		 scope.planFormData = webStorage.get("planFormData");
        		 console.log(webStorage.get("planFormData"));
        	 }
   		 
   		 
        	var downloadmd5String = md5(StringData);
        	
        	if(downloadmd5String == downloadmd5){
        		if( webStorage.get("planFormData")){
        			scope.formData.emailId = scope.planFormData.emailId;
        		}
        		scope.formData.reference = reference;
        		httpService.post("/obsplatform/api/v1/authentication?username="+selfcare.models.obs_username+"&password="+selfcare.models.obs_password)
    	  		.success(function(data){
    	  			 httpService.setAuthorization(data.base64EncodedAuthenticationKey);
    	  			rootScope.currentSession= {user :'selfcare'};
    	  			RequestSender.kortaPaymentsResource.save({},scope.formData,function(data){
    	  				 location.path('/activeclientpreviewscreen');
    	  			});
    	  		})
    		    .error(function(errordata){
    		    	console.log('authentication failure');
    		    });
        		
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

