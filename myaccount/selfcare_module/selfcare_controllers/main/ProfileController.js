(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ProfileController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams,paginatorService) {
		  
<<<<<<< HEAD
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
=======
		  scope.clientData =[];
		  scope.ordersData = [];
		  scope.totalOrdersData = [];
		  scope.retrivingOrdersData = {};
		  
		  var clientTotalData= webStorage.get('clientTotalData');
		  
		  scope.getOrdersData = function(offset, limit, callback) {
			  
			  scope.retrivingOrdersData.pageItems = [];
			  var itrCount = 0;
			  for (var i=offset;i<scope.totalOrdersData.length;i++) {
				 itrCount += 1;
				 scope.retrivingOrdersData.pageItems.push(scope.totalOrdersData[i]);
>>>>>>> upstream/obsplatform-2.03
				 if(itrCount==limit){
					 break;
				 }
		      }
<<<<<<< HEAD
			  callback(scope.retrivingStatementsData);
	  	   };
		  
	  	   
	  	  
	  	 scope.routeTostatement = function(statementid){
             location.path('/viewstatement/'+statementid);
           };
           
           scope.downloadFile = function (statementId){
	           window.open(rootScope.hostUrl+ API_VERSION +'/billmaster/'+ statementId +'/print?tenantIdentifier=default');
	      };
		  
=======
			  callback(scope.retrivingOrdersData);
	  	   };
>>>>>>> upstream/obsplatform-2.03
	  	   
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
				  
<<<<<<< HEAD
				
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
		 
		
=======
				  RequestSender.getOrderResource.get({clientId:scope.clientId},function(data){
					  scope.totalOrdersData = data.clientOrders;
					  scope.retrivingOrdersData.totalFilteredRecords = scope.totalOrdersData.length;
					  scope.ordersData = paginatorService.paginate(scope.getOrdersData, 4);
				  });
			  });
		  }
		 
		 scope.routeToOrderView = function(orderid){
             location.path('/vieworder/'+orderid+'/'+scope.clientId);
		 };
>>>>>>> upstream/obsplatform-2.03
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
