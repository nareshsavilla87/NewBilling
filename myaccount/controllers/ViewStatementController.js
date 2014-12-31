ViewStatementController = function(scope,routeParams , RequestSender, http,API_VERSION,$rootScope) {

		 scope.statementDatas = [];    
        scope.billId=routeParams.billId;
        scope.clientId=routeParams.clientId;
        
        RequestSender.singleStatementResource.query({billId: scope.billId} , function(data) {
        	
            scope.statementDatas = data;
        });
        
        scope.downloadFile = function (){
        	
        	window.open($rootScope.hostUrl+ API_VERSION +'/billmaster/'+scope.billId+'/print?tenantIdentifier=default');
        };
        
        

       
    };
    
selfcareApp.controller('ViewStatementController', ['$scope',
	                                               '$routeParams', 
	                                               'RequestSender', 
	                                               '$http',
	                                               'API_VERSION',
	                                               '$rootScope', 
	                                               ViewStatementController]);