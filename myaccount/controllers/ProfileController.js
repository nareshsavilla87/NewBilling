ProfileController = function(scope,RequestSender,rootScope,webStorage,location,paginatorService) {
		  
		  scope.clientData = {};
		  
		  scope.totalStatementsData = [];
		  scope.retrivingStatementsData = {};
		  scope.statementsData = [];
		  
		  scope.totalTicketsData = [];
		  scope.retrivingTicketsData = {};
		  scope.ticketsData=[];
		  
		  var clientTotalData= webStorage.get('clientTotalData');
		  
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
	  	   
	  	   scope.getTicketsData = function(offset, limit, callback) {
	  		   
	  		   scope.retrivingTicketsData.pageItems = [];
	  		   var itrCount = 0;
	  		   for (var i=offset;i<scope.totalTicketsData.length;i++) {
	  			   itrCount += 1;
	  			   scope.retrivingTicketsData.pageItems.push(scope.totalTicketsData[i]);
	  			   if(itrCount==limit){
	  				   break;
	  			   }
	  		   }
	  		   callback(scope.retrivingTicketsData);
	  	   };
		  
		 if(clientTotalData){		  
			  scope.clientId = clientTotalData.clientId;
			  RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
				  scope.clientData = data;
				  if(data.selfcare){
					  if(data.selfcare.token){
						  rootScope.iskortaTokenAvailable = true;
					  }
				  }
				  if(data.selfcare){
					  if(!scope.clientData.selfcare.authPin){
						  scope.clientData.selfcare.authPin = 'Not Available';
					  }
				  }
				  rootScope.selfcare_userName = data.displayName;
				  webStorage.add('selfcareUserName',data.displayName);
				  webStorage.add('selfcareUserData',data);
				  
				  RequestSender.statementResource.query({clientId: scope.clientId} , function(data) {	
					  scope.totalStatementsData = data;
					  scope.retrivingStatementsData.totalFilteredRecords = scope.totalStatementsData.length;
					  scope.statementsData = paginatorService.paginate(scope.getStatementsData, 2);
					  
					  RequestSender.ticketResource.query({clientId: scope.clientId},function(data) {	        
						  scope.totalTicketsData = data;
						  scope.retrivingTicketsData.totalFilteredRecords = scope.totalTicketsData.length;
						  scope.ticketsData = paginatorService.paginate(scope.getTicketsData, 2);
					  });
				  });
				
			  });
		  }
		 
		  scope.routeTostatement = function(statementid){
             location.path('/viewstatement/'+statementid);
           };
           
           scope.downloadFile = function (statementId){
	           window.open(rootScope.hostUrl+ API_VERSION +'/billmaster/'+ statementId +'/print?tenantIdentifier=default');
	      };
		 
		
    };
    
selfcareApp.controller('ProfileController', ['$scope',
                                             'RequestSender',
                                             '$rootScope',
                                             'webStorage',
                                             '$location',
                                             'PaginatorService', 
                                             ProfileController]);
