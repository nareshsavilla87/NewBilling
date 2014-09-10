(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  SignInFormController: function(scope,webStorage,authenticationService,rootScope) {
		  rootScope.loginCredentials = {};
		  rootScope.authenticationFailed = false;
		  rootScope.signInProcessLoading = false;
		  rootScope.emptyCredentials = false;
	      
	      scope.login = function() {
	    	  rootScope.authenticationFailed = false;
	    	  rootScope.isChangePassword = false;
	    	  if(rootScope.loginCredentials.username&&rootScope.loginCredentials.password){
	    		  rootScope.signInProcessLoading = true;
	    		  rootScope.emptyCredentials = false;
	    		  webStorage.add("loginCredentials",rootScope.loginCredentials);
	    		  authenticationService.authenticateWithUsernamePassword(rootScope.loginCredentials);
	    	  }else {
	    		  rootScope.emptyCredentials = true;
	    	  }
	        
	      };
	      $('#pwd').keypress(function(e) {
	          if(e.which == 13) {
	              scope.login();
	          }
	        });
	      rootScope.$on("UserAuthenticationFailureEvent", function(data) {
	    	  rootScope.authenticationFailed = true;
	    	  rootScope.signInProcessLoading = false;
	    	  rootScope.emptyCredentials = false;
	      });
		  
    }
  });
  selfcare.ng.application.controller('SignInFormController', ['$scope','webStorage','AuthenticationService','$rootScope', selfcare.controllers.SignInFormController]);
}(selfcare.controllers || {}));
