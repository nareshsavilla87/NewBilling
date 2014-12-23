(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
		GlobalPaySuccessController: function(scope, rootScope,RequestSender, location, http, dateFilter,webStorage,routeParams,httpService) {
 
    		scope.formData = {};
    		scope.additionalPlanFormData={};
    		scope.formData.transactionId = location.search().txnref;
    		scope.formData.source = 'globalpay';

	        	
    		httpService.post("/obsplatform/api/v1/authentication?username="+selfcare.models.obs_username+"&password="+selfcare.models.obs_password)      			
  			 .success(function(data){      	  			
  				 httpService.setAuthorization(data.base64EncodedAuthenticationKey);      	  			
  				 rootScope.currentSession= {user :'selfcare'};     	  			
  	
  				 RequestSender.paymentGatewayResource.update(scope.formData, function(data){
  	    			webStorage.add("paymentgatewayresponse",data);
  	    			if(webStorage.get("additionalPlanFormData")){
  	            		scope.additionalPlanFormData = webStorage.get("additionalPlanFormData");
  	            	 	location.path("/additionalorderspreviewscreen/0/0");
  	        		}else if(webStorage.get("renewalOrderFormData")){
  	            		scope.renewalOrderFormData = webStorage.get("renewalOrderFormData");
  	            	 	//location.path("/renewalorderpreviewscreen/"+scope.planId+"/"+scope.clientId);
  	            		location.path("/renewalorderpreviewscreen/0/0");
  	        		}else if(webStorage.get("eventData")){
  	            		scope.eventData = webStorage.get("eventData");
  	            	 	location.path( "/eventdetailspreviewscreen");
  	        		}
  	    		});
  				
  				 
  			 })      		 
  			 .error(function(errordata){      		    	
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
	                                                                  '$routeParams','HttpService',
	                                                                  selfcare.controllers.GlobalPaySuccessController])
.run(function($log) {
		$log.info("GlobalPaySuccessController initialized");
    });
}(selfcare.controllers || {}));

