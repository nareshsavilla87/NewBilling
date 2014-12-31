PaymentGatewayResponseController = function(scope,localStorageService) {
 
			scope.formData = {};
			
			var responseData = localStorageService.get("paymentgatewayresponse");
		     if(responseData){
		    	 scope.formData = responseData;
		    	 localStorageService.remove("paymentgatewayresponse");
		     }
        };
        
selfcareApp.controller('PaymentGatewayResponseController', [ '$scope','localStorageService',PaymentGatewayResponseController]);
