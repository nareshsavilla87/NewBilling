(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ChangeOrderController: function(scope,RequestSender,rootScope,routeParams,modal,
			  							webStorage,HttpService,authenticationService,sessionManager,location) {
		  
		  	scope.planselectionTab = true;
		  	scope.isOrderPage = true;
		  	scope.isPaymentPage = false;
		  	scope.isAmountZero = false;
		  	scope.isRedirectToDalpay = false;
		  	
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
				  
						 scope.totalPlansData = [];
						  RequestSender.orderTemplateResource.query({region : scope.formData.state},function(data){
							  scope.totalPlansData = data;
							  
							  scope.plansData = [];
							  scope.clientOrdersData = [];
							  RequestSender.getOrderResource.get({clientId:scope.formData.clientId},function(data){
								  scope.clientOrdersData = data.clientOrders;
								  
								  for(var i in scope.totalPlansData){
									  for(var j in scope.clientOrdersData){
										  
										  if(scope.totalPlansData[i].planId == scope.clientOrdersData[j].pdid){
											  scope.totalPlansData[i].pricingData = _.filter(scope.totalPlansData[i].pricingData, function(item) {
												  return (item.planCode != scope.clientOrdersData[j].planCode) &&
												  		  (item.duration != scope.clientOrdersData[j].contractPeriod) &&
												  		  (item.price != scope.clientOrdersData[j].price);
											  });
										  }
									  }
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
				    });
				  }
			  }
		  };ordersRetriveFun();
		  
		  var hostName = selfcare.models.selfcareAppUrl;
		  
		   scope.paymentGatewayFun  = function(paymentGatewayName){
		     switch(paymentGatewayName){
	      			
  				case 'dalpay' :
  						
  					scope.paymentURL = scope.dalpayURL+"&cust_name="+scope.formData.lastname+"&cust_phone="+scope.formData.phone+"&cust_email="+scope.formData.email+"&cust_state="+scope.formData.state+""+				
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
  						
  					 scope.paymentURL = scope.paypalUrl+"&item_name="+scope.formData.planName+"&amount="+scope.formData.planAmount+"" +	  	  				
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
	    	  }
	    	  scope.paymentGatewayFun(scope.paymentGatewayName);
		  };
	      
	      scope.makePaymentFun =function(){
	    	  webStorage.add('form','orderbook');
	    	  webStorage.add("additionalPlanFormData",scope.formData);
	    	  scope.isRedirectToDalpay = true;
	      };
	      
	      scope.cancelPaymentFun = function(){
	    	    scope.isOrderPage = true;
			  	scope.isPaymentPage = false;
			  	scope.isRedirectToDalpay = false;
			  	scope.isAmountZero = false;
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
  selfcare.ng.application.controller('ChangeOrderController', 
 ['$scope','RequestSender','$rootScope','$routeParams','$modal','webStorage','HttpService','AuthenticationService',
  'SessionManager','$location',selfcare.controllers.ChangeOrderController]).run(function($log) {
      $log.info("ChangeOrderController initialized");
  });
}(selfcare.controllers || {}));




/*(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ChangeOrderController: function(scope,RequestSender,rootScope,routeParams,modal,
			  							webStorage,HttpService,authenticationService,sessionManager,location) {
		  
		  	scope.isOrderPage = true;
		  	scope.isPaymentPage = false;
		  	scope.isRedirectToDalpay = false;
		  	scope.isAmountZero = false;
		  	scope.paymentGatewayName = 'korta';
		  	scope.plansData = [];
			scope.clientData = {};
			scope.clientOrdersData = [];
			scope.pricingData = [];
			scope.selectedPlanData = {};
			var selfcareUserData = {};
		  	
		  //declaration of formData
			  scope.formData = {};
			  
		  //getting dalpay Url
		  scope.dalpayURL = selfcare.models.dalpayURL;
		  	
		  scope.orderId = routeParams.orderId;
  	  
			  if(scope.isOrderPage == true){
				  var clientDatas = webStorage.get("clientTotalData");
				  if(clientDatas){
					  RequestSender.clientResource.get({clientId: clientDatas.clientId} , function(data) {
						  scope.formData = data;
						  selfcareUserData = data.selfcare;
						  console.log(scope.formData);
						  scope.formData.clientId = data.id;
					 
					 
					  RequestSender.getOrderResource.get({clientId:scope.formData.clientId},function(data){
						  scope.clientOrdersData = data.clientOrders;
						  for(var plan in scope.clientOrdersData){
							  if(scope.clientOrdersData[plan].id == routeParams.orderId){
								  scope.selectedPlanData = scope.clientOrdersData[plan];
							  }
						  }
						  RequestSender.orderTemplateResource.query({region : scope.formData.state},function(data){
							  scope.plansData = data;
							  
							  for(var i in scope.plansData){
								  scope.pricingData = scope.plansData[i].pricingData;
								  for(var j in scope.clientOrdersData){
									  for(var k  in scope.pricingData){
										  if(scope.pricingData[k].planCode == scope.clientOrdersData[j].planCode &&
												  scope.pricingData[k].duration == scope.clientOrdersData[j].contractPeriod){
											  //console.log(scope.plansData[i].pricingData[k]);
											  scope.plansData[i].pricingData = scope.plansData[i].pricingData.filter(function( element ) {
												    return element.id != scope.plansData[i].pricingData[k].id;
												});
										  }
									  }
								  }
							  }
							  
						  });
					  });
			       });
				 }
			   }
		  
			  var hostName = selfcare.models.selfcareAppUrl;
			  
				scope.paymentGatewayFun  = function(paymentGatewayName){
			    	  console.log(paymentGatewayName);
			    	  scope.paymentGatewayName = paymentGatewayName;
			    	  
			    	  if(paymentGatewayName == 'dalpay'){
			    		  scope.paymentDalpayURL = scope.dalpayURL+"&cust_name="+scope.formData.lastname+"&cust_phone="+scope.formData.phone+"&cust_email="+scope.formData.email+"&cust_state="+scope.formData.state+""+
	    	  				"&cust_address1="+scope.formData.addressNo+"&cust_zip="+scope.formData.zip+"&cust_city="+scope.formData.state+"&num_items=1&item1_desc="+scope.formData.planName+"&item1_price="+scope.formData.planAmount+"" +
	    	  				"&user1="+scope.formData.id+"&user2="+hostName+"&user3=additionalorderspreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId; 
			    	  }else if(paymentGatewayName == 'korta'){
			    		  var token = selfcareUserData.token;
			    		  if(token != null && token != ""){
			    			  scope.paymentDalpayURL = "#/kortatokenpayment/"+routeParams.orderId+"/"+routeParams.clientId;
			    		  }else{
			    			  scope.paymentDalpayURL = "#/kortaIntegration/"+routeParams.orderId+"/"+routeParams.clientId;
			    		  }
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
	    	  scope.paymentDalpayURL = scope.dalpayURL+"&cust_name="+scope.formData.lastname+"&cust_phone="+scope.formData.phone+"&cust_email="+scope.formData.email+"&cust_state="+scope.formData.state+""+
	    	  				"&cust_address1="+scope.formData.addressNo+"&cust_zip="+scope.formData.zip+"&cust_city="+scope.formData.city+"&num_items=1&item1_desc="+scope.formData.planName+"&item1_price="+scope.formData.planAmount+"" +
	    	  				"&item1_qty=1&user1="+scope.formData.id+"&user2="+hostName+"&user3=additionalorderspreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId;
	    	  
	      };
	      
	      scope.makePaymentFun =function(){
	    	  console.log(scope.formData);
	    	  webStorage.add('form','orderbook');
	    	  webStorage.add("additionalPlanFormData",scope.formData);
	    	  scope.isRedirectToDalpay = true;
	      };
	      
	      scope.cancelPaymentFun = function(){
	    	  scope.isOrderPage = true;
			  	scope.isPaymentPage = false;
			  	scope.isRedirectToDalpay = false;
			  	scope.isAmountZero = false;
	      };
	      
	      scope.finishBtnFun =function(){
	    	  
	    	  webStorage.add("additionalPlanFormData",scope.formData);
  		  location.path("/additionalorderspreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId);
	      };
		
  }
  });
  selfcare.ng.application.controller('ChangeOrderController', 
 ['$scope','RequestSender','$rootScope','$routeParams','$modal','webStorage','HttpService','AuthenticationService',
  'SessionManager','$location',selfcare.controllers.ChangeOrderController]).run(function($log) {
      $log.info("ChangeOrderController initialized");
  });
}(selfcare.controllers || {}));
*/