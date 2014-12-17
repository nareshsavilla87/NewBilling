(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
		PaymentGatewayResponseController: function(scope, webStorage) {
 
    		scope.formData = {};
    		
    		var responseData = webStorage.get("paymentgatewayresponse");
		     if(responseData){
		    	 scope.formData = responseData;
		     }
        	
        }
    });
	selfcare.ng.application.controller('PaymentGatewayResponseController', [
	                                                                        '$scope', 
	                                                                        'webStorage',
	                                                                        selfcare.controllers.PaymentGatewayResponseController])
.run(function($log) {
		$log.info("PaymentGatewayResponseController initialized");
    });
}(selfcare.controllers || {}));
