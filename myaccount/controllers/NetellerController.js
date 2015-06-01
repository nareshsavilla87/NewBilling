NetellerController = function(scope,RequestSender,routeParams,
			  							HttpService,location,dateFilter,localStorageService) {
		  
		scope.formData 			= {};
		var clientId 			= routeParams.clientId;
		scope.validation 		= {};
		
		var encrytionKey 		= selfcareModels.encriptionKey;
		
		var encryptedData     	= location.search().key;
    	var decryptedData     	= CryptoJS.AES.decrypt(encryptedData, encrytionKey).toString(CryptoJS.enc.Utf8);
    	var	kortaStorageData 	= JSON.parse(decodeURIComponent(decryptedData));
    	scope.planCode 			= kortaStorageData.planCode;
    	scope.amount 			= kortaStorageData.total_amount;
    	scope.formData 			= kortaStorageData;
    	var screenName 			= scope.formData.screenName;
    	scope.formData.locale	= "en";
    	scope.formData.source	= "neteller";
    	
    	 var tokenVal 			= "";
		  var randomFun = function() {
				var chars = "0123456789";
				var string_length = 6;
				var randomstring = dateFilter(new Date(),'yyMMddHHmmss');
				
				for (var i=0; i<string_length; i++) {
					var rnum = Math.floor(Math.random() * chars.length);
					randomstring += chars.substring(rnum,rnum+1);	
				}	
				tokenVal = randomstring;
				
			};randomFun();
    	scope.formData.transactionId = tokenVal;
    	
    	scope.validationForNeteller = function(code){
    		
    		if(code == null || code == '' || code == undefined || code.length < 6){
    			scope.validation.verificationCode = true;
    		}else{
    			scope.validation.verificationCode = false;
    		}
    		
    	};
    	
    	scope.validationValueForNeteller = function(value){
    		
    		if(value == null || value == '' || value == undefined){
    			scope.validation.value = true;
    		}else{
    			scope.validation.value = false;
    		}
    		
    	};
    	scope.submit = function() { 
    		if(rootScope.selfcare_sessionData){
    			scope.formData.clientId = clientId || rootScope.selfcare_sessionData.clientId;
    		  if(!scope.validation.value && !scope.validation.verificationCode){
    			  if(screenName == 'vod') scope.formData.screenName = "";
    			var authentication = {username:selfcareModels.obs_username,password:selfcareModels.obs_password};
    			RequestSender.netellerPaymentResource.save(authentication,scope.formData, function(data){
    				localStorageService.add("paymentgatewayresponse",{data:data});
    				if(screenName == 'vod'){
    					if(data.Result.toLowerCase() == "success"){
    						 location.path("/orderbookingscreen/"+screenName+"/"+clientId+"/0/0");
    					}else if(data.Result.toLowerCase() == "failure"){
    						location.path('/paymentgatewayresponse/'+clientId);
    					}
    				}else{
    					location.path('/paymentgatewayresponse/'+clientId);
    				}
               });
    	    }
			
    	};
       };
    	
		 
    };
    
selfcareApp.controller('NetellerController',['$scope',
                                                     'RequestSender',
                                                     '$routeParams',
                                                     'HttpService',
                                                     '$location',
                                                     'dateFilter',
                                                     'localStorageService',
                                                     NetellerController]);
