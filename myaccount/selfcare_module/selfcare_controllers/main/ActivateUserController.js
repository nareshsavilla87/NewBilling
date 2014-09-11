(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ActivateUserController: function(scope,RequestSender,rootScope,routeParams,modal,
			  							webStorage,httpService,authenticationService,sessionManager,location) {
		  
		  	scope.isActive=false;
		  	scope.isAlreadyActive=false;
		  	scope.isRegPage = false;
		  	scope.isOrderPage = false;
		  	scope.isAmountZero = false;
		  	scope.isPaymentPage = false;
		  	scope.isRedirectToDalpay = false;
		  	scope.cities = [];
		  	scope.plansData = [];
			scope.clientData = {};
			scope.contractDetails = [];
			webStorage.remove('selfcare_sessionData');
			rootScope.isSignInProcess = false;
			scope.existedEmail = routeParams.mailId;
		  	
		  //declaration of formData
			  scope.formData = {};
			  
		  //getting dalpay Url
		  scope.dalpayURL = selfcare.models.dalpayURL;
		  	
		  //getting the key value form routeParams
		  var email = routeParams.mailId;
		  webStorage.add("emailId",email);
		  var actualKey = routeParams.registrationKey;
		  var sliceKey = actualKey.slice(0, 27);
		  
		  scope.registrationKey = {'verificationKey' : sliceKey,
				  						'uniqueReference' : email};
		  
  		scope.goToSignInPageFun = function(){
  			rootScope.currentSession = sessionManager.clear();
  	    	  location.path('/').replace;
  		};
  		
  		httpService.post("/obsplatform/api/v1/authentication?username="+selfcare.models.obs_username+"&password="+selfcare.models.obs_password)
  		.success(function(data){
  			 httpService.setAuthorization(data.base64EncodedAuthenticationKey);
	  			RequestSender.registrationResource.update(scope.registrationKey,function(successData) {
	  				scope.isActive=true;
	  				rootScope.currentSession= {user :'selfcare'};
		          },function(errorData){
		        	  scope.isAlreadyActive=true;
		        	  rootScope.currentSession= {user :'sefcare'};
		          });
  		})
	    .error(function(errordata){
	    	console.log('authentication failure');
	    });
  		//authenticationService.authenticateWithUsernamePassword(rootScope.registrationKey);
  		
  		/*rootScope.activationPopup = function(activationData) {
  			if(activationData =="success"){
  				scope.isActive=true;
  			}
  			else if(activationData =="failure"){ 
  				scope.isAlreadyActive=true;
  				console.log("activation failure");
  			}
    	  };*/
    	  
    	  scope.registrationLinkFun =function(){
    		  scope.isActive=false;
    		  scope.isAlreadyActive=false;
    		  scope.isRegPage = true;
    		  
    		  if(scope.isRegPage == true){
    			  
    			  //getting list of city data
    			  RequestSender.addressTemplateResource.get(function(data) {
    				  scope.cities=data.cityData;
    			  });
    			  
    			  //getting state and country
    			  scope.getStateAndCountry=function(city){
    				  RequestSender.addressTemplateResource.get({city :city}, function(data) {
    					  scope.formData.state = data.state;
    					  scope.formData.country = data.country;
    				  });
    			  };
    			  
    			  //getting data from c_configuration
    			  RequestSender.configurationResource.get(function(data){
    				  for(var i in data.globalConfiguration){
    					  if(data.globalConfiguration[i].name=="Register_plan"){
    						  scope.isRegisteredPlan = data.globalConfiguration[i].enabled;
    					  }if(data.globalConfiguration[i].name=="Registration_requires_device"){
    						  scope.isDeviceEnabled = data.globalConfiguration[i].enabled;
    					  }
    				  }
    			  });
    		  }
    	  };
    	  
    	  scope.nextBtnFun = function(){
			  scope.isRegPage = false;
			  scope.isOrderPage = true;
			  scope.isPaymentPage = false;
			  scope.isAmountZero = false;
			  if(scope.isOrderPage == true){
				  
				  RequestSender.orderTemplateResource.query({region : scope.formData.state},function(data){
					  	scope.plansData = data;
				  });
			  }
		  };
		  
		  scope.previousBtnFun = function(){
  		    
			  scope.isActive=false;
    		  scope.isAlreadyActive=false;
    		  scope.isRegPage = true;
			  scope.isOrderPage = false;
			  scope.isPaymentPage = false;
			  scope.isAmountZero = false;
			  scope.registrationLinkFun();
		  };
		  
		  
		  scope.selectedPLandAm = function(contractId,planId,chargeCode,price,planCode,duration){
		    	 
			  scope.isOrderPage = false;
			  //scope.isPaymentPage = true;
			  scope.formData.planAmount = price;
			  scope.duration = duration;
	    	  scope.formData.contractperiod = contractId;
	    	  scope.formData.planCode = planId;
	    	  scope.formData.paytermCode = chargeCode;
	    	  scope.formData.planName = planCode;
	    	  if(price==0){
	    		  scope.isAmountZero = true;
	    		  scope.isPaymentPage = false;
	    	  }
	    	  else{
	    		  scope.isAmountZero = false;
	    		  scope.isPaymentPage = true;
	    	  }
	    	  //var href = window.location.href;
	    	 // var hostName = href.replace("registrationsuccess", "activeclientpreviewscreen");
	    	  // var host = window.location.hostname;
	    		//var portNo = window.location.port;
	    	 // var hostName = "https://"+host+":"+portNo+"/Clientapp/myaccount/index.html";
	    	  var hostName = selfcare.models.selfcareAppUrl;
	    	  scope.paymentDalpayURL = scope.dalpayURL+"&cust_name="+scope.formData.fullName+"&cust_phone="+scope.formData.mobileNo+"&cust_email="+email+"&cust_state="+scope.formData.state+""+
	    	  				"&cust_address1="+scope.formData.address+"&cust_zip="+scope.formData.zipcode+"&cust_city=" +
	    	  				scope.formData.city+"&num_items=1&item1_desc="+scope.formData.planName+"&item1_price="+scope.formData.planAmount+"&item1_qty=1&user1=0&user2="+hostName+"&user3=activeclientpreviewscreen";
	    	  
	      };
	      
	      scope.makePaymentFun =function(){
	    	  scope.formData.emailId = email;
	    	  webStorage.add('form','orderbook');
	    	  webStorage.add("planFormData",scope.formData);
	    	  scope.isRedirectToDalpay = true;
	      };
	      
	      scope.cancelPaymentFun =function(){
	    	  scope.nextBtnFun();
	      };
	      
	      scope.finishBtnFun =function(){
	    	  scope.formData.emailId = email;
    		  webStorage.add("planFormData",scope.formData);
    		  location.path("/activeclientpreviewscreen");
	      };
  		
    }
  });
  selfcare.ng.application.controller('ActivateUserController', 
 ['$scope','RequestSender','$rootScope','$routeParams','$modal','webStorage','HttpService','AuthenticationService',
  'SessionManager','$location',selfcare.controllers.ActivateUserController]);
}(selfcare.controllers || {}));
