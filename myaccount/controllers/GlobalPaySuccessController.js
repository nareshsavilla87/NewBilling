GlobalPaySuccessController = function(RequestSender, location,localStorageService) {
 
    		var formData = {};
    		formData.transactionId 	= location.search().txnref;
    		formData.source 		= 'globalpay';
    		var StorageData			= localStorageService.get("globalpayStorageData");
    		var screenName			= StorageData.screenName;
    		var clientId			= StorageData.clientId;
    		var planId				= StorageData.planId;
    		var priceId				= StorageData.priceId;
    		
    		if(StorageData){
	    		RequestSender.paymentGatewayResource.update(formData, function(data){
	    			localStorageService.remove("globalpayStorageData", data);
	    			localStorageService.add("paymentgatewayresponse", {data:data});
	    			var result = data.Result.toUpperCase() || "";
	    			localStorageService.add("gatewayStatus",result);
	    			location.$$search = {};
	    			if(screenName == 'payment'){
						location.path('/paymentgatewayresponse/'+formData.clientId);
					}else if(result == 'SUCCESS' || result == 'PENDING'){
						location.path("/orderbookingscreen/"+screenName+"/"+clientId+"/"+planId+"/"+priceId);
					}
	    		});
    		}
    		
		};

selfcareApp.controller('GlobalPaySuccessController', ['RequestSender', 
	                                                  '$location', 
	                                                  'localStorageService', 
	                                                  GlobalPaySuccessController]);

