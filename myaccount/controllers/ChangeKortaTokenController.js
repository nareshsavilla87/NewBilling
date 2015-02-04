ChangeKortaTokenController = function(scope, RequestSender, location,localStorageService,modal) {
		  
		 var clientData 	= localStorageService.get('clientTotalData') || {};
		   var clientId 	= clientData.id;
		  
		   //values getting form constants.js file
		   var kortaServer 			= selfcareModels.kortaServer;
		   var kortaAmountField 	= selfcareModels.kortaAmountField;
		   var kortaclientId		= selfcareModels.kortaclientId;
		   var kortaPaymentMethod 	= selfcareModels.kortaPaymentMethod;
		   var kortaTokenValue 		= selfcareModels.kortaTokenValue;
		   var encrytionKey 		= selfcareModels.encriptionKey;
		   scope.currency 			= selfcareModels.kortaCurrencyType;
		   var langs 				= Langs;
		   var temp 				= localStorageService.get('localeLang')||"";
		   scope.optlang 			= temp || selfcareModels.locale;
		   
		  RequestSender.clientResource.get({clientId: clientId} , function(data) {
			  clientData 		= data || {};
			  scope.fullName 	= clientData.displayName;;
			  scope.address 	= clientData.addressNo;
			  scope.emailId 	= clientData.email;
			  clientData.zip 	== "" ? scope.zipcode = clientData.city : scope.zipcode = clientData.zip;
			  scope.city 		= clientData.city;
			  scope.country 	= clientData.country;
			  scope.mobileNo 	= clientData.phone;
			  scope.description = "Token Updation";
			  scope.doAction 	= "STNOCAP";
			  scope.amount 		= 1;
			  scope.terms 		= 'N';
			  
			  var token = "";
			  var randomFun = function() {
				  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
				  var string_length = 13;
				  
				  var randomstring = 'TT';
				  
				  for (var i=0; i<string_length; i++) {
					  var rnum = Math.floor(Math.random() * chars.length);
					  randomstring += chars.substring(rnum,rnum+1);	
				  }	
				  scope.tokenVal = randomstring;
				  token = CryptoJS.AES.encrypt(scope.tokenVal, encrytionKey).toString();
				  
			  };randomFun();  
			  
			  var encryptData = {};
			  encryptData[kortaAmountField] = scope.amount;   		encryptData[kortaPaymentMethod]	= scope.doAction;
			  encryptData[kortaTokenValue] 	= token;		  		encryptData[kortaclientId] 		= clientId;
			  encryptData.locale 			= scope.optlang;  		encryptData.email 				= scope.emailId;
			  
			  var encodeURIComponentData  = encodeURIComponent(JSON.stringify(encryptData));
			  var encrytedSearchStr 	  = CryptoJS.AES.encrypt(encodeURIComponentData, encrytionKey).toString();
			  scope.downloadurl 		  = selfcareModels.additionalKortaUrl+"/changekortatoken/0/0?key="+encrytedSearchStr+"&";
			  
			  var secretCode = "";
			  RequestSender.paymentGatewayConfigResource.get(function(data) {
				  if(data.globalConfiguration){
					  for(var i in data.globalConfiguration){
						   if(data.globalConfiguration[i].name == 'korta'){
							   var jsonObj = JSON.parse(data.globalConfiguration[i].value);
							   scope.kortaMerchantId = jsonObj.merchantId;
							   scope.kortaTerminalId = jsonObj.terminalId;
							   secretCode 			 = jsonObj.secretCode;
							   break;
						   }
					  }
					  if(kortaServer == 'TEST'){
						  scope.md5data = scope.amount + scope.currency + scope.kortaMerchantId
						  + scope.kortaTerminalId + scope.description + "/" + scope.doAction + "//" 
						  +scope.tokenVal + secretCode +kortaServer;
					  }else if(kortaServer == 'LIVE'){
						  scope.md5data = scope.amount + scope.currency + scope.kortaMerchantId
						  + scope.kortaTerminalId + scope.description + "/" + scope.doAction + "//" 
						  +scope.tokenVal + secretCode;
					  }else{
						  alert("Please Configure the Server Type Properly. Either 'TEST' or 'LIVE'");
						  location.path('/profile');
					  }
					  
					  scope.md5value=md5(scope.md5data);
				  }
			  });
		  });

         scope.termsAndConditionCheck = function(data) {
			scope.terms = data;
		 };
	    	  
		  
		  var TermsandConditionsController = function($scope,$modalInstance){
		    	$scope.done = function(){
		    		$modalInstance.dismiss('cancel');
		    	};
		    };
		   
		    scope.termsAndConditionsFun = function(){
				    modal.open({
						 templateUrl: 'termsandconditions.html',
						 controller: TermsandConditionsController,
						 resolve:{}
				    });
		    };
		  
	  };

selfcareApp.controller('ChangeKortaTokenController', ['$scope', 
                                                      'RequestSender',
                                                      '$location',
                                                      'localStorageService',
                                                      '$modal',
                                                      ChangeKortaTokenController]);
