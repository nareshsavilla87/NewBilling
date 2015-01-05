OrderBookingScreenController = function(RequestSender,rootScope,location,dateFilter,routeParams, localStorageService) {
		  
	//values getting form routeParams 
	var screenName			= routeParams.screenName;
	var clientId			= routeParams.clientId; 
	var planId				= routeParams.planId; 
	var priceId				= routeParams.priceId; 
	var orderBookingData 	= {};
	
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
						localStorageService.remove("secretCode");
						rootScope.iskortaTokenAvailable = true;
						location.path('/paymentgatewayresponse/'+clientId);
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
	/*
		 if(routeParams.orderId == 0 && routeParams.clientId == 0){
				 RequestSender.bookOrderResource.save({clientId : scope.formData.clientId},scope.orderBookingData,function(data){
					 webStorage.remove('additionalPlanFormData');
					 rootScope.iskortaTokenAvailable = true;
					 rootScope.isActiveScreenPage= false;
					 location.path('/paymentgatewayresponse');
					 
				 });
			 }else{
				 scope.orderBookingData.disconnectionDate= reqDate;
				 scope.orderBookingData.disconnectReason= "Not Interested";
				 RequestSender.changeOrderResource.update({'orderId':routeParams.orderId},scope.orderBookingData,function(data){
					 webStorage.remove('additionalPlanFormData');
					 rootScope.iskortaTokenAvailable = true;
					 rootScope.isActiveScreenPage= false;
					 location.path('/paymentgatewayresponse');
					
	               });
			 }*/
		 
    };

selfcareApp.controller('OrderBookingScreenController', ['RequestSender',
                                                        '$rootScope',
                                                        '$location',
                                                        'dateFilter',
                                                        '$routeParams',
                                                        'localStorageService',
                                                         OrderBookingScreenController]);
