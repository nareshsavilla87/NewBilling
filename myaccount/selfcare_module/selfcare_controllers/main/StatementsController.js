(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  StatementsController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams) {
		  scope.statementsData = [];
		  var statementsData= webStorage.get('clientTotalData');
		  if(statementsData){
			 
			  RequestSender.statementResource.query({clientId: statementsData.clientId} , function(data) {	
                  scope.statementsData = data;
                });
		  }
    }
  });
  selfcare.ng.application.controller('StatementsController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','$routeParams', selfcare.controllers.StatementsController]).run(function($log) {
      $log.info("StatementsController initialized");
  });
}(selfcare.controllers || {}));
