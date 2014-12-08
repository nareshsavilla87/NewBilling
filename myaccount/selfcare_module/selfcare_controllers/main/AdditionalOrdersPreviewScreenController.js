(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  AdditionalOrdersPreviewScreenController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,dateFilter,routeParams) {
		  
		  scope.formData = {};
		  scope.orderBookingData = {};
		 scope.formData = webStorage.get("additionalPlanFormData");
		 
		 console.log(webStorage.get("additionalPlanFormData"));
		 
		 if(webStorage.get("additionalPlanFormData")){
			 scope.orderBookingData.billAlign = false;
			 scope.orderBookingData.isNewplan = true;
			 scope.orderBookingData.locale = 'en'; 
			 scope.orderBookingData.dateFormat = 'dd MMMM yyyy'; 
			 var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
			 scope.orderBookingData.start_date =  reqDate; 
			 scope.orderBookingData.paytermCode = scope.formData.paytermCode; 
			 scope.orderBookingData.contractPeriod = scope.formData.contractperiod; 
			 scope.orderBookingData.planCode = scope.formData.planCode; 
		 }
		 
		 if(routeParams.orderId == 0 && routeParams.clientId == 0){
				 RequestSender.bookOrderResource.save({clientId : scope.formData.clientId},scope.orderBookingData,function(data){
					 webStorage.remove('additionalPlanFormData');
					 rootScope.iskortaTokenAvailable = true;
					 rootScope.isActiveScreenPage= false;
					 location.path('/paymentgatewayresponse');
					 /*if(scope.formData.kortaToken){
						 RequestSender.updateKortaToken.update({clientId : scope.formData.clientId},{'kortaToken':scope.formData.kortaToken},function(data){
							 webStorage.remove('additionalPlanFormData');
							 rootScope.iskortaTokenAvailable = true;
							 rootScope.isActiveScreenPage= false;
							 location.path('/paymentgatewayresponse');
						 });
					 }else{
						 webStorage.remove('additionalPlanFormData');
						 rootScope.iskortaTokenAvailable = true;
						 rootScope.isActiveScreenPage= false;
						 location.path('/paymentgatewayresponse');
					 }*/
				 });
			 }else{
				 scope.orderBookingData.disconnectionDate= reqDate;
				 scope.orderBookingData.disconnectReason= "Not Interested";
				 RequestSender.changeOrderResource.update({'orderId':routeParams.orderId},scope.orderBookingData,function(data){
					 webStorage.remove('additionalPlanFormData');
					 rootScope.iskortaTokenAvailable = true;
					 rootScope.isActiveScreenPage= false;
					 location.path('/paymentgatewayresponse');
					 /*if(scope.formData.kortaToken){
							// scope.clientData.kortaToken = scope.formData.kortaToken;
							 RequestSender.updateKortaToken.update({clientId : scope.formData.clientId},{'kortaToken':scope.formData.kortaToken},function(data){
								 webStorage.remove('additionalPlanFormData');
								 rootScope.iskortaTokenAvailable = true;
								 rootScope.isActiveScreenPage= false;
								 location.path('/paymentgatewayresponse');
							 });
						 }else{
							 webStorage.remove('additionalPlanFormData');
							 rootScope.iskortaTokenAvailable = true;
							 rootScope.isActiveScreenPage= false;
							 location.path('/paymentgatewayresponse');
						 }*/
	               });
			 }
		 
    }
  });
  selfcare.ng.application.controller('AdditionalOrdersPreviewScreenController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','dateFilter','$routeParams', selfcare.controllers.AdditionalOrdersPreviewScreenController]).run(function($log) {
      $log.info("AdditionalOrdersPreviewScreenController initialized");
  });
}(selfcare.controllers || {}));
