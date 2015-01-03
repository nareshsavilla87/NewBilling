StatementsController = function(scope,RequestSender,webStorage,location,API_VERSION,paginatorService) {
		  
		  scope.totalStatementsData = [];
		  scope.retrivingStatementsData = {};
		  scope.statementsData = [];
		  
		  scope.paymentsData = [];
		  
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
		  
		  scope.getPaymentsData = function(offset, limit, callback) {
			  RequestSender.paymentsResource.get({clientId: scope.clientId ,offset: offset, limit: limit,type:'PAYMENT'} , callback);
	  	   };
	  		
		  if(clientTotalData){
			 
			  scope.clientId = clientTotalData.clientId;
			  RequestSender.statementResource.query({clientId: scope.clientId} , function(data) {	
                  scope.totalStatementsData = data;
                  scope.retrivingStatementsData.totalFilteredRecords = scope.totalStatementsData.length;
				  scope.statementsData = paginatorService.paginate(scope.getStatementsData, 4);
                  
        	  	  scope.paymentsData = paginatorService.paginate(scope.getPaymentsData, 4);
               });
		  }
		  
		  scope.routeTostatement = function(statementid){
	             location.path('/viewstatement/'+statementid);
	      };
	      scope.downloadFile = function (statementId){
	           window.open(API_VERSION +'/billmaster/'+ statementId +'/print?tenantIdentifier=default');
	      };
          
    };
    
selfcareApp.controller('StatementsController', ['$scope',
                                                'RequestSender',
                                                'webStorage',
                                                '$location',
                                                'API_VERSION', 
                                                'PaginatorService', 
                                                StatementsController]);
