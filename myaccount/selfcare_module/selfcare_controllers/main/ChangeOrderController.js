(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ChangeOrderController: function(scope,RequestSender,rootScope,routeParams,modal,
			  							webStorage,HttpService,authenticationService,sessionManager,location) {
		  
		  	scope.isOrderPage = true;
		  	scope.isPaymentPage = false;
		  	scope.isRedirectToDalpay = false;
		  	scope.isAmountZero = false;
		  	scope.plansData = [];
			scope.clientData = {};
			scope.clientOrdersData = [];
			scope.pricingData = [];
			scope.selectedPlanData = {};
		  	
		  //declaration of formData
			  scope.formData = {};
			  
		  //getting dalpay Url
		  scope.dalpayURL = selfcare.models.dalpayURL;
		  	
		  var clientDatas = webStorage.get("clientTotalData");
		  if(clientDatas){
			  scope.formData = clientDatas.clientData;
			  scope.formData.clientId = clientDatas.clientId;
		  }
		  scope.orderId = routeParams.orderId;
  	  
			  if(scope.isOrderPage == true){
				 
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
				  
			  }
		  
		  
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
	    	  	//var host = window.location.hostname;
	    		//var portNo = window.location.port;
	    	  var hostName = selfcare.models.selfcareAppUrl;
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
  'SessionManager','$location',selfcare.controllers.ChangeOrderController]);
}(selfcare.controllers || {}));
