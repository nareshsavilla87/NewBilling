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
					 location.path('/orders');
				 });
			 }else{
				 scope.orderBookingData.disconnectionDate= reqDate;
				 scope.orderBookingData.disconnectReason= "Not Interested";
				 RequestSender.changeOrderResource.update({'orderId':routeParams.orderId},scope.orderBookingData,function(data){
					 webStorage.remove('additionalPlanFormData');
					 location.path('/orders');
	               });
			 }
		 
		/* scope.submitTotalData = function(){
			 
			 scope.orderBookingData.billAlign = true;
			 scope.orderBookingData.isNewplan = true;
			 scope.orderBookingData.locale = 'en'; 
			 scope.orderBookingData.dateFormat = 'dd MMMM yyyy'; 
			 var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
			 scope.orderBookingData.start_date =  reqDate; 
			 scope.orderBookingData.paytermCode = scope.formData.paytermCode; 
			 scope.orderBookingData.contractPeriod = scope.formData.contractperiod; 
			 scope.orderBookingData.planCode = scope.formData.planCode; 
			 
			 RequestSender.bookOrderResource.save({clientId : scope.formData.clientId},scope.orderBookingData,function(data){
				 webStorage.remove('additionalPlanFormData');
				 location.path('/additionalorders');
			 });
		 };*/
    }
  });
  selfcare.ng.application.controller('AdditionalOrdersPreviewScreenController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','dateFilter','$routeParams', selfcare.controllers.AdditionalOrdersPreviewScreenController]);
}(selfcare.controllers || {}));
