PaypalRecurringSuccessController = function(rootScope,RequestSender,location,localStorageService,routeParams) {
 
	
		var screenName 		= routeParams.screenName||"";
		var clientId 		= routeParams.clientId||"";
		var planId 			= routeParams.planId||"";
		var priceId 		= routeParams.priceId||"";
	
		localStorageService.add("gatewayStatus","RECURRING");
		location.path("/orderbookingscreen/"+screenName+"/"+clientId+"/"+planId+"/"+priceId);
        	
        	
        	        	
        };
        
selfcareApp.controller('PaypalRecurringSuccessController', ['$rootScope',
                                                  'RequestSender', 
                                                  '$location', 
                                                  'localStorageService',
                                                  '$routeParams',
                                                  PaypalRecurringSuccessController]);

