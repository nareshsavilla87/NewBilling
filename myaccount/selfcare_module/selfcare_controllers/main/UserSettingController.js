(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  UserSettingController: function(scope,RequestSender,rootScope,routeParams,modal,
			  							webStorage,HttpService,authenticationService,sessionManager,location,translate) {
		 
		  scope.langs = selfcare.models.Langs;

	      scope.optlang = scope.langs[1]; 
	      scope.changeLang = function (lang) {
	    	
	          translate.uses(lang.code);
	          scope.optlang = lang;
	      };
		  
    }
  });
  selfcare.ng.application.controller('UserSettingController', 
 ['$scope','RequestSender','$rootScope','$routeParams','$modal','webStorage','HttpService','AuthenticationService',
  'SessionManager','$location','$translate',selfcare.controllers.UserSettingController]).run(function($log) {
      $log.info("UserSettingController initialized");
  });
}(selfcare.controllers || {}));
