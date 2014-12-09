(function(selfcare_module) {
   selfcare.services = _.extend(selfcare_module, {
    AuthenticationService: function(httpService,API_VERSION) {
    	
<<<<<<< HEAD

=======
>>>>>>> upstream/obsplatform-2.03
      this.authenticateWithUsernamePassword = function(handler) {
	        httpService.post(API_VERSION + "/authentication?username="+selfcare.models.obs_username+"&password="+selfcare.models.obs_password)
	          .success(function(data){
	        	  httpService.setAuthorization(data.base64EncodedAuthenticationKey);
	        	  handler(data);
	          })
	          .error(function(data){
	        	  
	      		alert("Main Role Authentication Failure");
	      	});
<<<<<<< HEAD

=======
>>>>>>> upstream/obsplatform-2.03
      };
    }
  });
   selfcare.ng.services.service('AuthenticationService', [
                                                          'HttpService',
                                                          'API_VERSION', 
                                                          selfcare.services.AuthenticationService]).run(function($log) {
	    $log.info("AuthenticationService initialized");
   });
}(selfcare.services || {}));


