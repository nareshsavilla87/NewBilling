(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  AdditionalOrdersController: function(scope,RequestSender,rootScope,routeParams,modal,
			  							webStorage,HttpService,authenticationService,sessionManager,location) {
		  
		  	scope.isOrderPage = true;
		  	scope.isPaymentPage = false;
		  	scope.isRedirectToGateway = false;
		  	scope.isAmountZero = false;
		  	scope.paymentGatewayName = 'korta';
		  	scope.totalPlansData = [];
		  	scope.plansData = [];
			scope.clientData = {};
			scope.clientOrdersData = [];
			scope.pricingData = [];
			var selfcareUserData = {};
			scope.paymentgatewayData = [];
			scope.kortaDisplay = false;
			scope.dalpayDisplay = false;
			scope.globalpayDisplay = false;
			scope.paypalDisplay = false;
			
			RequestSender.paymentGatewayConfigResource.get(function(data) {
				  scope.paymentgatewayData = data.globalConfiguration;
				  
				  for(var i=0;i<scope.paymentgatewayData.length;i++){	
					  
	                	if(scope.paymentgatewayData[i].name == 'korta'){
	                		scope.kortaDisplay = scope.paymentgatewayData[i].enabled;
	                	}else if(scope.paymentgatewayData[i].name == 'dalpay'){
	                		scope.dalpayDisplay = scope.paymentgatewayData[i].enabled;
	                		scope.dalpayURL = scope.paymentgatewayData[i].value;
	                	}else if(scope.paymentgatewayData[i].name == 'globalpay'){
	                		scope.globalpayDisplay = scope.paymentgatewayData[i].enabled;       
	                	}else if(scope.paymentgatewayData[i].name == 'paypal'){
	                		scope.paypalDisplay = scope.paymentgatewayData[i].enabled;
	                		var value = scope.paymentgatewayData[i].value;
	                		var arr = value.split(",");
	    					var paypalUrl = arr[0].split('"');
	    					var paypalEmailId = arr[1].split('"');
	                		scope.paypalUrl = paypalUrl[3] + '=' + paypalEmailId[3] ;
	                		
	                	}else{
	                		alert('nothing');
	                	}
	               }
				 
			 });

		  	
		  //declaration of formData
			  scope.formData = {};
			  

		  
		  var ordersRetriveFun = function(){
			  
			  if(scope.isOrderPage == true){
				 
			    var clientDatas = webStorage.get("clientTotalData");
			     if(clientDatas){
					  RequestSender.clientResource.get({clientId: clientDatas.clientId} , function(data) {
						  scope.formData = data;
						  selfcareUserData = data.selfcare;
						  console.log(scope.formData);
						  scope.formData.clientId = data.id;
					
				  
					 if(routeParams.clientId == 0 && routeParams.orderId == 0){
						  RequestSender.orderTemplateResource.query({region : scope.formData.state},function(data){
							  scope.totalPlansData = data;
							  
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
								 // scope.plansData = scope.totalPlansData;
							  });
						  });
					   }
				    });
				  }
			  }
		  };ordersRetriveFun();

		  		  
		  var hostName = selfcare.models.selfcareAppUrl;
		      		     
		  scope.paymentGatewayFun  = function(paymentGatewayName){
				  	
			  console.log(paymentGatewayName);	
			  scope.paymentGatewayName = paymentGatewayName;
		    	  		 	
			  if(paymentGatewayName == 'dalpay'){	    		
				  scope.paymentURL = scope.dalpayURL+"&cust_name="+scope.formData.lastname+"&cust_phone="+scope.formData.phone+"&cust_email="+scope.formData.email+"&cust_state="+scope.formData.state+""+				
				  "&cust_address1="+scope.formData.addressNo+"&cust_zip="+scope.formData.zip+"&cust_city="+scope.formData.state+"&item1_desc="+scope.formData.planName+"&item1_price="+scope.formData.planAmount+"" + 	  				
				  "&user1="+scope.formData.id+"&user2="+hostName+"&user3=additionalorderspreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId; 
		    	  		     	 
			  }else if(paymentGatewayName == 'korta'){		    		
				  var token = selfcareUserData.token;		    		
				  if(token != null && token != ""){		    		
					  scope.paymentURL = "#/kortatokenpayment/"+routeParams.orderId+"/"+routeParams.clientId;		    		 
				  }else{		    		
					  scope.paymentURL = "#/kortaIntegration/"+routeParams.orderId+"/"+routeParams.clientId;	    		
				  }	  
				  
			  }else if(paymentGatewayName == 'paypal'){ 	  	    		  
				  scope.paymentURL = scope.paypalUrl+"&item_name="+scope.formData.planName+"&amount="+scope.formData.planAmount+"" +	  	  				
				  "&custom="+scope.formData.clientId;  
				  
			  }else if(paymentGatewayName == 'globalpay'){	    		 		    			
				  scope.paymentURL = "#/globalpayIntegration/" + scope.formData.clientId+"/" + scope.formData.planAmount;		    
			  };
		      
		  };
			  
		  scope.selectedPLandAm = function(contractId,planId,chargeCode,price,planCode,duration){
		    	
			  scope.isOrderPage = false;
			 // scope.isPaymentPage = true;
			  scope.formData.planAmount = price;
			  scope.duration = duration;
	    	  scope.formData.contractperiod = contractId;
	    	  scope.formData.planCode = planId;
	    	  scope.formData.paytermCode = chargeCode;
	    	  scope.formData.planName = planCode;
	    	  if(price==0){
	    		  scope.isAmountZero = true;
	    		  scope.isPaymentPage = false;
	    	  }else{
	    		  scope.isAmountZero = false;
	    		  scope.isPaymentPage = true;
	    	  }
	    	  scope.paymentGatewayFun('korta');
	    	  	//var host = window.location.hostname;
	    		//var portNo = window.location.port;
	    	 
	    	 /* scope.paymentDalpayURL = scope.dalpayURL+"&cust_name="+scope.formData.lastname+"&cust_phone="+scope.formData.phone+"&cust_email="+scope.formData.email+"&cust_state="+scope.formData.state+""+
	    	  				"&cust_address1="+scope.formData.addressNo+"&cust_zip="+scope.formData.zip+"&cust_city="+scope.formData.city+"&item1_desc="+scope.formData.planName+"&item1_price="+scope.formData.planAmount+"" +
	    	  				"&user1="+scope.formData.id+"&user3=additionalorderspreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId;*/
	    	  
	      };
	      
	      scope.makePaymentFun =function(){
	    	  console.log(scope.formData);
	    	  webStorage.add('form','orderbook');
	    	  webStorage.add("additionalPlanFormData",scope.formData);
	    	  scope.isRedirectToGateway = true;
	      };
	      
	      scope.cancelPaymentFun = function(){
	    	    scope.isOrderPage = true;
			  	scope.isPaymentPage = false;
			  	scope.isRedirectToGateway = false;
			  	scope.isAmountZero = false;
                scope.plansData = [];
                ordersRetriveFun();
	      };
	      
	      scope.finishBtnFun =function(){
	    	  
	    	  webStorage.add("additionalPlanFormData",scope.formData);
    		  location.path("/additionalorderspreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId);
	      };
  		
    }
  });
  selfcare.ng.application.controller('AdditionalOrdersController', 
 ['$scope','RequestSender','$rootScope','$routeParams','$modal','webStorage','HttpService','AuthenticationService',
  'SessionManager','$location',selfcare.controllers.AdditionalOrdersController]).run(function($log) {
      $log.info("AdditionalOrdersController initialized");
  });
}(selfcare.controllers || {}));
