(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  RenewalOrderPreviewScreenController: function(scope,RequestSender,rootScope,webStorage,location,dateFilter,routeParams) {
		  
		  scope.formData = {};
		  scope.orderBookingData = {};
		 scope.formData = webStorage.get("renewalOrderFormData");
		 
		 console.log(webStorage.get("renewalOrderFormData"));
		 
		 if(webStorage.get("renewalOrderFormData")){
			 scope.orderBookingData.renewalPeriod = scope.formData.contractperiod; 
			 scope.orderBookingData.description = 'Renewal the Order'; 
		 }
		 
		 RequestSender.orderRenewalResource.save({orderId :routeParams.orderId},scope.orderBookingData,function(data){
			 if(scope.formData.kortaToken){
				 RequestSender.updateKortaToken.update({clientId : routeParams.clientId},{'kortaToken':scope.formData.kortaToken},function(data){
					 webStorage.remove('renewalOrderFormData');
					 location.path('/orders');
				 });
			 }else{
				 webStorage.remove('renewalOrderFormData');
				 location.path('/orders');
			 }
		 });
		 
    }
  });
  selfcare.ng.application.controller('RenewalOrderPreviewScreenController', ['$scope','RequestSender','$rootScope','webStorage','$location','dateFilter','$routeParams', selfcare.controllers.RenewalOrderPreviewScreenController]);
}(selfcare.controllers || {}));
