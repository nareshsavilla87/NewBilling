(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
		KortaTokenPaymentSuccessController: function(scope, rootScope,RequestSender, routeParams,location, http, dateFilter,webStorage,httpService) {
 
    		scope.formData = {};
    		scope.planFormData = {};
    		scope.additionalPlanFormData = {};
    		scope.renewalOrderFormData = {};
    		scope.eventData = {};
    		var kortaEncriptionKey = selfcare.models.kortaEncriptionKey;
    		
/*        	var encryptedKey = decodeURIComponent(location.search().encryptedKey);	
        	var decrypted = CryptoJS.AES.decrypt(encryptedKey, kortaEncriptionKey).toString(CryptoJS.enc.Utf8);
        	var obj = JSON.parse(decrypted);*/
    		
    		var encryptedKey = location.search().encryptedKey;	
        	var decrypted = CryptoJS.AES.decrypt(encryptedKey, kortaEncriptionKey).toString(CryptoJS.enc.Utf8);
        	var decryptedKey = decodeURIComponent(decrypted);	
        	var obj = JSON.parse(decryptedKey);
        	
        	var kortaAmountField = selfcare.models.kortaAmountField;
        	var kortaclientId = selfcare.models.kortaclientId;
        	
        	scope.formData.amount = obj[kortaAmountField];
        	scope.formData.clientId = obj[kortaclientId];
        
        	var downloadmd5 = location.search().downloadmd5;         
        	var reference = location.search().reference;        	
        	var checkvaluemd5 = location.search().checkvaluemd5; 
        	
        	var StringData = 2+checkvaluemd5+reference+selfcare.models.kortaSecretCode + selfcare.models.kortaTestServer;
        	
        	var downloadmd5String = md5(StringData);
        	
        	if(webStorage.get("additionalPlanFormData")){
        		scope.additionalPlanFormData = webStorage.get("additionalPlanFormData");
        	 	console.log(webStorage.get("additionalPlanFormData"));
        	 	scope.pathUrl = "/additionalorderspreviewscreen/"+routeParams.planId+"/"+routeParams.clientId;
    		}else if(webStorage.get("renewalOrderFormData")){
        		scope.renewalOrderFormData = webStorage.get("renewalOrderFormData");
        	 	console.log(webStorage.get("renewalOrderFormData"));
        	 	scope.pathUrl = "/renewalorderpreviewscreen/"+routeParams.planId+"/"+routeParams.clientId;
    		}else if(webStorage.get("eventData")){
        		scope.eventData = webStorage.get("eventData");
        	 	console.log(webStorage.get("eventData"));
        	 	scope.pathUrl = "/eventdetailspreviewscreen";
    		}
        	
        	if(downloadmd5String == downloadmd5){
        		if(webStorage.get("selfcareUserData")){
        			var selfcareUserData = webStorage.get("selfcareUserData")
        			scope.formData.emailId = selfcareUserData.email;
        		}
        		scope.formData.reference = reference;
        		httpService.post("/obsplatform/api/v1/authentication?username="+selfcare.models.obs_username+"&password="+selfcare.models.obs_password)
    	  		.success(function(data){
    	  			 httpService.setAuthorization(data.base64EncodedAuthenticationKey);
    	  			rootScope.currentSession= {user :'selfcare'};
    	  			RequestSender.kortaPaymentsResource.save({},scope.formData,function(data){
    	  				 location.path(scope.pathUrl);
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
	selfcare.ng.application.controller('KortaTokenPaymentSuccessController', ['$scope', '$rootScope','RequestSender', '$routeParams','$location', '$http', 'dateFilter','webStorage','HttpService', selfcare.controllers.KortaTokenPaymentSuccessController]).run(function($log) {
		$log.info("KortaTokenPaymentSuccessController initialized");
    });
}(selfcare.controllers || {}));

