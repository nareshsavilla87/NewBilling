PaypalRecurringSuccessController = function(scope,rootScope,RequestSender,location,localStorageService,routeParams) {
 
	
		var screenName 		= routeParams.screenName||"";
		var clientId 		= routeParams.clientId||"";
		var planId 			= routeParams.planId||"";
		var priceId 		= routeParams.priceId||"";
	
		localStorageService.remove("chargeCodeData");
		localStorageService.add("gatewayStatus","RECURRING");
		
		
		var recurringData = localStorageService.get("recurringData")||{};
		console.log(recurringData);
		var scbcriberId = null;var orderId = null;
		if(recurringData.length != 0){
			scbcriberId = recurringData.scbcriberId;
			orderId = recurringData.orderId;
		}
		console.log("scbcriberId-->"+scbcriberId);
		if(scbcriberId){
			localStorageService.remove("recurringData")
			var formData = {orderId:orderId,recurringStatus:"CANCEL"};
			RequestSender.orderDisconnectByScbcriberIdResource.remove({},formData,function(data){
				
				location.path("/orderbookingscreen/"+screenName+"/"+clientId+"/"+planId+"/"+priceId);
			});
		}else{
			localStorageService.remove("recurringData")
			location.path("/orderbookingscreen/"+screenName+"/"+clientId+"/"+planId+"/"+priceId);
		}
        	
        	
        	        	
        };
        
selfcareApp.controller('PaypalRecurringSuccessController', ['$scope',
                                                  '$rootScope',
                                                  'RequestSender', 
                                                  '$location', 
                                                  'localStorageService',
                                                  '$routeParams',
                                                  PaypalRecurringSuccessController]);

