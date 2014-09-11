(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  HomeController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams) {
		  
    }
  });
  selfcare.ng.application.controller('HomeController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','$routeParams', selfcare.controllers.HomeController]);
}(selfcare.controllers || {}));
