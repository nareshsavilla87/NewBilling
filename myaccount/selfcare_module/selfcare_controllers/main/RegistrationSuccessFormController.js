(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  RegistrationSuccessFormController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location) {
		  //declaration of formData
		  scope.formData = {};
		  
		  //set the default values
		  scope.isAmountZero = false;
		  scope.nextBtn = false;
		  scope.cities = [];
		  scope.plansData = [];
		  scope.clientData = {};
		  
		  RequestSender.orderTemplateResource.query(function(data){
			  for(var i in data){
				  if(i<4){
					  scope.plansData[i] = data[i];
				  }
			  }
		  });
		  
		  //getting dalpay Url
		  scope.dalpayURL = selfcare.models.dalpayURL;
		  
		  //authentication data
		  var selfcare_sessionData = webStorage.get('selfcare_sessionData');
		  if(selfcare_sessionData){
			  httpService.setAuthorization(selfcare_sessionData.authenticationKey);
		  }
		  rootScope.currentSession= {user :'billing'};
		  
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
	      
	      /*//getting itemdetails 
	      RequestSender.allocateHardwareDetails.get({oneTimeSaleId: 1,quantity:1},function(data) {
	    	  		scope.formData.itemId=data.itemMasterId;
		      		scope.formData.quantity=data.quantity;
	        });	*/
	      
	      /*//getting device numbers
	      scope.getData = function(query){
        	return http.get(rootScope.hostUrl+ '/obsplatform/api/v1/itemdetails/'+scope.formData.itemId+'/'+scope.formData.quantity, {
        	      params: {
        	    	  query: query
        	      }
        	    }).then(function(res){
        	    	itemDetails = [];
        	      for(var i in res.data.serials){
        	    	  itemDetails.push(res.data.serials[i]);
        	    	  if(i == 7)
        	    		  break;
        	      }
        	      return itemDetails;
        	    });
          };*/
	      
	      //collecting data of plan name and its amount 
	      scope.selectedPLandAm = function(contractId,planId,chargeCode,price,planCode){
	    	 
	    	  scope.formData.planAmount = price;
	    	  scope.formData.contractperiod = contractId;
	    	  scope.formData.planCode = planId;
	    	  scope.formData.paytermCode = chargeCode;
	    	  scope.formData.planName = planCode;
	    	  if(price==0){
	    		  scope.isAmountZero = true;
	    	  }
	    	  else{
	    		  scope.isAmountZero = false;
	    		  scope.nextBtn = true;
	    	  }
	    	  var href = window.location.href;
	    	  var hostName = href.replace("registrationsuccess", "previewscreen");
	    	  //console.log(hostName);
	    	 // var hostName = "https://localhost:5560/Clientapp/myaccount/index.html#/previewscreen";
	    	  var email = webStorage.get("emailId");
	    	  scope.URL = scope.dalpayURL+"&cust_name="+scope.formData.fullName+"&cust_phone="+scope.formData.mobileNo+"&cust_email="+email+"&cust_state="+scope.formData.state+""+
	    	  				"&cust_address1="+scope.formData.address+"&cust_zip="+scope.formData.zipcode+"&cust_city="+scope.formData.city+"&num_items=1&item1_desc="+scope.formData.planName+"&item1_price="+scope.formData.planAmount+"&item1_qty=1&user1=0&user2="+hostName;
	      };
	      
          scope.savingPlanData = function(){
        	  webStorage.add("planData",{url:scope.URL});
        	  scope.formData.emailId = webStorage.get("emailId");
        	  webStorage.add("planFormData",scope.formData);
          };
          
          scope.sendingRequest = function(){
        	  if(scope.formData.deviceNo){
        		  scope.clientData.device = scope.formData.deviceNo;
        	  }
        	  scope.clientData.fullname = scope.formData.fullName;
        	  scope.clientData.city = scope.formData.city;
        	  scope.clientData.phone = scope.formData.mobileNo; 
        	  scope.clientData.email = webStorage.get("emailId"); 
        	  scope.clientData.paytermCode = scope.formData.paytermCode; 
        	  scope.clientData.contractPeriod = scope.formData.contractperiod; 
        	  scope.clientData.planCode = scope.formData.planCode; 
        	  RequestSender.authenticationClientResource.save(scope.clientData,function(data){
	        		 rootScope.currentSession = sessionManager.clear();
	 				 location.path('/').replace();
	 				 rootScope.activetedClientPopup();
 			  });
          };
          //submit functionality
          /*scope.submit = function(){
        	  
        	  console.log(scope.formData);
          };*/
          scope.isRegPage = true; 
	      scope.isOrderPage = false; 
		  scope.nextBtnFun = function(){
			  scope.isRegPage = false;
			  scope.isOrderPage = true;
		  };
    }
  });
  selfcare.ng.application.controller('RegistrationSuccessFormController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location', selfcare.controllers.RegistrationSuccessFormController]);
}(selfcare.controllers || {}));
