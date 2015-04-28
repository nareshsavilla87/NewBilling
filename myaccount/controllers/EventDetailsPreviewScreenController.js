EventDetailsPreviewScreenController = function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,dateFilter) {
	
			 scope.mediaDatas = {};
			 scope.formData = {};
			 scope.eventFormData = [];
			 var clientTotalData = webStorage.get('clientTotalData');
			 if(clientTotalData){
				 scope.clientId = clientTotalData.clientId;
			 }
			 if(webStorage.get('eventData')){
				 scope.mediaDatas = webStorage.get('eventData');
			 }
			 
			 if(webStorage.get('hwSerialNumber')){
				 scope.hwSerialNumber = webStorage.get('hwSerialNumber');
			 }
			 
			 scope.eventOneByOneFun = function(val){
				 RequestSender.eventsResource.save(scope.eventFormData[val],function(data){
					 if(val == scope.eventFormData.length-1){
						 if(scope.formData.kortaToken){
							 RequestSender.updateKortaToken.update({clientId : scope.clientId},{'kortaToken':scope.formData.kortaToken},function(data){
								 webStorage.remove('eventData');
								 rootScope.iskortaTokenAvailable = true;
								 rootScope.isActiveScreenPage= false;
								 location.path('/listofvods');
							 });
						}else{
							 webStorage.remove('eventData');
							 rootScope.iskortaTokenAvailable = true;
							 rootScope.isActiveScreenPage= false;
							 location.path('/listofvods');
						}
					 }else{
						 val += 1;
					 	scope.eventOneByOneFun(val);
				 	 }
				 });
			 };
			 
			 var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
			 for(var i in scope.mediaDatas) {
				 if(scope.mediaDatas[i].kortaToken){
					 scope.formData.kortaToken = scope.mediaDatas[i].kortaToken;
				 }else{
						 scope.eventFormData[i] = {
							 							eventId : scope.mediaDatas[i].eventId,
							 							optType : scope.mediaDatas[i].optType,
							 							formatType : scope.mediaDatas[i].quality,
							 							clientId : scope.clientId,
							 							locale : 'en',
							 							eventBookedDate : reqDate,
							 							dateFormat : 'dd MMMM yyyy',
							 							deviceId : scope.hwSerialNumber
						 							};
				 }
				 if(i==scope.mediaDatas.length-1){
					 scope.eventOneByOneFun(0);
				 }
			 }
			 /*for(var i in scope.mediaDatas) {
				 scope.eventFormData[i].eventId = scope.mediaDatas[i].eventId;
				 scope.eventFormData[i].optType = 'RENT';
				 scope.eventFormData[i].formatType = scope.mediaDatas[i].quality;
				 scope.eventFormData[i].clientId = scope.clientId;
				 scope.eventFormData[i].locale = 'en';
		         var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
		         scope.eventFormData[i].eventBookedDate = reqDate;
		         scope.eventFormData[i].dateFormat = 'dd MMMM yyyy';
		         if(i==scope.mediaDatas.length-1){
		        	 scope.eventOneByOneFun(0);
		         }
			 }*/
			 
			
		 

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
		 
    };

 selfcareApp.controller('EventDetailsPreviewScreenController', ['$scope',
                                                                'RequestSender',
                                                                '$rootScope',
                                                                '$http',
                                                                'AuthenticationService',
                                                                'webStorage',
                                                                'HttpService',
                                                                'SessionManager',
                                                                '$location',
                                                                'dateFilter', 
                                                                EventDetailsPreviewScreenController]);
