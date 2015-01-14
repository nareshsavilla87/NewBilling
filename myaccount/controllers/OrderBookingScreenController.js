OrderBookingScreenController = function(RequestSender,rootScope,location,dateFilter,routeParams, localStorageService) {
		  
	//values getting form routeParams 
	var screenName			= routeParams.screenName;
	var clientId			= routeParams.clientId; 
	var planId				= routeParams.planId; 
	var priceId				= routeParams.priceId; 
	var orderBookingData 	= {};
	
	function successFun(planData){
    	localStorageService.remove("secretCode");
		(planData.price==0) ? location.path("/services") : location.path('/paymentgatewayresponse/'+clientId);
    }
	
    RequestSender.clientResource.get({clientId: clientId} , function(data) {
		  var clientData = data;
	 RequestSender.orderTemplateResource.query({region : clientData.state},function(data){
			var totalOrdersData = data;
		for(var i in totalOrdersData){
		  if(totalOrdersData[i].planId == planId){
			for(var j in totalOrdersData[i].pricingData){
			  if(totalOrdersData[i].pricingData[j].id == priceId){
				var planData = totalOrdersData[i].pricingData[j];
				if(screenName == "additionalorders"){
					orderBookingData.billAlign 		= false;
					orderBookingData.isNewplan 		= true;
					orderBookingData.locale 		= 'en'; 
					orderBookingData.dateFormat 	= 'dd MMMM yyyy'; 
					var reqDate 					= dateFilter(new Date(),'dd MMMM yyyy');
					orderBookingData.start_date 	= reqDate; 
					orderBookingData.paytermCode 	= planData.billingFrequency; 
					orderBookingData.contractPeriod = planData.contractId; 
					orderBookingData.planCode 		= planId;
					RequestSender.bookOrderResource.save({clientId : clientId},orderBookingData,function(data){
						successFun(planData);
					});
				}else if(screenName == "changeorder"){
					var changeOrderData 			 = {};
					changeOrderData.billAlign 		 = false;
					changeOrderData.isNewplan 		 = false;
					changeOrderData.locale 			 = 'en'; 
					changeOrderData.dateFormat 		 = 'dd MMMM yyyy'; 
					var reqDate 					 = dateFilter(new Date(),'dd MMMM yyyy');
					changeOrderData.start_date 		 = reqDate; 
					changeOrderData.disconnectionDate= reqDate;
					changeOrderData.paytermCode 	 = planData.billingFrequency; 
					changeOrderData.contractPeriod 	 = planData.contractId; 
					changeOrderData.planCode 		 = planId;
					changeOrderData.disconnectReason = "Not Interested";
					var orderId						 = "";
					localStorageService.get("storageData")? orderId = localStorageService.get("storageData").orderId
														  : orderId = "";
					RequestSender.changeOrderResource.update({'orderId':orderId},changeOrderData,function(data){
						successFun(planData);
					});
				}else if(screenName == "renewalorder"){
						 var renewalOrderData 			 = {};
						 renewalOrderData.renewalPeriod  = planData.contractId; 
						 renewalOrderData.description	 = 'Order Renewal through selfcare'; 
						 
						 var orderId						 = "";
						localStorageService.get("storageData")? orderId = localStorageService.get("storageData").orderId
																  : orderId = "";
						RequestSender.orderRenewalResource.save({orderId :orderId},renewalOrderData,function(data){
							 successFun(planData);
						 });
				}
				break;
			  }
			}
		   break;
		  }
		}
	  });
	});
		 
  };

selfcareApp.controller('OrderBookingScreenController', ['RequestSender',
                                                        '$rootScope',
                                                        '$location',
                                                        'dateFilter',
                                                        '$routeParams',
                                                        'localStorageService',
                                                         OrderBookingScreenController]);
