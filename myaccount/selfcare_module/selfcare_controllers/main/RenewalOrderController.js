(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  RenewalOrderController: function(scope,RequestSender,rootScope,routeParams,modal,
			  							webStorage,HttpService,authenticationService,sessionManager,location) {
		  
		  	scope.isOrderPage = true;
		  	scope.isPaymentPage = false;
		  	scope.isRedirectToDalpay = false;
		  	scope.isAmountZero = false;
		  	scope.orderData = [];
		  	scope.plansData = {};
			scope.clientData = {};
			scope.clientOrdersData = [];
			scope.pricingData = [];
		  	
		  //declaration of formData
			  scope.formData = {};
			  
		  //getting dalpay Url
		  scope.dalpayURL = selfcare.models.dalpayURL;
		  	
		  var clientDatas = webStorage.get("clientTotalData");
		  if(clientDatas){
			  scope.formData = clientDatas.clientData;
			  scope.formData.clientId = routeParams.clientId;
		  }
		  scope.orderId = routeParams.orderId;
    	  
			  if(scope.isOrderPage == true){
				  RequestSender.getSingleOrderResource.get({orderId: routeParams.orderId},function(data){
					  scope.orderData=data.orderData;
				    RequestSender.clientResource.get({clientId: scope.formData.clientId} , function(data) {
				    	
					  RequestSender.orderTemplateResource.query({region : data.state},function(data){
						  
						  for(var i in data){
							  if(scope.orderData.planCode == data[i].planCode){
							  scope.plansData = data[i];
							  	console.log(scope.plansData);
							  }
						  }
					
					  });
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
	    	  //	var host = window.location.hostname;
	    		//var portNo = window.location.port;
	    	  var hostName = selfcare.models.selfcareAppUrl;
	    	  scope.paymentDalpayURL = scope.dalpayURL+"&cust_name="+scope.formData.lastname+"&cust_phone="+scope.formData.phone+"&cust_email="+scope.formData.email+"&cust_state="+scope.formData.state+""+
	    	  				"&cust_address1="+scope.formData.addressNo+"&cust_zip="+scope.formData.zip+"&cust_city="+scope.formData.city+"&num_items=1&item1_desc="+scope.formData.planName+"&item1_price="+scope.formData.planAmount+"" +
	    	  				"&item1_qty=1&user1="+scope.formData.id+"&user2="+hostName+"&user3=renewalorderpreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId;
	    	  
	      };
	      
	      scope.makePaymentFun =function(){
	    	  webStorage.add("renewalOrderFormData",scope.formData);
	    	  scope.isRedirectToDalpay = true;
	      };
	      
	      scope.cancelPaymentFun = function(){
	    	  scope.isOrderPage = true;
			  	scope.isPaymentPage = false;
			  	scope.isRedirectToDalpay = false;
			  	scope.isAmountZero = false;
	      };
	      
	      scope.finishBtnFun =function(){
	    	  
	    	  webStorage.add("renewalOrderFormData",scope.formData);
    		  location.path("/renewalorderpreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId);
	      };
  		
    }
  });
  selfcare.ng.application.controller('RenewalOrderController', 
 ['$scope','RequestSender','$rootScope','$routeParams','$modal','webStorage','HttpService','AuthenticationService',
  'SessionManager','$location',selfcare.controllers.RenewalOrderController]);
}(selfcare.controllers || {}));
