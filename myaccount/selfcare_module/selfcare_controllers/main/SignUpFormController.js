(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  SignUpFormController: function(scope,RequestSender,HttpService,rootScope,authenticationService) {

		  rootScope.signUpCredentials = {};
		  
		  //set the default values
		  scope.isProcessing  = false;
		  
		 //adding returnUrl to signUpCredentials form model returnURL.js
     	 scope.returnURL = selfcare.models.returnURL; 
		  
		  //submit functionality
          scope.submitEmail = function(){
        	  
        	  rootScope.signupErrorMsgs = [];rootScope.loginErrorMsgs = [];rootScope.infoMsgs = [];
        	  
        	  if(rootScope.signUpCredentials.userName){
        		  rootScope.signUpCredentials.returnUrl = scope.returnURL+"/"+rootScope.signUpCredentials.userName+"/";
	        	  
	        	  authenticationService.authenticateWithUsernamePassword(function(data){
	        		  
	        		  scope.isProcessing  = true;
	    		  	 RequestSender.registrationResource.save(rootScope.signUpCredentials,function(successData){
	        			  scope.isProcessing  = false;
	        			  rootScope.signUpCredentials = {};
	        			  rootScope.infoMsgs.push({
							  						'image' : 'info-icon.png',
							  						'names' : [{'name' : 'title.thankyou'},
							  						           {'name' : 'title.conformation.registration'},
	        		  										   {'name' : 'title.conformation.activation.link'}]
						  });
			          },function(errorData){
			        	  scope.isProcessing  = false;
			        	  rootScope.infoMsgs.push({
			        		  						'image' : 'warning-icon.png',
			        		  						'names' : [{'name' : 'title.conformation.alreadyregistration'},
			        		  						           {'name' : 'title.login.msg'}]
			        	  });
			          });
	    		  });
        	  }else{
				  rootScope.signupErrorMsgs.push({"name":'title.fill.emailid'});
        	  }
          };
          
          $('#emailId').keypress(function(e) {
              if(e.which == 13) {
                  scope.submitEmail();
              }
           });
    }
  });
  selfcare.ng.application.controller('SignUpFormController', [
                                                              '$scope',
                                                              'RequestSender',
                                                              'HttpService',
                                                              '$rootScope',
                                                              'AuthenticationService',
                                                              selfcare.controllers.SignUpFormController]).run(function($log) {
      $log.info("SignUpFormController initialized");
  });
}(selfcare.controllers || {}));
