(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
		GlobalPaySuccessController: function(scope, rootScope,RequestSender, location, http, dateFilter,webStorage,routeParams) {
 
    		scope.formData = {};
    		scope.formData.transactionId = location.search().txnref;
    		scope.formData.source = 'globalpay';
    		
    		RequestSender.paymentGatewayResource.update(scope.formData, function(data){
    			webStorage.add("paymentgatewayresponse",data);
    			if(webStorage.get("additionalPlanFormData")){
            		scope.additionalPlanFormData = webStorage.get("additionalPlanFormData");
            	 	location.path("/additionalorderspreviewscreen/"+routeParams.planId+"/"+routeParams.clientId);
        		}else if(webStorage.get("renewalOrderFormData")){
            		scope.renewalOrderFormData = webStorage.get("renewalOrderFormData");
            	 	location.path("/renewalorderpreviewscreen/"+routeParams.planId+"/"+routeParams.clientId);
        		}else if(webStorage.get("eventData")){
            		scope.eventData = webStorage.get("eventData");
            	 	location.path( "/eventdetailspreviewscreen");
        		}
    		});
    		
		}
    });
	selfcare.ng.application.controller('GlobalPaySuccessController', [
	                                                                  '$scope', 
	                                                                  '$rootScope',
	                                                                  'RequestSender', 
	                                                                  '$location', 
	                                                                  '$http', 
	                                                                  'dateFilter',
	                                                                  'webStorage',
	                                                                  '$routeParams',
	                                                                  selfcare.controllers.GlobalPaySuccessController])
.run(function($log) {
		$log.info("GlobalPaySuccessController initialized");
    });
}(selfcare.controllers || {}));

