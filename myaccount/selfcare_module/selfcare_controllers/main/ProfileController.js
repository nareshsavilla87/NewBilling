(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ProfileController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams,paginatorService) {
		  
		  scope.statementsData = [];
		  scope.paymentsData = [];
		  scope.totalStatementsData = [];
		  scope.retrivingStatementsData = {};
		  scope.ticketsData=[];
		  
		  var clientTotalData= webStorage.get('clientTotalData');
		  scope.clientId = clientTotalData.clientId;
             scope.getStatementsData = function(offset, limit, callback) {
			  scope.retrivingStatementsData.pageItems = [];
			  var itrCount = 0;
			  for (var i=offset;i<scope.totalStatementsData.length;i++) {
				 itrCount += 1;
				 scope.retrivingStatementsData.pageItems.push(scope.totalStatementsData[i]);
				 if(itrCount==limit){
					 break;
				 }
		      }
			  callback(scope.retrivingStatementsData);
	  	   };
		  
	  	   
	  	  
	  	 scope.routeTostatement = function(statementid){
             location.path('/viewstatement/'+statementid);
           };
           
           scope.downloadFile = function (statementId){
	           window.open(rootScope.hostUrl+ API_VERSION +'/billmaster/'+ statementId +'/print?tenantIdentifier=default');
	      };
		  
	  	   
		 if(clientTotalData){		  
			  scope.clientId = clientTotalData.clientId;
			  RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
				  scope.clientData = data;
				  if(data.selfcare.token){
					  rootScope.iskortaTokenAvailable = true;
				  }
				  if(!scope.clientData.selfcare.authPin){
					  scope.clientData.selfcare.authPin = 'Not Available';
				  }
				  rootScope.selfcare_userName = data.displayName;
				  webStorage.add('selfcareUserName',data.displayName);
				  webStorage.add('selfcareUserData',data);
				  
				
			  });
			  
			  RequestSender.statementResource.query({clientId: scope.clientId} , function(data) {	
	              scope.totalStatementsData = data;
	              scope.retrivingStatementsData.totalFilteredRecords = scope.totalStatementsData.length;
				  scope.statementsData = paginatorService.paginate(scope.getStatementsData, 4);
	              
	    	  	  scope.paymentsData = paginatorService.paginate(scope.getPayments, 4);
	           });
			  

			 
			 // scope.ticketsData = ticketsData.ticketMastersData;
			  RequestSender.ticketResource.query({clientId: scope.clientId},function(data) {	        
				  scope.ticketsData = data;
			  });
		  
		  	  
		  }
		 
		
    }
  });
  selfcare.ng.application.controller('ProfileController', [
                                                           '$scope',
                                                           'RequestSender',
                                                           '$rootScope',
                                                           '$http',
                                                           'AuthenticationService',
                                                           'webStorage',
                                                           'HttpService',
                                                           'SessionManager',
                                                           '$location',
                                                           '$routeParams', 
                                                           'PaginatorService', 
                                                           selfcare.controllers.ProfileController]).run(function($log) {
      $log.info("ProfileController initialized");
  });
}(selfcare.controllers || {}));
