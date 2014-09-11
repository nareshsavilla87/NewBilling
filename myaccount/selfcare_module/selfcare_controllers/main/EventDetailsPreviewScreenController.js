(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  EventDetailsPreviewScreenController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,dateFilter) {
	
			 scope.mediaDatas = {};
			 scope.eventFormData = {};
			 var clientTotalData = webStorage.get('clientTotalData');
			 if(clientTotalData){
				 scope.clientId = clientTotalData.clientId;
			 }
			 if(webStorage.get('eventData')){
				 scope.mediaDatas = webStorage.get('eventData');
			 }
			 
			 console.log(webStorage.get("eventData"));
			 
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
		 

		 /*scope.submitEventData = function(){
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
  selfcare.ng.application.controller('EventDetailsPreviewScreenController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','dateFilter', selfcare.controllers.EventDetailsPreviewScreenController]);
}(selfcare.controllers || {}));
