PaypalRecurringSuccessController = function(rootScope,RequestSender,location,localStorageService,routeParams) {
 
    		
		localStorageService.add("gatewayStatus","RECURRING");
		location.path("/orderbookingscreen/additionalorders/1348/59/99");
        	
        	
        	        	
        };
        
selfcareApp.controller('PaypalRecurringSuccessController', ['$rootScope',
                                                  'RequestSender', 
                                                  '$location', 
                                                  'localStorageService',
                                                  '$routeParams',
                                                  PaypalRecurringSuccessController]);

