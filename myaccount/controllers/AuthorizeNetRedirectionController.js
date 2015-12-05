AuthorizeNetRedirectionController = function(scope,RequestSender, location,localStorageService,routeParams,dateFilter,rootScope) {
 
	if(rootScope.selfcare_sessionData){
			 scope.clientId = rootScope.selfcare_sessionData.clientId;
			RequestSender.clientResource.get({clientId: scope.clientId} , function(clientTotalData) {
				scope.clientData = clientTotalData;
				

	    		var AuthorizeData				= localStorageService.get("AuthorizeData")||"";
	    		
	    		var formData 					= {};
	    		
	    		formData.cardNumber             = location.search().cardno;
	    		formData.cardType               = location.search().cardtype;
	    		formData.clientId 				= location.search().clientId;
	    		formData.currency 				= scope.clientData.currency || 'USD';
	    		formData.emailId                = location.search().emailId;
	    		formData.locale 				= rootScope.localeLangCode;
	    		formData.source                 = paymentGatewaySourceNames.autherizeNet;
	    		formData.total_amount 			= location.search().amount;	
	    		formData.transactionId 			= location.search().transId;
	    		formData.dateFormat 			= 'dd MMMM yyyy';
	    		
	    		formData.otherData 				= {};
	    		formData.otherData.paymentDate 	= dateFilter(new Date(),'dd MMMM yyyy');
	    		formData.otherData.email        = location.search().emailId;
	    		formData.otherData.currency 	= formData.currency;
	    		formData.otherData.transactionId = formData.transactionId;
	    		
	    		var screenName					= AuthorizeData.screenName;
	    		var planId						= AuthorizeData.planId;
	    		var priceId						= AuthorizeData.priceId;
	    	
				   RequestSender.paymentGatewayResource.update({},formData,function(data){
	    			  
					  localStorageService.add("paymentgatewayresponse", {data:data,cardType:formData.cardType,cardNumber:formData.cardNumber});
					  var result = angular.uppercase(data.Result) || "";
					  location.$$search = {};
		    			if(screenName == 'payment'){
							location.path('/paymentgatewayresponse/'+formData.clientId);
						}else {
							localStorageService.add("gatewayStatus",result);
							location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
						}
				  });

			});
	}
	
	    		
};

selfcareApp.controller('AuthorizeNetRedirectionController', ['$scope',
                                                       'RequestSender', 
	                                                  '$location', 
	                                                  'localStorageService', 
	                                                  '$routeParams', 
	                                                  'dateFilter', 
	                                                  '$rootScope', 
	                                                  AuthorizeNetRedirectionController]);

