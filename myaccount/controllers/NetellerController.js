NetellerController = function(scope,RequestSender,routeParams,
			  							HttpService,location,dateFilter,localStorageService) {
		  
		scope.formData 			= {};
		scope.screenName 		= routeParams.screenName;
		scope.priceDataId 		= routeParams.priceDataId;
		scope.validation 		= {};
		
		var encrytionKey 		= selfcareModels.encriptionKey;
		
		var encryptedData     	= location.search().key;
    	var decryptedData     	= CryptoJS.AES.decrypt(encryptedData, encrytionKey).toString(CryptoJS.enc.Utf8);
    	var	kortaStorageData 	= JSON.parse(decodeURIComponent(decryptedData));
    	scope.planCode 			= kortaStorageData.planCode;
    	scope.amount 			= kortaStorageData.total_amount;
    	scope.clientId 			= kortaStorageData.clientId;
    	scope.formData 			= kortaStorageData;
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
    			if(!scope.validation.value && !scope.validation.verificationCode)
    			var authentication = {username:selfcareModels.obs_username,password:selfcareModels.obs_password};
    			RequestSender.netellerPaymentResource.save(authentication,this.formData, function(data){
    				localStorageService.add("paymentgatewayresponse",{data:data});
    				location.path('/paymentgatewayresponse/'+scope.clientId);
               });
			
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
