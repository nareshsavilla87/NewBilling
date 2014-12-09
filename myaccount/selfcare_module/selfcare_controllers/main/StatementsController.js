(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  StatementsController: function(scope,RequestSender,rootScope,webStorage,location,routeParams,API_VERSION,route,$modal,paginatorService) {
		  
		  scope.statementsData = [];
		  scope.paymentsData = [];
		  scope.totalStatementsData = [];
		  scope.retrivingStatementsData = {};
		  
		  var statementsData= webStorage.get('clientTotalData');
		  
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
		  
		  scope.getPayments = function(offset, limit, callback) {
			  RequestSender.paymentsResource.get({clientId: statementsData.clientId ,offset: offset, limit: limit,type:'PAYMENT'} , callback);
	  	   };
	  		
		  if(statementsData){
			 
			  RequestSender.statementResource.query({clientId: statementsData.clientId} , function(data) {	
                  scope.totalStatementsData = data;
                  scope.retrivingStatementsData.totalFilteredRecords = scope.totalStatementsData.length;
				  scope.statementsData = paginatorService.paginate(scope.getStatementsData, 4);
                  
        	  	  scope.paymentsData = paginatorService.paginate(scope.getPayments, 4);
               });
		  }
		  
		  scope.routeTostatement = function(statementid){
	             location.path('/viewstatement/'+statementid);
	      };
	      scope.downloadFile = function (statementId){
	           window.open(rootScope.hostUrl+ API_VERSION +'/billmaster/'+ statementId +'/print?tenantIdentifier=default');
	      };
          
    }
  });
  selfcare.ng.application.controller('StatementsController', [
                                                              '$scope',
                                                              'RequestSender',
                                                              '$rootScope',
                                                              'webStorage',
                                                              '$location',
                                                              '$routeParams', 
                                                              'API_VERSION', 
                                                              '$route', 
                                                              '$modal', 
                                                              'PaginatorService', 
                                                              selfcare.controllers.StatementsController]).run(function($log) {
      $log.info("StatementsController initialized");
  });
}(selfcare.controllers || {}));
