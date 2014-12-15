(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  SignInFormController: function(scope,webStorage,localStorageService,RequestSender,authenticationService,rootScope,location) {
		  
		  scope.loginCredentials = {};
		  scope.isProcessing  = false;
	      
	      scope.login = function() {
	    	  
	    	  rootScope.signupErrorMsgs = [];rootScope.loginErrorMsgs = [];rootScope.infoMsgs = [];
	    	  
	    	  if(scope.loginCredentials.username && scope.loginCredentials.password){
	    		  
	    		  authenticationService.authenticateWithUsernamePassword(function(data){
	    			  
	    			  scope.isProcessing = true;
	    			  RequestSender.loginUser.save(scope.loginCredentials,function(successData){
	    				  localStorageService.add("selfcare_sessionData", {userId: data.userId, authenticationKey: data.base64EncodedAuthenticationKey});
	    				  webStorage.add("clientTotalData", successData);
	    				  rootScope.currentSession= {user :successData.clientData.displayName||"abc"};
	    				  rootScope.isSignInProcess = true;
	    				  scope.loginCredentials = {};rootScope.signUpCredentials = {};
	            		  rootScope.signupErrorMsgs  =[];rootScope.loginErrorMsgs  =[];rootScope.infoMsgs  =[];
	        	    	  scope.isProcessing  = false;
	            		  location.path('/profile');
	            	  },function(errorData){
	            		  rootScope.loginErrorMsgs.push({'name' : 'error.login.failed'});
	            		  scope.isProcessing = false;
	            	  });
	    		  });
	    	  }else {
	    		  rootScope.loginErrorMsgs.push({'name' : 'title.fill.alldetails'});
	    	  }
	        
	      };
	      
	      
	      $('#pwd').keypress(function(e) {
	          if(e.which == 13) {
	              scope.login();
	          }
	        });
		  
    }
  });
  selfcare.ng.application.controller('SignInFormController', [
                                                              '$scope',
                                                              'webStorage',
                                                              'localStorageService',
                                                              'RequestSender',
                                                              'AuthenticationService',
                                                              '$rootScope', 
                                                              '$location', 
                                                              selfcare.controllers.SignInFormController]).run(function($log) {
      $log.info("SignInFormController initialized");
  });
}(selfcare.controllers || {}));
