(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ActiveClientPreviewScreenController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,dateFilter) {
	
		  
		  scope.formData = {};
		  scope.clientData = {};
		  webStorage.remove('selfcare_sessionData');
		  rootScope.isSignInProcess = false;
		 scope.formData = webStorage.get("planFormData");
		 
		 console.log(webStorage.get("planFormData"));
		 
		 if(webStorage.get("planFormData")){
			 
			 if(scope.formData.deviceNo){
				 scope.clientData.device = scope.formData.deviceNo;
			 }
			 console.log(scope.formData.zipcode);
			 scope.clientData.firstname = "Mr ";
			 scope.clientData.address = scope.formData.address;
			 scope.clientData.homePhoneNumber = scope.formData.homePhoneNumber;
			 scope.clientData.nationalId = scope.formData.nationalId;
			 scope.clientData.zipCode = scope.formData.zipcode;
			 scope.clientData.fullname = scope.formData.fullName;
			 scope.clientData.city = scope.formData.city;
			 scope.clientData.phone = parseInt(scope.formData.mobileNo); 
			 scope.clientData.email = scope.formData.emailId; 
			 scope.clientData.paytermCode = scope.formData.paytermCode; 
			 scope.clientData.contractPeriod = scope.formData.contractperiod; 
			 scope.clientData.planCode = scope.formData.planCode;
		 }
		 
		 httpService.post("/obsplatform/api/v1/authentication?username="+selfcare.models.obs_username+"&password="+selfcare.models.obs_password)
	  		.success(function(data){
	  			 httpService.setAuthorization(data.base64EncodedAuthenticationKey);
	  			rootScope.currentSession= {user :'selfcare'};
	  			RequestSender.authenticationClientResource.save(scope.clientData,function(data){
	  				 webStorage.remove('planFormData');
	  				 rootScope.currentSession = sessionManager.clear();
	  				 location.path('/').replace();
	  				 rootScope.activetedClientPopup();
	  			 });
	  		})
		    .error(function(errordata){
		    	console.log('authentication failure');
		    });
		/* RequestSender.authenticationClientResource.save(scope.clientData,function(data){
			 webStorage.remove('planFormData');
			 rootScope.currentSession = sessionManager.clear();
			 location.path('/').replace();
			 rootScope.activetedClientPopup();
		 });*/
		 
		/* scope.submitTotalData = function(){
			 if(scope.formData.deviceNo){
				 scope.clientData.device = scope.formData.deviceNo;
			 }
			 scope.clientData.fullname = scope.formData.fullName;
			 scope.clientData.city = scope.formData.city;
			 scope.clientData.phone = parseInt(scope.formData.mobileNo); 
			 scope.clientData.email = scope.formData.emailId; 
			 scope.clientData.paytermCode = scope.formData.paytermCode; 
			 scope.clientData.contractPeriod = scope.formData.contractperiod; 
			 scope.clientData.planCode = scope.formData.planCode; 
		 
			 RequestSender.authenticationClientResource.save(scope.clientData,function(data){
				 webStorage.remove('planFormData');
				 rootScope.currentSession = sessionManager.clear();
				 location.path('/').replace();
				 rootScope.activetedClientPopup();
			 });
		 };
		  */
		  
		  
		  
		  
		  
		  
		 /* scope.formData = {};
		 var screenName = webStorage.get("form");
		 if(screenName == 'orderbook'){
			 scope.orderScreenView  = true;
			 scope.eventScreenView  = false;
			 
			 scope.clientData = {};
			 rootScope.currentSession= {user :'billing'};
			 scope.detailsOfplanFormData = webStorage.get("planFormData");
			 scope.detailsOfadditionalPlanFormData = webStorage.get("additionalPlanFormData");
			 if(scope.detailsOfplanFormData){
				 scope.formData = scope.detailsOfplanFormData;
			 }else if(scope.detailsOfadditionalPlanFormData){
				 scope.formData = scope.detailsOfadditionalPlanFormData;
			 }
			 console.log(scope.formData);
			 
		 }else if(screenName == 'eventbook'){
			 scope.mediaDatas = {};
			 scope.eventFormData = {};
			 scope.orderScreenView  = false;
			 scope.eventScreenView  = true;
			 var clientTotalData = webStorage.get('clientTotalData');
			 scope.clientId = clientTotalData.clientId;
			 scope.mediaDatas = webStorage.get('eventData');
		 }
		 
		 scope.submitTotalData = function(){
			 if(scope.detailsOfplanFormData){
				 
				 if(scope.formData.deviceNo){
					 scope.clientData.device = scope.formData.deviceNo;
				 }
				 scope.clientData.fullname = scope.formData.fullName;
				 scope.clientData.city = scope.formData.city;
				 scope.clientData.phone = parseInt(scope.formData.mobileNo); 
				 scope.clientData.email = scope.formData.emailId; 
				 scope.clientData.paytermCode = scope.formData.paytermCode; 
				 scope.clientData.contractPeriod = scope.formData.contractperiod; 
				 scope.clientData.planCode = scope.formData.planCode; 
			 
				 RequestSender.authenticationClientResource.save(scope.clientData,function(data){
					 webStorage.remove('planFormData');
					 rootScope.currentSession = sessionManager.clear();
					 location.path('/').replace();
					 rootScope.activetedClientPopup();
				 });
			 }
			 if(scope.detailsOfadditionalPlanFormData){
				 scope.orderBookingData = {};
				 
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
					 location.path('/additionalOrders');
				 });
			 }
		 };

		 scope.submitEventData = function(){
			 console.log(scope.mediaDatas);
			 for(var i in scope.mediaDatas) {
				 scope.eventFormData.eventId = scope.mediaDatas[i].eventId;
				 scope.eventFormData.optType = 'RENT';
				 scope.eventFormData.formatType = scope.mediaDatas[i].quality;
				 scope.eventFormData.clientId = scope.clientId;
				 scope.eventFormData.locale = 'en';
		         var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
		         scope.eventFormData.eventBookedDate = reqDate;
		         scope.eventFormData.dateFormat = 'dd MMMM yyyy';
				 RequestSender.eventsResource.save(scope.eventFormData,function(data){
					 if(i == scope.mediaDatas.length-1){
						 webStorage.remove('eventData');
						 location.path('/vodevents');
					 }
				 });
			 }
			 
		 };*/
		 
    }
  });
  selfcare.ng.application.controller('ActiveClientPreviewScreenController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','dateFilter', selfcare.controllers.ActiveClientPreviewScreenController]);
}(selfcare.controllers || {}));
