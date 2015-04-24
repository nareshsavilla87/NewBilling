ViewStatementController = function(scope,routeParams , RequestSender,API_VERSION,$rootScope,localStorageService) {

        scope.billId=routeParams.billId;
        
		if(localStorageService.get('selfcare_sessionData')){
			scope.statementDatas = [];    
	        RequestSender.singleStatementResource.query({billId: scope.billId} , function(data) {
	            scope.statementDatas = data;
	        });
		 }
        
        scope.downloadFile = function (){
        	
        	window.open($rootScope.hostUrl+ API_VERSION +'/billmaster/'+scope.billId+'/print?tenantIdentifier=default');
        };
        
        

       
    };
    
selfcareApp.controller('ViewStatementController', ['$scope',
	                                               '$routeParams', 
	                                               'RequestSender', 
	                                               'API_VERSION',
	                                               '$rootScope', 
	                                               'localStorageService', 
	                                               ViewStatementController]);