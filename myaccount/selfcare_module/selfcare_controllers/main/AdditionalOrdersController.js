(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  AdditionalOrdersController: function(scope,RequestSender,rootScope,routeParams,modal,
			  							webStorage,HttpService,authenticationService,localStorageService,sessionManager,location) {
		  
		  	scope.planselectionTab = true;
		  	scope.isOrderPage = true;
		  	scope.isPaymentPage = false;
		  	scope.isAmountZero = false;
		  	scope.isRedirectToDalpay = false;
		  	scope.termsData = "N";
		  	
			scope.clientData = {};
			var selfcareUserData = {};
		  	
		  //declaration of formData
			  scope.formData = {};
			  
		  scope.singlePlanPricingDatas = function(singlePlanData,isPlanActive){
			  var isActive = isPlanActive;
			  if(isActive == true){
				  scope.planId = singlePlanData.planId;
				  scope.selectedPlanId = singlePlanData.planId;
				  scope.pricingDatas = singlePlanData.pricingData || [];
			  }
			  else{
				  scope.pricingDatas = [];
				  scope.selectedPlanId = "";
			  }
			  
		  };
		  
		  var ordersRetriveFun = function(){
			  
			  if(scope.isOrderPage == true){
				 
			    var clientDatas = webStorage.get("clientTotalData");
			     if(clientDatas){
					  RequestSender.clientResource.get({clientId: clientDatas.clientId} , function(data) {
						  scope.formData = data;
						  selfcareUserData = data.selfcare;
						  scope.formData.clientId = data.id;
				  
					 if(routeParams.clientId == 0 && routeParams.orderId == 0){
						 scope.totalPlansData = [];
						  RequestSender.orderTemplateResource.query({region : scope.formData.state},function(data){
							  scope.totalPlansData = data;
							  
							  scope.plansData = [];
							  scope.clientOrdersData = [];
							  RequestSender.getOrderResource.get({clientId:scope.formData.clientId},function(data){
								  scope.clientOrdersData = data.clientOrders;
								  for(var i in scope.clientOrdersData ){
									  scope.totalPlansData = _.filter(scope.totalPlansData, function(item) {
					                      return item.planCode != scope.clientOrdersData[i].planCode;
					                  });
								  }
								  for(var j in scope.totalPlansData){
									  if(scope.totalPlansData[j].isPrepaid == 'Y'){
										  scope.plansData.push(scope.totalPlansData[j]); 
									  }
								  }
								  scope.paymentgatewayDatas = [];
								  RequestSender.paymentGatewayConfigResource.get(function(data) {
									  if(data.globalConfiguration){
										  for(var i in data.globalConfiguration){
											   if(data.globalConfiguration[i].enabled){
												   scope.paymentgatewayDatas.push(data.globalConfiguration[i]);
											   }
										  }
										  scope.paymentGatewayName = scope.paymentgatewayDatas.length>=1 ?
												  									scope.paymentgatewayDatas[0].name :
												  										"";
									  }
								 });
								  scope.singlePlanPricingDatas(scope.plansData[0],true);
							  });
						  });
					   }
				    });
				  }
			  }
		  };ordersRetriveFun();
		  
		  var hostName = selfcare.models.selfcareAppUrl;
		  
		   scope.paymentGatewayFun  = function(paymentGatewayName){
				  scope.paymentGWName = paymentGatewayName;
				  for (var i in scope.paymentgatewayDatas){
					  if(scope.paymentgatewayDatas[i].name==paymentGatewayName){
						  scope.value = scope.paymentgatewayDatas[i].value;
						  scope.formData.value =  JSON.parse(scope.value);
						  break;
					  }
					  
				  }
		     switch(paymentGatewayName){
		     
  				case 'dalpay' :
  						var url = scope.value.url+'?mer_id='+scope.value.merchantId+'&pageid='+scope.value.pageId+'&item1_qty=1&num_items=1';
  					scope.paymentURL =  url+"&cust_name="+scope.formData.lastname+"&cust_phone="+scope.formData.phone+"&cust_email="+scope.formData.email+"&cust_state="+scope.formData.state+""+				
					  	"&cust_address1="+scope.formData.addressNo+"&cust_zip="+scope.formData.zip+"&cust_city="+scope.formData.state+"&item1_desc="+scope.formData.planName+"&item1_price="+scope.formData.planAmount+"" + 	  				
					  	"&user1="+scope.formData.id+"&user2="+hostName+"&user3=additionalorderspreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId;
  						break;
  						
  				case 'korta' :
  					
  					var token = selfcareUserData.token;		    		
  					if(token != null && token != ""){		    		
  						scope.paymentURL = "#/kortatokenpayment/"+routeParams.orderId+"/"+routeParams.clientId;		    		 
  					}else{		    		
  						scope.paymentURL = "#/kortaIntegration/"+routeParams.orderId+"/"+routeParams.clientId;	    		
  					}
  					break;
  						
  				case 'paypal' :
  						
  					 scope.paymentURL = scope.formData.value.paypalUrl+'='+scope.formData.value.paypalEmailId+"&item_name="+scope.formData.planName+"&amount="+scope.formData.planAmount+"" +	  	  				
 					  	  "&custom="+scope.formData.clientId;
  						break;
  						
  				case 'globalpay' :
  					
  					scope.paymentURL = "#/globalpayIntegration/" + scope.formData.clientId+"/" + scope.formData.planAmount;
  					break;
							
				default :
							break;
				}
			    	  		 	
			  };
			
		  scope.selectedPLandAmt = function(contractId,chargeCode,price,planCode,duration){
		    	 
			  scope.isOrderPage = false;
			  $("#packageSelection").removeClass("selected");
			  $("#packageSelection").addClass("done");
			  $("#paymentSelection").addClass("selected");
			 // scope.isPaymentPage = true;
			  scope.formData.planAmount = price;
			  scope.duration = duration;
	    	  scope.formData.contractperiod = contractId;
	    	  scope.formData.planCode = scope.planId;
	    	  scope.formData.paytermCode = chargeCode;
	    	  scope.formData.planName = planCode;
	    	  if(price==0){
	    		  scope.isAmountZero = true;
	    		  scope.isPaymentPage = false;
	    	  }else{
	    		  scope.isAmountZero = false;
	    		  scope.isPaymentPage = true;
	    		  scope.termsData = "N";
	    	  }
	    	  scope.paymentGatewayFun(scope.paymentGatewayName);
		  };
		  
		  scope.termsAndCondition = function(value) {
				scope.termsData = value;
		  };
	      
	      scope.makePaymentFun =function(){
	    	  webStorage.add('form','orderbook');
	    	  webStorage.add("additionalPlanFormData",scope.formData);
	    	  scope.isRedirectToDalpay = true;
	    	  if(scope.paymentGWName == 'korta'&&(selfcareUserData.token==""||selfcareUserData.token ==null)){
		    	  modal.open({
						 templateUrl: 'termsandconditionskorta.html',
						 controller: TermsandConditionsKortaController,
						 resolve:{}
			 	 });
	    	  }else if(scope.paymentGWName == 'globalpay'){
	    		  modal.open({
						 templateUrl: 'termsandconditionsglobalpay.html',
						 controller: TermsandConditionsGlobalpayController,
						 resolve:{}
			 	 });
	    	  }else if(scope.paymentGWName == 'korta'&& selfcareUserData.token){
	    		  modal.open({
						 templateUrl: 'termsandconditionskortatoken.html',
						 controller: TermsandConditionsKortaTokenController,
						 resolve:{}
			 	 });
	    	  }else if((scope.paymentGWName == 'paypal') || (scope.paymentGWName == 'dalpay') ){
		    	  modal.open({
		    		  templateUrl: 'termsandconditionspaypal.html',
		    		  controller: TermsandConditionsPapaylController,
		    		  resolve:{}
		    	  });
		      }
	      };
	      
	      //starting korta controller
	      var TermsandConditionsKortaController = function($scope,$modalInstance){
	    	  
	    	  $scope.formData = {}; 
			  var clientData = {};
			  var additionalFormData = {};
			  var eventData = [];
			  
			//values getting form constants.js file
			  $scope.kortaEncriptionKey = selfcare.models.kortaEncriptionKey;
			  $scope.kortaTestServer = selfcare.models.kortaTestServer;
			  $scope.kortaAmountField = selfcare.models.kortaAmountField;
			  $scope.kortaclientId = selfcare.models.kortaclientId;
			  $scope.kortaPaymentMethod = selfcare.models.kortaPaymentMethod;
			  $scope.kortaTokenValue = selfcare.models.kortaTokenValue;
			  
			  clientData = webStorage.get('selfcareUserData') || "";
			  
			  $scope.clientId = clientData.id;
			  $scope.formData.fullName = clientData.lastname;
			  $scope.formData.address = clientData.addressNo;
			  $scope.formData.emailId = clientData.email;
			  $scope.formData.zipcode = clientData.zip;
			  $scope.formData.city = clientData.city;
			  $scope.formData.country = clientData.country;
			  $scope.formData.mobileNo = clientData.phone;
			  
			  additionalFormData = webStorage.get('additionalPlanFormData') || webStorage.get("renewalOrderFormData") || webStorage.get("eventData") || "";
			  $scope.formData.amount = additionalFormData.planAmount;
			  $scope.formData.description = additionalFormData.planName;
			  $scope.kortaMerchantId = additionalFormData.value.merchantId;
			  $scope.kortaTerminalId = additionalFormData.value.terminalId;
			  $scope.formData.terms = 'Y';
			  
			  var randomFun = function() {
					var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
					var string_length = 13;
					var randomstring = 'TT';
					
					for (var i=0; i<string_length; i++) {
						var rnum = Math.floor(Math.random() * chars.length);
						randomstring += chars.substring(rnum,rnum+1);	
					}	
					$scope.formData.token = randomstring;
					$scope.token = CryptoJS.AES.encrypt($scope.formData.token, $scope.kortaEncriptionKey).toString();
					
				};randomFun();
			  
				$scope.termsAndCondition = function(value) {
					$scope.terms = value;
			 };
			 
			 $scope.formData.doAction = "STORAGE";
			  
			  var temp = localStorageService.get('Language')||"";
			   
			  $scope.formData.optlang = temp.code || selfcare.models.locale;
			  
			  $scope.formData.currency = selfcare.models.kortaCurrencyType;
			  
			  $scope.submitFun = function(){
				  if(webStorage.get('additionalPlanFormData')){
					  additionalFormData.kortaToken = $scope.token;
					  webStorage.add('additionalPlanFormData',additionalFormData);
					  
				  }else if(webStorage.get('renewalOrderFormData')){
					  additionalFormData.kortaToken = $scope.token;
					  webStorage.add('renewalOrderFormData',additionalFormData);
					  
				  }else if(webStorage.get('eventData')){
					  eventData.push({'kortaToken': scope.token});
					  webStorage.add('eventData',eventData);
				  }
				  
				  var encryptData = '{"'+$scope.kortaAmountField+'":'+$scope.formData.amount+
				  						',"'+$scope.kortaPaymentMethod+'":"'+$scope.formData.doAction+'","'+$scope.kortaTokenValue+'":"'+$scope.formData.token+
				  								'","'+$scope.kortaclientId+'":'+$scope.clientId+'}';
				  
				  var encryptString = encodeURIComponent(encryptData);
				  
				  $scope.encryptedString = CryptoJS.AES.encrypt(encryptString, $scope.kortaEncriptionKey).toString();
				  
				  $scope.downloadurl = selfcare.models.additionalKortaUrl+"/"+routeParams.orderId+"/"+routeParams.clientId+"?encryptedKey="+$scope.encryptedString+"&";
				  
				  if($scope.kortaTestServer == 'TEST'){
					  $scope.md5data = $scope.formData.amount + $scope.formData.currency + $scope.kortaMerchantId
					  + $scope.kortaTerminalId + $scope.formData.description + "/" + $scope.formData.doAction + "//" 
					  +$scope.formData.token + additionalFormData.value.secretCode +$scope.kortaTestServer;
				  }else if($scope.kortaTestServer == 'LIVE'){
					  $scope.md5data = $scope.formData.amount + $scope.formData.currency + $scope.kortaMerchantId
					  + $scope.kortaTerminalId + $scope.formData.description + "/" + $scope.formData.doAction + "//" 
					  +$scope.formData.token + additionalFormData.value.secretCode;
				  }else{
					  alert("Please Configure the Server Type Properly. Either 'TEST' or 'LIVE'");
					  location.path('/profile');
				  }
				  $scope.formData.md5value=md5($scope.md5data);
			  };
				
	    	  $scope.paymentURL = scope.paymentURL;
				$scope.agree = function(){
					$modalInstance.close('delete');
				};
				$scope.disAgree = function(){
					$modalInstance.dismiss('cancel');
			 };
			};//ending korta controller
			
			//starting kortatoken controller
			var TermsandConditionsKortaTokenController = function($scope,$modalInstance){
		    	  
				$scope.formData = {}; 
				  var additionalFormData = {};
				  var clientData = {};

				  //values getting form constants.js file
				  $scope.kortaEncriptionKey = selfcare.models.kortaEncriptionKey;
				  $scope.kortaTestServer = selfcare.models.kortaTestServer;
				  $scope.kortaAmountField = selfcare.models.kortaAmountField;
				  $scope.kortaclientId = selfcare.models.kortaclientId;
				  $scope.kortaPaymentMethod = selfcare.models.kortaPaymentMethod;
				  $scope.kortaTokenValue = selfcare.models.kortaTokenValue;
				  
				  additionalFormData = webStorage.get('additionalPlanFormData') || webStorage.get("renewalOrderFormData") || "";
				  $scope.formData.amount = additionalFormData.planAmount;
				  $scope.formData.description = additionalFormData.planName;
				  $scope.kortaMerchantId = additionalFormData.value.merchantId;
				  $scope.kortaTerminalId = additionalFormData.value.terminalId;
				 
				  if(webStorage.get("eventData")){
					 var  VODTotalAmount = webStorage.get('VODTotalAmount');
					  $scope.formData.amount = VODTotalAmount;
				  }
				  clientData = webStorage.get('selfcareUserData') || "";
				   $scope.clientId = clientData.id;
				  
				  RequestSender.clientResource.get({clientId: $scope.clientId} , function(data) {
					  clientData = data;
					  var token = clientData.selfcare.token;
					  
					  var name = clientData.lastname;
					  name = name.replace(" ","");	
					  
					  $scope.formData.fullName = name;
					  $scope.formData.address = clientData.addressNo;
					  $scope.formData.emailId = clientData.email;
					  $scope.formData.zipcode = clientData.zip;
					  $scope.formData.city = clientData.city;
					  $scope.formData.country = clientData.country;
					  $scope.formData.mobileNo = clientData.phone;
					  $scope.formData.token = CryptoJS.AES.decrypt(token, $scope.kortaEncriptionKey).toString(CryptoJS.enc.Utf8);
				  });
				  
				  $scope.formData.terms = 'N'; 
				  $scope.doAction = 'RECCURING'; 
				  
				  $scope.TermsAndCondition = function(data) {
						$scope.formData.terms = data;
				   };
				  
				    var temp = localStorageService.get('Language')||"";
					   
					$scope.formData.optlang = temp.code || selfcare.models.locale;
				  
					$scope.formData.currency = selfcare.models.kortaCurrencyType;
				  
				  $scope.submitFun = function(){
					  
					  
					  var encryptData = '{"'+$scope.kortaAmountField+'":'+$scope.formData.amount+
						',"'+$scope.kortaPaymentMethod+'":"'+$scope.doAction+'","'+$scope.kortaTokenValue+'":"'+$scope.formData.token+
								'","'+$scope.kortaclientId+'":'+$scope.clientId+'}';
					  var encryptString = encodeURIComponent(encryptData);
					  
					  $scope.encryptedString = CryptoJS.AES.encrypt(encryptString, $scope.kortaEncriptionKey).toString();
					  
					  $scope.downloadurl = selfcare.models.additionalKortaUrl+"/"+routeParams.orderId+"/"+routeParams.clientId+"?encryptedKey="+$scope.encryptedString+"&";
					  
					  if($scope.kortaTestServer == 'TEST'){
						  $scope.md5data = $scope.formData.amount + $scope.formData.currency + $scope.kortaMerchantId
						  + $scope.kortaTerminalId + $scope.formData.description + "//1/" 
						  +$scope.formData.token + additionalFormData.value.secretCode +$scope.kortaTestServer;
					  }else if($scope.kortaTestServer == 'LIVE'){
						  $scope.md5data = $scope.formData.amount + $scope.formData.currency + $scope.kortaMerchantId
						  + $scope.kortaTerminalId + $scope.formData.description + "//1/" 
						  +$scope.formData.token + additionalFormData.value.secretCode;
					  }else{
						  alert("Please Configure the Server Type Properly. Either 'TEST' or 'LIVE'");
						  location.path('/profile');
					  }
					  $scope.formData.md5value=md5($scope.md5data);
					  
				  };
					
		    	  $scope.paymentURL = scope.paymentURL;
					$scope.agree = function(){
						$modalInstance.close('delete');
					};
					$scope.disAgree = function(){
						$modalInstance.dismiss('cancel');
				 };
				};//ending kortatoken controller
			
				//starting globalpay controller
			var TermsandConditionsGlobalpayController = function($scope,$modalInstance){
		    	  
		    	  $scope.formData = {}; 
				  var clientData = {};
				  var additionalFormData = {};
				  var eventData = [];
				  
				//values getting form constants.js file
				  $scope.currency = "NGN";
				  
				  clientData = webStorage.get('selfcareUserData') || "";
				  
				  $scope.clientId = clientData.id;
				  $scope.formData.names = clientData.firstname+" "+clientData.lastname;
				  $scope.formData.email = clientData.email;
				  $scope.formData.phoneno = clientData.phone;
				  
				  additionalFormData = webStorage.get('additionalPlanFormData') || webStorage.get("renewalOrderFormData") || webStorage.get("eventData") || "";
				  $scope.formData.amount = additionalFormData.planAmount;
				  $scope.merchantid = additionalFormData.value.merchantId;
				  
				  var randomFun = function() {
						var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
						var string_length = 10;
						
						var randomstring = $scope.clientId + '-';
						
						for (var i=0; i<string_length; i++) {
							var rnum = Math.floor(Math.random() * chars.length);
							randomstring += chars.substring(rnum,rnum+1);	
						}	
						$scope.formData.txnref = randomstring;		
					};randomFun();
				  
				  
				  $scope.submitFun = function(){
					  if(webStorage.get('additionalPlanFormData')){
						  webStorage.add('additionalPlanFormData',additionalFormData);
						  
					  }else if(webStorage.get('renewalOrderFormData')){
						  webStorage.add('renewalOrderFormData',additionalFormData);
						  
					  }else if(webStorage.get('eventData')){
						  webStorage.add('eventData',eventData);
					  }
				  };
					
		    	  $scope.paymentURL = scope.paymentURL;
					$scope.agree = function(){
						$modalInstance.close('delete');
					};
					$scope.disAgree = function(){
						$modalInstance.dismiss('cancel');
				 };
				};//ending globalpay controller
				
				//starting paypal controller
				var TermsandConditionsPapaylController = function($scope,$modalInstance){
					
			    	  $scope.paymentURL = scope.paymentURL;
						$scope.agree = function(){
							$modalInstance.close('delete');
						};
						$scope.disAgree = function(){
							$modalInstance.dismiss('cancel');
					 };
				};//ending globalpay controller
	      
	      scope.cancelPaymentFun = function(){
	    	    scope.isOrderPage = true;
			  	scope.isPaymentPage = false;
			  	scope.isRedirectToDalpay = false;
			  	scope.isAmountZero = false;
			  	scope.termsData = "N";
			  	$("#paymentSelection").removeClass("selected");
			  	$("#packageSelection").removeClass("done");
			  	$("#packageSelection").addClass("selected");
                scope.plansData = [];
                scope.pricingDatas = [];
                ordersRetriveFun();
	      };
	      
	      scope.finishBtnFun =function(){
	    	  
	    	  webStorage.add("additionalPlanFormData",scope.formData);
    		  location.path("/additionalorderspreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId);
	      };
  		
    }
  });
  selfcare.ng.application.controller('AdditionalOrdersController', 
 ['$scope','RequestSender','$rootScope','$routeParams','$modal','webStorage','HttpService','AuthenticationService','localStorageService',
  'SessionManager','$location',selfcare.controllers.AdditionalOrdersController]).run(function($log) {
      $log.info("AdditionalOrdersController initialized");
  });
}(selfcare.controllers || {}));
