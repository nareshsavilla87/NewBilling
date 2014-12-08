(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
		KortaTokenPaymentSuccessController: function(scope, rootScope,RequestSender, routeParams,location, http, dateFilter,webStorage,httpService) {
 
    		scope.formData = {};
    		var additionalFormData = {};
    		scope.additionalPlanFormData = {};
    		scope.renewalOrderFormData = {};
    		scope.eventData = {};
    		var kortaEncriptionKey = selfcare.models.kortaEncriptionKey;
    		
    		var encryptedKey = location.search().encryptedKey;	
        	var decrypted = CryptoJS.AES.decrypt(encryptedKey, kortaEncriptionKey).toString(CryptoJS.enc.Utf8);
        	var decryptedKey = decodeURIComponent(decrypted);
        	var obj = JSON.parse(decryptedKey);
        	
        	var kortaAmountField = selfcare.models.kortaAmountField;
        	var kortaclientId = selfcare.models.kortaclientId;
        	var kortaPaymentMethod = selfcare.models.kortaPaymentMethod;
        	var kortaTokenValue = selfcare.models.kortaTokenValue;
        	scope.kortaTestServer = selfcare.models.kortaTestServer;
        	
        	scope.formData.total_amount = obj[kortaAmountField];
        	scope.formData.clientId = obj[kortaclientId];
        	scope.PaymentMethod = obj[kortaPaymentMethod];
        	scope.kortaTokenValue = obj[kortaTokenValue];
        	
        	scope.kortaToken = CryptoJS.AES.encrypt(scope.kortaTokenValue, kortaEncriptionKey).toString();
        
        	var downloadmd5 = location.search().downloadmd5;         
        	var reference = location.search().reference;        	
        	var checkvaluemd5 = location.search().checkvaluemd5;
        	
        	additionalFormData = webStorage.get('additionalPlanFormData') || webStorage.get("renewalOrderFormData") || webStorage.get("eventData") || "";
        	
        	if(scope.kortaTestServer == 'TEST'){
				  scope.StringData = 2 + checkvaluemd5+reference + additionalFormData.value.secretCode + selfcare.models.kortaTestServer;
			  
	      	}else if(scope.kortaTestServer == 'LIVE'){
					  scope.StringData = 2+checkvaluemd5+reference+additionalFormData.value.secretCode;
					  
	      	}else{
	      		alert("Please Configure the Server Type Properly. Either 'TEST' or 'LIVE'");
	      		scope.StringData = '';
	      	}
        	
        	var downloadmd5String = md5(scope.StringData);
        	
        	if(webStorage.get("additionalPlanFormData")){
        		scope.additionalPlanFormData = webStorage.get("additionalPlanFormData");
        	 	scope.pathUrl = "/additionalorderspreviewscreen/"+routeParams.planId+"/"+routeParams.clientId;
    		}else if(webStorage.get("renewalOrderFormData")){
        		scope.renewalOrderFormData = webStorage.get("renewalOrderFormData");
        	 	scope.pathUrl = "/renewalorderpreviewscreen/"+routeParams.planId+"/"+routeParams.clientId;
    		}else if(webStorage.get("eventData")){
        		scope.eventData = webStorage.get("eventData");
        	 	scope.pathUrl = "/eventdetailspreviewscreen";
    		}
        	
        	if(downloadmd5String == downloadmd5){
        		if(webStorage.get("selfcareUserData")){
        			var selfcareUserData = webStorage.get("selfcareUserData")
        			scope.formData.emailId = selfcareUserData.email;
        		}
        		
        		scope.formData.transactionId = reference;
	        	scope.formData.source = 'korta';	
	        	scope.formData.otherData = '{"paymentId":'+reference+'}';
	        	scope.formData.device = '';
	        	scope.formData.currency = 'ISN';
	        	rootScope.optlang ? scope.langCode = rootScope.optlang.code : scope.langCode = selfcare.models.Langs[0].code;
	        	scope.formData.locale = scope.langCode;
        		
        		if(scope.PaymentMethod == "STNOCAP"){
        			
          			 RequestSender.updateKortaToken.update({clientId : scope.formData.clientId},{'kortaToken': scope.kortaToken},function(data){
          				rootScope.isActiveScreenPage= false;
  						 location.path('/profile');
  					 });
	  	        }else if(scope.PaymentMethod == "STORAGE"){

	  	        	httpService.post("/obsplatform/api/v1/authentication?username="+selfcare.models.obs_username+"&password="+selfcare.models.obs_password)      			
          			 .success(function(data){      	  			
          				 httpService.setAuthorization(data.base64EncodedAuthenticationKey);      	  			
          				 rootScope.currentSession= {user :'selfcare'};     	  			
          				 
          				 RequestSender.updateKortaToken.update({clientId : scope.formData.clientId},{'kortaToken': scope.kortaToken},function(data){
          					 RequestSender.paymentGatewayResource.update({},scope.formData,function(data){
          						 
          						 webStorage.add("paymentgatewayresponse",data);
          						 
          						 if(data.Result == 'SUCCESS'){
          							 location.path(scope.pathUrl); 
          						 }else{	 
          							 location.path('/paymentgatewayresponse');
          						 }
          					 });     	  		
          				 });
          				 
          			 })      		 
          			 .error(function(errordata){      		    	
          			 });
	  			}else{
	  				httpService.post("/obsplatform/api/v1/authentication?username="+selfcare.models.obs_username+"&password="+selfcare.models.obs_password)
	    	  		.success(function(data){
	    	  			 httpService.setAuthorization(data.base64EncodedAuthenticationKey);
	    	  			rootScope.currentSession= {user :'selfcare'};
	    	  			RequestSender.paymentGatewayResource.update({},scope.formData,function(data){
	    	  				webStorage.add("paymentgatewayresponse",data);
     						 
     						 if(data.Result == 'SUCCESS'){
     							 location.path(scope.pathUrl); 
     						 }else{	 
     							 location.path('/paymentgatewayresponse');
     						 }
	    	  			});
	    	  		})
	    		    .error(function(errordata){
	    		    });
	  			}
        		
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

